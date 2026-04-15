# Overview
A bidirectional tool for converting between XML and JSON formats.

# Features
- **Bi-directional conversion** — convert XML to JSON and JSON to XML.
- **Syntax highlighting** — formatted previews for both output types.
- **Pretty print** — auto-indent the resulting code for readability.

# Implementation Plan
1. Copy the structure from `xml_formatter` as a base.
2. Modify the toolbar to have conversion direction toggles (XML -> JSON, JSON -> XML).
3. Implement `xmlToJson` function:
    - Parse XML string into DOM.
    - Traverse DOM tree recursively and convert to plain JS object.
4. Implement `jsonToXml` function:
    - Parse JSON string.
    - Traverse object recursively and build XML string.
5. Update syntax highlighting for JSON.
6. Verify and polish.
