# Project Context

## Overview
This is a web platform that hosts various online tools (JSON viewer, MD5 decode, etc.). The main site is at `online-tools.click`, with subdomains for individual tools.

## Architecture
- **Main Domain**: `online-tools.click` - Homepage with links to all tools and descriptions. don't forget to add each new tool to this page
- **Directories**: Each tool has its own folders

## Tech Stack
- index.html: landing page for the main domain. it contains links to all the tools and a brief description of each.


UI for all apps:
on navbar of each app, there is Online Tools -> app name
Online Tools is a link to the main page (online-tools.click)

analytics:
- Google Analytics for tracking user interactions and traffic on the main domain and subdomains.
- update sitemap.xml when you add a new tool to ensure search engines can index the new pages.