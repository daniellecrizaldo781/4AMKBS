# 4AM Media Knowledge Base System

Internal knowledge-base web app for Customer Service Representatives (CSRs) — **Phase 1: Design, Navigation & Architecture**.

> One place where a CSR can go when they need an answer.

## What this is

A polished, functional **prototype** of the 4AM Media Knowledge Base. It is built to evaluate
UI/UX, navigation, and page hierarchy **before** real content is imported. All visible content is
**representative placeholder data**; the structure is wired to accept the real files later without a
UI rebuild.

## Sections

- **Dashboard** — five main area cards + Latest Updates + Frequently Used
- **Cascade & Handling Updates** — searchable/filterable list with category chips; detail pages show
  the **Handling History** (CURRENT → UPDATED → PREVIOUS → OUTDATED)
- **Products** — clean product grid; each product opens a reusable detail template
- **Resources** — tool/link cards grouped by category
- **Handbook & Policies** — policy category cards
- **Our Team** — team directory cards (placeholder, no personal data)
- **Global Search** — header search with live dropdown + a full results page

## Tech approach

- **Zero build step.** Plain HTML + CSS + vanilla JS (classic scripts, no modules) so the site opens
  by double-clicking `index.html` and also deploys cleanly to GitHub Pages.
- **Hash-based SPA router** (`#/route`) — no server required.
- **Data-driven.** All content lives in `assets/js/data.js`. Replace placeholder values (or swap the
  file for a `fetch()` of a JSON file) to publish real content — no page code changes needed.
- **Reusable components** in `assets/js/components.js`; page views in `assets/js/pages.js`.
- **Branding** derived from the 4AM Media logo: deep navy + warm amber. Logo is an inline SVG
  (`assets/img/logo.svg`, `favicon.svg`). To use the official logo image, drop it in `assets/img/`
  and reference it from the brand-mark component.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8099
# then visit http://localhost:8099/
```

## File structure

```
index.html
assets/
  css/styles.css        # design system (colors, components, responsive)
  js/data.js            # ALL content (products, cascades, resources, team, ...)
  js/components.js      # reusable HTML components
  js/pages.js           # page views
  js/app.js             # router + shell wiring + global search
  img/logo.svg
  img/favicon.svg
```

## Notes

- No credentials, tokens, or secrets are stored in this repository.
- Product images are placeholders; set `products[].image` in `data.js` to use real images.
- Resource links are placeholders; set `url` on a resource to enable its "Open Resource" button.
