# Online Tools

[online-tools.click](https://online-tools.click) is a free, all-in-one hub of browser-based utility tools — developer tools, converters, generators, calculators, and more. Every tool runs client-side (no data sent to a server) and lives at its own path, e.g. `online-tools.click/json_viewer`.

## Features

- 100+ standalone tools covering categories like:
  - **Developer tools**: JSON viewer/validator, YAML converter, regex tester, cron expression generator, JWT decoder/generator, hash/HMAC generators, diff checker
  - **Converters**: Base64, URL encoder, unit converter, timezone converter, number base converter, epoch converter
  - **Generators**: password generator, QR code generator, UUID generator, Lorem Ipsum, mock API, ASCII art
  - **Calculators**: BMI, mortgage, tip, discount, business days, age
  - Plus many more — see the [homepage](https://online-tools.click) for the full list.
- Fast, static, client-side only — your data never leaves your browser.
- No build step required to run locally.

## Project Structure

Each tool lives in its own top-level directory containing a self-contained `index.html` (and any supporting assets, e.g. `file-worker.js`):

```
online-tools.click/
├── index.html          # Landing page linking to all tools
├── style.css            # Shared site styling
├── theme.js              # Shared theme toggle logic
├── a11y.css              # Accessibility styles
├── sitemap.xml
├── robots.txt
├── <tool_name>/
│   └── index.html        # The tool itself
└── ...
```

## Running Locally

This is a static site with no build dependencies required for local development. Serve the repository root with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is deployed as static assets to Cloudflare (see `wrangler.jsonc` and `build.sh`).

## Adding a New Tool

1. Create a new directory named after the tool (snake_case), containing an `index.html`.
2. Add a link and short description for the tool on the homepage (`index.html`).
3. Add the new tool's URL to `sitemap.xml`.
4. Match the existing UI conventions (navbar with "Online Tools → *tool name*", linking back to the homepage).

See `PLANNING.md` and `agents.md` for more project context and goals.

## Contributing

Issues and pull requests are welcome. If you spot a bug or have an idea for a new tool, please open an issue.
