# YC Almanac

An interactive dashboard exploring **3,486 Y Combinator companies** from the uploaded dataset — industries, subsectors, batch timelines, geographic hubs, disclosed funding, and a searchable company explorer.

## Design

Editorial "startup almanac" aesthetic — warm ink-and-paper palette, YC orange accents, Fraunces + Newsreader typography, and Recharts visualizations.

## Quick start (local)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy on Cloudflare Pages

The `text/jsx` MIME error means Cloudflare is serving **source files** instead of the **built** site. Set these in your Cloudflare Pages project under **Settings → Build & deployments**:

| Setting | Value |
|---------|-------|
| **Framework preset** | Vite (or React) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `22` (Environment variable `NODE_VERSION=22`) |

This repo also includes `wrangler.toml` with `pages_build_output_dir = "./dist"` so Cloudflare knows where the compiled assets live.

After saving, trigger a **Retry deployment**. The built `dist/index.html` loads compiled JavaScript from `/assets/*.js` — not raw `/src/main.jsx`.

### Browser console noise

Messages like `MaxListenersExceededWarning`, `ObjectMultiplex`, or `contentscript.js` come from **browser extensions** (e.g. MetaMask). They are unrelated to this app and can be ignored.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run process-data` | Parse `extract-data-2026-06-04.json` → `src/data/yc-stats.json` |
| `npm run dev` | Process data + start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm start` | Build + preview on port 5173 |

## Data notes

- **Industries & subsectors** come directly from YC profile fields.
- **Funding** is extracted from company descriptions where amounts are explicitly stated (~49 companies). Many well-known YC companies do not disclose figures in their profiles.
- Source file: `extract-data-2026-06-04.json`

## Charts

1. **Industry Landscape** — donut chart of 9 macro sectors
2. **Top Subsectors** — horizontal bar chart of top 25 niches
3. **Batch Timeline** — area chart of companies per YC batch
4. **Disclosed Funding** — top self-reported raises
5. **Geographic Hubs** — top HQ cities
6. **Company Explorer** — searchable, filterable table
