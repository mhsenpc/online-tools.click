#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────
BUILD_CMD="npm run build"
INSTALL_CMD="npm ci --prefer-offline --no-audit --progress=false || npm install --prefer-offline --no-audit"
OUTPUT_DIR="dist"  # Final assembled output for wrangler

BUILD_OUTPUT_DIRS=("dist" "build" "out" ".output/public")

STATIC_EXCLUDES=(
  ".DS_Store"
  "*.md"
  "*.MD"
  ".gitignore"
  ".claude/"
  "agents.md"
  ".env*"
  "deploy.sh"
  "deploy-cloudflare.sh"
  "wrangler.jsonc"
  "wrangler.toml"
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

# Create a temp file to track files/dirs to delete at the end
TEMP_DELETE_LIST=$(mktemp)
trap "rm -f $TEMP_DELETE_LIST" EXIT

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

matches_exclude() {
  local name="$1"; shift
  for pattern in "$@"; do
    local clean="${pattern%/}"
    # shellcheck disable=SC2254
    [[ "$name" == $clean ]] && return 0
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
info "DateTime: $BUILD_DATETIME"

# ═════════════════════════════════════════════════════════════════
# STEP 2 — Process each tool directory (in-place)
# ═════════════════════════════════════════════════════════════════
section "Processing Tool Directories"

BUILT_DIRS=()
STATIC_DIRS=()
MAX_JOBS=$(nproc 2>/dev/null || echo 4)
ACTIVE_JOBS=0

build_frontend() {
  local dir="$1"
  local dir_name="$2"
  local repo_root="$3"

  cd "$dir"

  if [ ! -d "node_modules" ]; then
    eval "$INSTALL_CMD" >/dev/null 2>&1
  fi

  eval "$BUILD_CMD" >/dev/null 2>&1 || {
    echo "❌ Build failed for $dir_name"
    exit 1
  }

  BUILD_OUT=""
  for candidate in "${BUILD_OUTPUT_DIRS[@]}"; do
    if [ -d "$dir/$candidate" ]; then
      BUILD_OUT="$dir/$candidate"
      break
    fi
  done

  if [ -z "$BUILD_OUT" ]; then
    echo "❌ Build output not found in $dir_name"
    exit 1
  fi

  mkdir -p "$repo_root/$OUTPUT_DIR"
  mv "$BUILD_OUT" "$repo_root/$OUTPUT_DIR/$dir_name"

  cd "$repo_root"
}

for dir in "$REPO_ROOT"/*/; do
  [ -d "$dir" ] || continue

  dir_name=$(basename "$dir")

  # Skip hidden, node_modules, and the staging output itself
  [[ "$dir_name" == .* ]]             && continue
  [[ "$dir_name" == "node_modules" ]] && continue
  [[ "$dir_name" == "$OUTPUT_DIR" ]]  && continue

  echo -e "  📁 ${BLUE}${dir_name}${NC}"

  if [ -f "$dir/package.json" ]; then
    info "Type   : Frontend (package.json found)"
    info "Queued for parallel build"

    # Run builds in parallel with job limiting
    while [ $ACTIVE_JOBS -ge $MAX_JOBS ]; do
      wait -n 2>/dev/null || break
      ((ACTIVE_JOBS--))
    done

    build_frontend "$dir" "$dir_name" "$REPO_ROOT" &
    ((ACTIVE_JOBS++))
    BUILT_DIRS+=("$dir_name")

  else
    mkdir -p "$STAGING/$dir_name"
    find "$dir" -maxdepth 1 -type f -print0 | while IFS= read -r -d '' file; do
      fname=$(basename "$file")
      if ! matches_exclude "$fname" "${STATIC_EXCLUDES[@]}"; then
        mv "$file" "$STAGING/$dir_name/"
      fi
    done

    log "Copied static → $dir_name/"
    STATIC_DIRS+=("$dir_name")
  fi
done

# Wait for all background jobs to complete
while [ $ACTIVE_JOBS -gt 0 ]; do
  wait -n 2>/dev/null || break
  ((ACTIVE_JOBS--))
done

# Report completion of parallel builds
for dir_name in "${BUILT_DIRS[@]}"; do
  log "Built & staged → $dir_name/"
done

# ═════════════════════════════════════════════════════════════════
# STEP 3 — Copy root-level files (only wanted ones)
# ═════════════════════════════════════════════════════════════════
section "Processing Root-Level Files"

while IFS= read -r -d '' file; do
  fname=$(basename "$file")

  if matches_exclude "$fname" "${STATIC_EXCLUDES[@]}"; then
    warn "Skipped : $fname"
  else
    mv "$file" "$STAGING/"
    log "Copied  : $fname"
  fi
done < <(find "$REPO_ROOT" -maxdepth 1 -type f -print0)

# ═════════════════════════════════════════════════════════════════
# Build Complete
# ═════════════════════════════════════════════════════════════════
section "Build Complete"

log "Build artifacts staged to: $STAGING"
echo ""
echo "  Built apps : ${BUILT_DIRS[*]:-none}"
echo "  Static dirs: ${STATIC_DIRS[*]:-none}"