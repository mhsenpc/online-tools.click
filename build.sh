#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────
BUILD_CMD="npm run build"
OUTPUT_DIR="dist"  # Final assembled output for wrangler

BUILD_OUTPUT_DIRS=("dist")

STATIC_INCLUDES=(
  "*.html"
  "*.css"
  "*.js"
  "*.json"
  "*.txt"
  "*.xml"
  "*.svg"
  "*.png"
  "*.jpg"
  "*.jpeg"
  "*.gif"
  "*.webp"
  "*.woff"
  "*.woff2"
  "*.ttf"
  "*.eot"
)
# ─────────────────────────────────────────────────────────────────

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'

log()     { echo -e "  ${GREEN}✅ $1${NC}"; }
warn()    { echo -e "  ${YELLOW}⚠️  $1${NC}"; }
error()   { echo -e "${RED}❌ ERROR: $1${NC}"; exit 1; }
info()    { echo -e "     ${CYAN}→ $1${NC}"; }
section() {
  echo ""
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${CYAN}  🔹 $1${NC}"
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

REPO_ROOT=$(pwd)  # Cloudflare runs from repo root
STAGING="$REPO_ROOT/$OUTPUT_DIR"

# Clean previous output if any
rm -rf "$STAGING"
mkdir -p "$STAGING"

# ─────────────────────────────────────────────────────────────────
find_build_output() {
  local project_dir="$1"
  for candidate in "${BUILD_OUTPUT_DIRS[@]}"; do
    if [ -d "$project_dir/$candidate" ]; then
      echo "$project_dir/$candidate"
      return 0
    fi
  done
  return 1
}

matches_include() {
  local name="$1"; shift
  for pattern in "$@"; do
    # shellcheck disable=SC2254
    [[ "$name" == $pattern ]] && return 0
  done
  return 1
}

# ═════════════════════════════════════════════════════════════════
# STEP 1 — Validate environment
# ═════════════════════════════════════════════════════════════════
section "Validating Environment"

command -v npm >/dev/null 2>&1 \
  || error "npm required."

log "Environment OK"
info "Staging dir: $STAGING"

# ═════════════════════════════════════════════════════════════════
# STEP 1.5 — Generate version file
# ═════════════════════════════════════════════════════════════════
section "Generating Version File"

COMMIT_HASH=$(git log -1 --format="%H")
BUILD_DATETIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cat > "$STAGING/version" << EOF
commit: $COMMIT_HASH
datetime: $BUILD_DATETIME
EOF

log "Version file generated"
info "Commit: $COMMIT_HASH"
info "Datetime: $BUILD_DATETIME"

# ═════════════════════════════════════════════════════════════════
# STEP 2 — Separate dynamic & static projects
# ═════════════════════════════════════════════════════════════════
section "Processing Tool Directories"

DYNAMIC_DIRS=()
STATIC_DIRS=()
BUILT_DIRS=()

for dir in "$REPO_ROOT"/*/; do
  [ -d "$dir" ] || continue
  dir_name=$(basename "$dir")
  [[ "$dir_name" == .* ]]             && continue
  [[ "$dir_name" == "node_modules" ]] && continue
  [[ "$dir_name" == "$OUTPUT_DIR" ]]  && continue

  if [ -f "$dir/package.json" ]; then
    DYNAMIC_DIRS+=("$dir")
  else
    STATIC_DIRS+=("$dir")
  fi
done

info "Found ${#DYNAMIC_DIRS[@]} dynamic projects, ${#STATIC_DIRS[@]} static projects"

# ═════════════════════════════════════════════════════════════════
# STEP 2a — Start building dynamic projects in background
# ═════════════════════════════════════════════════════════════════
info "Starting builds (background)..."
for dir in "${DYNAMIC_DIRS[@]}"; do
  (
    dir_name=$(basename "$dir")
    echo -e "  📁 ${BLUE}${dir_name}${NC}"
    cd "$dir"

    if [ ! -d "node_modules" ]; then
      npm ci > /tmp/npm-install-$dir_name.log 2>&1 || {
        echo "FAIL" > /tmp/build-$dir_name.status
        exit 1
      }
    fi

    eval "$BUILD_CMD" > /tmp/build-$dir_name.log 2>&1 || {
      echo "FAIL" > /tmp/build-$dir_name.status
      exit 1
    }

    echo "OK" > /tmp/build-$dir_name.status
  ) &
done

# ═════════════════════════════════════════════════════════════════
# STEP 2b — Move static projects while builds run
# ═════════════════════════════════════════════════════════════════
info "Moving static projects..."
for dir in "${STATIC_DIRS[@]}"; do
  dir_name=$(basename "$dir")
  echo -e "  📁 ${BLUE}${dir_name}${NC}"
  mkdir -p "$STAGING/$dir_name"

  find "$dir" -maxdepth 1 -type f | while read -r file; do
    fname=$(basename "$file")
    if matches_include "$fname" "${STATIC_INCLUDES[@]}"; then
      mv "$file" "$STAGING/$dir_name/" 2>/dev/null || true
    fi
  done

  log "Copied static → $dir_name/"
done

# ═════════════════════════════════════════════════════════════════
# STEP 2c — Copy root-level files while builds run
# ═════════════════════════════════════════════════════════════════
section "Copying Root-Level Files"

while IFS= read -r -d '' file; do
  fname=$(basename "$file")

  if matches_include "$fname" "${STATIC_INCLUDES[@]}"; then
    mv "$file" "$STAGING/"
    log "Copied  : $fname"
  else
    warn "Skipped : $fname"
  fi
done < <(find "$REPO_ROOT" -maxdepth 1 -type f -print0)

# ═════════════════════════════════════════════════════════════════
# STEP 2d — Wait for all dynamic builds to complete
# ═════════════════════════════════════════════════════════════════
info "Waiting for builds to complete..."
wait

# ═════════════════════════════════════════════════════════════════
# STEP 2e — Process dynamic build outputs
# ═════════════════════════════════════════════════════════════════
info "Staging build outputs..."
for dir in "${DYNAMIC_DIRS[@]}"; do
  dir_name=$(basename "$dir")

  # Check build status
  if [ -f "/tmp/build-$dir_name.status" ] && [ "$(cat /tmp/build-$dir_name.status)" == "FAIL" ]; then
    error "Build failed for $dir_name. Check /tmp/build-$dir_name.log"
  fi

  mkdir -p "$STAGING/$dir_name"
  BUILD_OUT=$(find_build_output "$dir") \
    || error "Build output not found in '$dir_name'! Checked: ${BUILD_OUTPUT_DIRS[*]}"

  mv "$BUILD_OUT"/* "$STAGING/$dir_name/"
  log "Built & staged → $dir_name/"
  BUILT_DIRS+=("$dir_name")
done

# ═════════════════════════════════════════════════════════════════
# Build Complete
# ═════════════════════════════════════════════════════════════════
section "Build Complete"