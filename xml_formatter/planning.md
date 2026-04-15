Overview
A free, client-side XML formatter, beautifier, and validator. XML remains heavily used in enterprise systems (SOAP, config files, XSLT). Strong organic search traffic.
Features
Core
XML formatting/beautification — paste messy XML, get properly indented and readable output
XML validation — check whether the input is well-formed XML and display specific error locations
Syntax highlighting — color-coded display of tags, attributes, values, and comments
UX Enhancements
Indentation options — choose between 2-space, 4-space, or tab indentation
Line numbers — display line numbers in the output
Copy to clipboard — one-click copy of formatted output
Error highlighting — when validation fails, highlight the exact line and position of the error
Design Principles
100% client-side
Clean layout with input/output panels
Responsive design
Dark mode support
Acceptance Criteria
Given unformatted XML, When formatted, Then the output is properly indented and human-readable.
Given well-formed XML, When validated, Then the tool confirms it is valid.
Given malformed XML (e.g., unclosed tag), When validated, Then the specific error and its line/position are displayed clearly.
Given the user selects a different indentation option, When formatting, Then the output reflects the chosen indentation style.

Status: Completed
- Implemented XML formatter, validator, and syntax highlighter.
- Verified acceptance criteria.
