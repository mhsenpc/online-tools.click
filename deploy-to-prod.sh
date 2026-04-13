#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────────
# CONFIG — Edit these
# ─────────────────────────────────────────────────────────────────
SOURCE_BRANCH="main"
PROD_BRANCH="prod"
BUILD_CMD="npm run build"

# Build output dirs to detect (checked in order)
BUILD_OUTPUT_DIRS=("dist" "build" "out" ".output/public")

# Excluded when copying STATIC tool directories
STATIC_EXCLUDES=(
  ".DS_Store"
  "*.md"
  "*.MD"
  ".gitignore"
  ".claude/"
  "agents.md"
  ".env*"
  "deploy-to-prod.sh"
)
# ─────────────────────────────────────────────────────────────────

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

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

REPO_ROOT=$(git rev-parse --show-toplevel)
TEMP_STAGING=$(mktemp -d)           # ← Assembled output lives here
TEMP_BASE=$(mktemp -d)              # ← Parent dir (for safe cleanup)
TEMP_WORKTREE="$TEMP_BASE/worktree" # ← git worktree (must not exist yet)

cleanup() {
  echo ""
  warn "Cleaning up temporary directories..."
  git -C "$REPO_ROOT" worktree remove --force "$TEMP_WORKTREE" 2>/dev/null || true
  rm -rf "$TEMP_STAGING" "$TEMP_BASE"
}
trap cleanup EXIT  # Always runs, even on error

# ─────────────────────────────────────────────────────────────────
# Helper: Find build output dir inside a frontend project
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

# ─────────────────────────────────────────────────────────────────
# Helper: Check if filename matches any exclude pattern (glob)
# ─────────────────────────────────────────────────────────────────
matches_exclude() {
  local name="$1"; shift
  for pattern in "$@"; do
    local clean="${pattern%/}"         # strip trailing slash for dirs
    # shellcheck disable=SC2254
    [[ "$name" == $clean ]] && return 0
  done
  return 1
}

# ─────────────────────────────────────────────────────────────────
# Helper: Create prod branch safely (handles old git versions)
# ─────────────────────────────────────────────────────────────────
setup_prod_worktree() {
  if git show-ref --verify --quiet "refs/heads/$PROD_BRANCH"; then
    git worktree add "$TEMP_WORKTREE" "$PROD_BRANCH"
    log "Attached to existing '$PROD_BRANCH' branch"
  else
    warn "'$PROD_BRANCH' doesn't exist → creating empty orphan branch"

    # Create an empty commit without switching current branch (git plumbing)
    EMPTY_TREE=$(git hash-object -t tree --stdin < /dev/null)
    EMPTY_COMMIT=$(git commit-tree "$EMPTY_TREE" -m "chore: init prod branch")
    git update-ref "refs/heads/$PROD_BRANCH" "$EMPTY_COMMIT"

    git worktree add "$TEMP_WORKTREE" "$PROD_BRANCH"
    log "Created new '$PROD_BRANCH' branch"
  fi
}

# ═════════════════════════════════════════════════════════════════
# STEP 1 — Validate
# ═════════════════════════════════════════════════════════════════
section "Validating Environment"

command -v rsync >/dev/null 2>&1 \
  || error "rsync required. Install: brew install rsync / apt install rsync"

cd "$REPO_ROOT"

CURRENT_BRANCH=$(git branch --show-current)
[ "$CURRENT_BRANCH" = "$SOURCE_BRANCH" ] \
  || error "Must be on '$SOURCE_BRANCH'. Currently on: '$CURRENT_BRANCH'"

#if ! git diff --quiet || ! git diff --cached --quiet; then
#  error "Uncommitted changes detected. Commit or stash before deploying."
#fi

log "On '$SOURCE_BRANCH', working tree is clean"

# ═════════════════════════════════════════════════════════════════
# STEP 2 — Pull latest
# ═════════════════════════════════════════════════════════════════
section "Pulling Latest '$SOURCE_BRANCH'"
git pull origin "$SOURCE_BRANCH"
log "Up to date with remote"

# ═════════════════════════════════════════════════════════════════
# STEP 3 — Process each tool directory
# ═════════════════════════════════════════════════════════════════
section "Processing Tool Directories"

BUILT_DIRS=()
STATIC_DIRS=()

