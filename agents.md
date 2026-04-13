# Project Context

## Overview
This is a web platform that hosts various online tools (JSON viewer, MD5 decode, etc.). The main site is at `online-tools.click`, with subdomains for individual tools.

## Architecture
- **Main Domain**: `online-tools.click` - Homepage/portal
- **Subdomains**: Each tool has its own subdomain (e.g., `jsonviewer.online-tools.click`, `md5decode.online-tools.click`)

## Tech Stack
- Portal directory: `/portal` (ready for implementation)


UI for all apps:
on navbar of each app, there is Online Tools -> app name
Online Tools is a link to the main page (online-tools.click)
