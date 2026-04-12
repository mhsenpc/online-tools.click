# Diff Checker - Project Planning

## 1. Overview
A premium, highly interactive, 100% client-side text diff/comparison tool designed for developers. It will allow users to compare code, configurations, or large documents quickly, efficiently, and beautifully.

## 2. Technical Stack
- **Framework**: React 18, Vite (TypeScript)
- **Styling**: Tailwind CSS v4
- **Diff Engine**: `diff` (jsdiff) for robust word, line, and character-level comparisons.
- **Icons**: `lucide-react`
- **Utilities**: `clsx`, `tailwind-merge` for clean conditional classes.

## 3. UI/UX Strategy (Pro Max Design Principles)
- **Aesthetic**: "Utilitarian Premium." High contrast, extreme clarity, typography-driven.
- **Core Layout**: 
  - **Header**: Minimal branding. Theme toggle (Dark/Light).
  - **Main Area**: A seamless view that toggles between an "Input Mode" (two clean, massive text areas side-by-side) and a "Diff Mode" (the comparison results).
- **Typography**: 
  - UI text: Inter (system default sans-serif).
  - Code/Text inputs: JetBrains Mono / Fira Code (or system fallback monospace) to ensure clear readability of code differences.
- **Colors**:
  - Additions (+): Dark green background (`bg-emerald-500/10`) with vibrant green text (`text-emerald-400`).
  - Deletions (-): Dark red background (`bg-rose-500/10`) with vibrant red text (`text-rose-400`).
  - Neutral state: Subtle grays (`text-zinc-400`).
- **Performance**:
  - `useMemo` extensively to prevent re-renders when toggling options like "Ignore Whitespace" or "Unified/Side-by-Side" view, without lagging on 1000+ line documents.
  - Virtualization is considered if raw rendering becomes a bottleneck, but raw DOM often suffices for ~2000 lines if structured efficiently.

## 4. Features & Acceptance Criteria Map
- [ ] **Side-by-side & Unified View**: Implemented via a toggle segmented control in the diff toolbar.
- [ ] **Word-level diff**: Use `diffLines` for the main layout, then run `diffWordsWithSpace` or `diffChars` within the changed lines to highlight exact differences.
- [ ] **Diff Summary**: A premium badge showing `+X additions`, `-Y deletions`.
- [ ] **Ignore whitespace & Case**: Checkboxes in the toolbar that pass `ignoreWhitespace: true` or `ignoreCase: true` into the diff engine.
- [ ] **Swap & Clear**: Utility buttons on the Input screen.
- [ ] **Copy Diff**: Generates a standard unified diff format string and copies to the clipboard.
- [ ] **No Differences Found**: A beautiful empty state if the inputs are identical.

## 5. Development Phases
1. **Setup & Scaffolding**: Configure Vite, Tailwind v4, and basic folder structure.
2. **Component Architecture**: 
   - `DiffApp` (Main container, state holder)
   - `InputPanel` (Left/Right text areas)
   - `DiffViewer` (Renderer for Side-by-Side and Unified views)
   - `Toolbar` (Actions and settings)
3. **Diff Logic Implementation**: Writing the custom hook `useDiff` to parse text and calculate differences.
4. **UI Polishing**: Applying the "UI/UX Pro Max" tokens for spacing (`gap-6`, `py-8`), colors, and interaction states.
5. **Testing & Performance**: Checking 1000+ line blocks.