for dir in "$REPO_ROOT"/*/; do
  [ -d "$dir" ] || continue

  dir_name=$(basename "$dir")

  # Skip hidden dirs and node_modules
  [[ "$dir_name" == .* ]]             && continue
  [[ "$dir_name" == "node_modules" ]] && continue

  echo ""
  echo -e "  📁 ${BLUE}${dir_name}${NC}"

  mkdir -p "$TEMP_STAGING/$dir_name"

  if [ -f "$dir/package.json" ]; then
    # ── Frontend project: build it ──────────────────────────────
    info "Type   : Frontend (found package.json)"

    cd "$dir"

    if [ ! -d "node_modules" ]; then
      warn "node_modules missing → installing dependencies..."
      npm install
    fi

    info "Running: $BUILD_CMD"
    eval "$BUILD_CMD"

    BUILD_OUT=$(find_build_output "$dir") \
      || error "Build output not found in '$dir_name'! Checked: ${BUILD_OUTPUT_DIRS[*]}"

    info "Output : $(basename "$BUILD_OUT")/"

    # Copy only the built output → staging (no source!)
    rsync -a "$BUILD_OUT/" "$TEMP_STAGING/$dir_name/"

    log "Built & staged → $dir_name/"
    BUILT_DIRS+=("$dir_name")
    cd "$REPO_ROOT"

  else
    # ── Static project: copy files, skip dev files ──────────────
    info "Type   : Static (no package.json)"

    RSYNC_ARGS=()
    for pattern in "${STATIC_EXCLUDES[@]}"; do
      RSYNC_ARGS+=("--exclude=$pattern")
    done

    rsync -a "${RSYNC_ARGS[@]}" "$dir" "$TEMP_STAGING/$dir_name/"

    log "Copied static files → $dir_name/"
    STATIC_DIRS+=("$dir_name")
  fi
done

# ═════════════════════════════════════════════════════════════════
# STEP 4 — Copy root-level files (index.html etc.)
# ═════════════════════════════════════════════════════════════════
section "Copying Root-Level Files"

ROOT_COPIED=()
ROOT_SKIPPED=()

while IFS= read -r -d '' file; do
  fname=$(basename "$file")

  if matches_exclude "$fname" "${STATIC_EXCLUDES[@]}"; then
    ROOT_SKIPPED+=("$fname")
    warn "Skipped  : $fname"
  else
    cp "$file" "$TEMP_STAGING/"
    ROOT_COPIED+=("$fname")
    log "Copied   : $fname"
  fi

done < <(find "$REPO_ROOT" -maxdepth 1 -type f -print0)

# ═════════════════════════════════════════════════════════════════
# STEP 5 — Capture commit info
# ═════════════════════════════════════════════════════════════════
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MSG=$(git log -1 --pretty=%s)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# ═════════════════════════════════════════════════════════════════
# STEP 6 — Setup prod branch worktree
# ═════════════════════════════════════════════════════════════════
section "Setting Up '$PROD_BRANCH' Branch"
setup_prod_worktree

# ═════════════════════════════════════════════════════════════════
# STEP 7 — Replace prod content with staged build
# ═════════════════════════════════════════════════════════════════
section "Replacing '$PROD_BRANCH' Content"

# Wipe everything (keep .git)
find "$TEMP_WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Place staged content
rsync -a "$TEMP_STAGING/" "$TEMP_WORKTREE/"
log "Prod content replaced with staged build"

# ═════════════════════════════════════════════════════════════════
# STEP 8 — Commit & force push
# ═════════════════════════════════════════════════════════════════
section "Committing & Pushing"
cd "$TEMP_WORKTREE"

if git status --porcelain | grep -q .; then
  git add -A
  git commit -m "deploy($COMMIT_HASH): $COMMIT_MSG [$TIMESTAMP]"
  git push origin "$PROD_BRANCH" --force
  echo ""
  echo -e "  ${GREEN}🚀 Successfully deployed!${NC}"
else
  warn "No changes detected — '$PROD_BRANCH' is already up to date"
fi

# ═════════════════════════════════════════════════════════════════
# Summary
# ═════════════════════════════════════════════════════════════════
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  Deployment Summary${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  Commit   : $COMMIT_HASH — $COMMIT_MSG"
echo "  Time     : $TIMESTAMP"
echo "  Branch   : $PROD_BRANCH"
echo ""
echo "  Built    : ${BUILT_DIRS[*]:-none}"
echo "  Static   : ${STATIC_DIRS[*]:-none}"
echo "  Skipped  : ${ROOT_SKIPPED[*]:-none}"
info "Website: https://online-tools.click"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"