#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────
BUILD_CMD="npm run build"
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

command -v rsync >/dev/null 2>&1 \
  || error "rsync required."
command -v npm >/dev/null 2>&1 \
  || error "npm required."

log "Environment OK"
info "Staging dir: $STAGING"

# ═════════════════════════════════════════════════════════════════
# STEP 2 — Process each tool directory
# ═════════════════════════════════════════════════════════════════
section "Processing Tool Directories"

BUILT_DIRS=()
STATIC_DIRS=()

for dir in "$REPO_ROOT"/*/; do
  [ -d "$dir" ] || continue

  dir_name=$(basename "$dir")

  # Skip hidden, node_modules, and the staging output itself
  [[ "$dir_name" == .* ]]             && continue
  [[ "$dir_name" == "node_modules" ]] && continue
  [[ "$dir_name" == "$OUTPUT_DIR" ]]  && continue

  echo ""
  echo -e "  📁 ${BLUE}${dir_name}${NC}"

  mkdir -p "$STAGING/$dir_name"

  if [ -f "$dir/package.json" ]; then
    info "Type   : Frontend (package.json found)"

    cd "$dir"

    if [ ! -d "node_modules" ]; then
      warn "Installing dependencies..."
      npm install
    fi

    info "Running: $BUILD_CMD"
    eval "$BUILD_CMD"

    BUILD_OUT=$(find_build_output "$dir") \
      || error "Build output not found in '$dir_name'! Checked: ${BUILD_OUTPUT_DIRS[*]}"

    info "Output : $(basename "$BUILD_OUT")/"
    rsync -a "$BUILD_OUT/" "$STAGING/$dir_name/"

    log "Built & staged → $dir_name/"
    BUILT_DIRS+=("$dir_name")
    cd "$REPO_ROOT"

  else
    info "Type   : Static (no package.json)"

    RSYNC_ARGS=()
    for pattern in "${STATIC_EXCLUDES[@]}"; do
      RSYNC_ARGS+=("--exclude=$pattern")
    done

    rsync -a "${RSYNC_ARGS[@]}" "$dir" "$STAGING/$dir_name/"
    log "Copied static → $dir_name/"
    STATIC_DIRS+=("$dir_name")
  fi
done

# ═════════════════════════════════════════════════════════════════
# STEP 3 — Copy root-level files
# ═════════════════════════════════════════════════════════════════
section "Copying Root-Level Files"

while IFS= read -r -d '' file; do
  fname=$(basename "$file")

  if matches_exclude "$fname" "${STATIC_EXCLUDES[@]}"; then
    warn "Skipped : $fname"
  else
    cp "$file" "$STAGING/"
    log "Copied  : $fname"
  fi
done < <(find "$REPO_ROOT" -maxdepth 1 -type f -print0)

# ═════════════════════════════════════════════════════════════════
# STEP 4 — Upload to Cloudflare
# ═════════════════════════════════════════════════════════════════
section "Uploading to Cloudflare Workers"

npx wrangler versions upload --assets="$STAGING"

echo ""
echo -e "  ${GREEN}🚀 Successfully uploaded!${NC}"

# ═════════════════════════════════════════════════════════════════
# Summary
# ═════════════════════════════════════════════════════════════════
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  Deploy Summary${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  Built  : ${BUILT_DIRS[*]:-none}"
echo "  Static : ${STATIC_DIRS[*]:-none}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"