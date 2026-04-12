# Regex Tester - Project Plan

## Overview
A free, client-side regular expression tester. Developers constantly search for regex testers to debug and build patterns — this is one of the stickiest developer tools.

## Features
### Core
- **Regex input with flags**: Enter a regex pattern with toggleable flags (global `g`, case-insensitive `i`, multiline `m`, dotall `s`, unicode `u`).
- **Test string input**: Multi-line text area for the string to test against.
- **Real-time match highlighting**: Highlight all matches in the test string as the user types.
- **Match details panel**: Show full matches and capture groups with their indices.
- **Substitution/replace**: Enter a replacement string and see the substituted result.

### UX Enhancements
- **Regex cheat sheet**: Collapsible quick-reference for common regex syntax.
- **Match count**: Display total number of matches found.
- **Error feedback**: Show clear error when regex syntax is invalid.
- **Copy matches**: Copy all matches or the substitution result to clipboard.

## Design Principles (UI/UX Pro Max Aligned)
- **100% client-side** execution for speed and privacy.
- **Minimalist Two-Panel Layout**: Clean, distraction-free environment (regex + test string) utilizing ample whitespace (`--space-section` / `--space-group`).
- **Premium Dark Mode**: Deep black (`#0f0f0f` or `black`) solid backgrounds. No gradients, floating orbs, or unnecessary noise. 
- **High Contrast & Accessibility**: Strict adherence to WCAG contrast ratios. Primary actions use solid white or high-contrast borders. 
- **Typography & Hierarchy**: Clear visual hierarchy using distinct text tokens, with immediate focus drawn to the regex input and real-time highlighting.
- **Responsive design**: Works flawlessly from mobile to ultra-wide displays.

## Acceptance Criteria
- [ ] **Given** a valid regex and test string, **When** the user types, **Then** all matches are highlighted in real-time in the test string.
- [ ] **Given** a regex with capture groups, **When** matches are found, **Then** each group is listed with its value and index.
- [ ] **Given** an invalid regex pattern, **When** entered, **Then** a clear, specific syntax error is displayed without crashing.
- [ ] **Given** a regex, test string, and replacement string, **When** substitution is applied, **Then** the result shows the correctly substituted text.
- [ ] **Given** regex flags are toggled, **When** matching runs, **Then** behavior changes accordingly (e.g., case-insensitive matching).
