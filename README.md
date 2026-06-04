# YC Almanac

An interactive dashboard exploring **3,486 Y Combinator companies** from the uploaded dataset — industries, subsectors, batch timelines, geographic hubs, disclosed funding, and a searchable company explorer.

## Design

Editorial "startup almanac" aesthetic — warm ink-and-paper palette, YC orange accents, Fraunces + Newsreader typography, and Recharts visualizations.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run process-data` | Parse `extract-data-2026-06-04.json` → `src/data/yc-stats.json` |
| `npm run dev` | Process data + start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

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
