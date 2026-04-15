# JSON Viewer - Project Plan

## Overview
A high-performance, aesthetically pleasing JSON visualization and manipulation tool. Part of the `online-tools.click` ecosystem.

## Features
- **Real-time Parsing**: Instantly validates and parses JSON as you type.
- **Interactive Tree View**: Explore complex nested structures with expand/collapse functionality.
- **Formatting Tools**: 
  - **Prettify**: Format messy JSON with 2-space indentation.
  - **Minify**: Compact JSON for production use.
- **Export Options**:
  - **Copy to Clipboard**: One-click copying.
  - **Download**: Save as `.json` file.
- **UX/UI**:
  - Dark mode aesthetic with the "Online Tools" accent color (`#ff3e00`).
  - Split-pane layout for desktop.
  - Responsive layout for mobile.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript

## Development
To run locally:
```bash
cd json_viewer
npm install
npm run dev
```
