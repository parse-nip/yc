import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const raw = JSON.parse(
  readFileSync(join(root, "extract-data-2026-06-04.json"), "utf-8")
);

function decodeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&gt;/g, " → ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, "\n")
    .trim();
}

function parseSubsector(sector) {
  const decoded = decodeHtml(sector);
  const parts = decoded.split("→").map((p) => p.trim());
  return parts.length > 1 ? parts[1] : parts[0];
}

function parseFundingMillion(description) {
  if (!description) return null;
  const text = description.replace(/,/g, "");
  let best = 0;

  const patterns = [
    /raised\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)\b/gi,
    /\$([\d.]+)\s*(billion|million|bn|mn|b|m)\s+in\s+funding/gi,
    /\$([\d.]+)\s*(billion|million|bn|mn|b|m)\s+from\b/gi,
    /total\s+of\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
    /valuation\s+(?:of|at|to)\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
    /valued\s+at\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
    /Series\s+[A-Z][^.$]{0,80}\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
    /funding\s+of\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
    /raised\s+\$([\d.]+)\s*(billion|million|bn|mn|b|m)/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const amount = parseFloat(match[1]);
      if (Number.isNaN(amount)) continue;
      const unit = match[2].toLowerCase();
      const millions =
        unit.startsWith("b") ? amount * 1000 : amount;
      if (millions > best && millions < 100_000) best = millions;
    }
  }

  return best > 0 ? Math.round(best * 10) / 10 : null;
}

function batchYear(batch) {
  if (!batch || batch.length < 2) return null;
  const season = batch[0];
  const yearSuffix = parseInt(batch.slice(1), 10);
  const century = yearSuffix >= 50 ? 1900 : 2000;
  return century + yearSuffix;
}

function batchOrder(batch) {
  const year = batchYear(batch);
  if (!year) return 0;
  const season = batch?.[0] === "W" ? 0 : 1;
  return year * 2 + season;
}

function countBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const companies = raw.yc_companies.map((c) => {
  const sectorDecoded = decodeHtml(c.sector);
  const subsector = parseSubsector(c.sector);
  const fundingM = parseFundingMillion(c.product_description);

  return {
    name: c.company_name,
    batch: c.yc_batch,
    batchYear: batchYear(c.yc_batch),
    batchOrder: batchOrder(c.yc_batch),
    industry: c.industry || "Unspecified",
    sector: sectorDecoded,
    subsector,
    location: c.location || "Unknown",
    website: c.website_url || "",
    description: decodeHtml(c.product_description).slice(0, 280),
    fundingM,
    hasFundingDisclosure: fundingM !== null,
  };
});

const stats = {
  generatedAt: new Date().toISOString(),
  totalCompanies: companies.length,
  industries: countBy(companies, (c) => c.industry),
  subsectors: countBy(companies, (c) => c.subsector).slice(0, 25),
  batches: countBy(companies, (c) => c.batch)
    .map((b) => ({ ...b, order: batchOrder(b.name) }))
    .sort((a, b) => a.order - b.order),
  batchesByYear: countBy(
    companies.filter((c) => c.batchYear),
    (c) => String(c.batchYear)
  ).sort((a, b) => parseInt(a.name) - parseInt(b.name)),
  locations: countBy(companies, (c) => {
    const loc = c.location.split(";")[0].trim();
    const city = loc.split(",")[0].trim();
    return city || "Unknown";
  }).slice(0, 20),
  topFunded: companies
    .filter((c) => c.fundingM !== null)
    .sort((a, b) => b.fundingM - a.fundingM)
    .slice(0, 20)
    .map(({ name, fundingM, batch, industry, subsector }) => ({
      name,
      fundingM,
      batch,
      industry,
      subsector,
    })),
  fundingDisclosureCount: companies.filter((c) => c.hasFundingDisclosure).length,
  companies,
};

writeFileSync(
  join(root, "src/data/yc-stats.json"),
  JSON.stringify(stats, null, 0)
);

console.log(`Processed ${stats.totalCompanies} companies`);
console.log(`Funding disclosures: ${stats.fundingDisclosureCount}`);
console.log(`Industries: ${stats.industries.length}`);
