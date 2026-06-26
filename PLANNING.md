# Online Tools - Implementation Plan

## ✅ Milestone: 100+ Tools Complete (101 tools)

The original goal of reaching 100+ online tools has been achieved. The project has grown from 25 to 101 tools across diverse categories.

## Project Status

| Metric | Value |
|--------|-------|
| **Total tools** | 101 |
| **Deployment** | Cloudflare Workers (wrangler) |
| **Frontend** | Static HTML/CSS/JS + React apps (diff_checker, json_viewer) |
| **Theme** | Dark theme (Figma-inspired): `--bg-primary: #0a0a0b`, `--accent-primary: #f97316` |
| **Fonts** | Space Grotesk (display), Inter (body), JetBrains Mono (code) |
| **Analytics** | Google Analytics (G-GHGXLWQR4V) |
| **Build** | Custom `build.sh` with parallel npm ci for React apps |

## Recent Changes (Last Commits)

### Build Optimization (June 23-25)
- **build.sh** overhauled: parallel npm ci, cleaner output, better error handling
- Removed verbose logging, optimized build pipeline for speed
- Created root `style.css` with reusable CSS custom properties theme
- Updated wrangler configuration for Cloudflare Workers deployment

### PDF Tools Added (June 22)
4 new tools under Development category:
- **PDF Merger** (`pdf_merger/`) — Upload multiple PDFs, reorder, merge into one
- **PDF Page Extractor** (`pdf_page_extractor/`) — Select pages by preset/custom range, extract
- **PDF Metadata Editor** (`pdf_metadata_editor/`) — View/edit title, author, subject, keywords
- **PDF Protector** (`pdf_protector/`) — Add/remove password protection (uses qpdf-wasm for encryption, pdf-lib for decryption)

Note: Only PDF Merger and PDF Page Extractor are currently committed to the repository. PDF Metadata Editor and PDF Protector were designed in development sessions but not yet committed.

All PDF tools use pdf-lib (CDN), are 100% client-side, include blob URL cleanup, toast notifications, and Google Analytics.

### Bulk Tool Generation (June 17)
Generated ~70+ tools in a single batch to reach near 100 tools. Each tool is a standalone HTML file following consistent patterns.

## Tool Categories

| Category | Tools |
|----------|-------|
| **🔐 Encryption & Hashing** | aes_encryption, base64, hash_generator, hmac_generator, jwt_decoder, jwt_generator, md5_tools, token_generator |
| **🔢 Calculators** | age_calculator, bmi_calculator, business_days_calculator, chmod_calculator, credit_card_generator, date_calculator, discount_calculator, mortgage_calculator, percentage_calculator, roman_numeral_converter, seconds_converter, time_card_calculator, tip_calculator, unit_converter |
| **🎨 CSS & Styling** | border_radius_generator, box_shadow_generator, color_converter, color_palette_generator, color_picker, contrast_checker, css_animation_generator, css_gradient_generator, css_media_query_generator, css_transform_generator, text_shadow_generator |
| **🔧 Developer Tools** | cron_expression_generator, diff_checker (React), dns_lookup_tool, docker_compose_generator, epoch_converter, gitignore_generator, graphql_formatter, html_entities, html_preview, http_status_codes, json_escape, json_sorter, json_to_csv, json_validator, json_viewer (React), line_counter, mac_address_lookup, mime_type_lookup, port_reference, regex_tester, regex_visualizer, slug_generator, sql_formatter, subnet_calculator, url_encoder, url_parser, user_agent_parser, yaml_converter |
| **📝 Generators** | barcode_generator, calendar_generator, case_converter, css_minifier, emoji_search, fake_data_generator, license_generator, lorem_ipsum, markdown_to_html, mock_api_generator, morse_code, name_generator, number_base_converter, otp_generator, password_generator, password_strength, qr_generator, uuid_generator, username_generator |
| **🖼️ Image & Media** | ascii_art_generator, image_compressor, svg_generator |
| **✏️ Text Utilities** | duplicate_line_remover, find_replace, markdown_editor, palindrome_checker, text_reverser, text_sorter, unicode_converter, word_counter |
| **⏰ Time & Date** | countdown_timer, stopwatch, timezone_converter, world_clock |
| **📄 PDF Tools** | pdf_merger, pdf_page_extractor |
| **📊 Data** | cookie_decoder, file_size_converter, ip_lookup, xml_formatter |

## Architecture

### File Structure
```
online-tools.click/
├── index.html              # Main landing page with all tool cards
├── style.css               # Global CSS custom properties theme
├── build.sh                # Build & deployment script
├── sitemap.xml             # SEO sitemap
├── robots.txt
├── AGENTS.md               # Agent instructions
├── PLANNING.md             # This file
├── deploy.sh               # Legacy deploy script
│
├── <tool_name>/            # Each tool is a directory
│   ├── index.html          # Single-file tool (HTML/CSS/JS)
│   ├── planning.md         # Optional per-tool planning notes
│   ├── src/                # React-based tools have src/
│   ├── dist/               # Built output
│   └── package.json        # React tool dependencies
│
└── wrangler.jsonc          # Cloudflare Workers config
```

### Tool Pattern
Each tool is a standalone `index.html` with:
- Consistent dark theme header (`Online Tools / Tool Name`)
- Google Analytics integration (G-GHGXLWQR4V)
- Toast notification system
- Mobile-responsive viewport
- Blob URL cleanup (for file-based tools)

### React Tools
- **diff_checker** — TypeScript + Vite + React
- **json_viewer** — TypeScript + Vite + React
- Both shell-wrapped into matching dark theme containers

## Build & Deploy
- Custom `build.sh` handles:
  - Parallel `npm ci` in React tool directories
  - Asset collection for wrangler deployment
  - Static file includes (html, css, js, images, fonts, etc.)
- Deployed via `wrangler deploy` to Cloudflare Workers
- Wrangler config updated for latest Cloudflare Workers setup

## Future Considerations

Since the 100-tool milestone is reached, future work could focus on:
- Improving individual tool functionality (more advanced features)
- Adding search/filter to the homepage
- Performance optimization (lazy loading, CDN caching)
- Adding more React-based complex tools
- Tool analytics tracking
- User accounts & saved configurations
- More PDF/image/media tools
