const PALETTE = [
  "#FF6B00",
  "#E85D04",
  "#F48C06",
  "#FAA307",
  "#4A7C59",
  "#2D6A4F",
  "#40916C",
  "#52B788",
  "#74C69D",
  "#1B4332",
  "#BC4749",
  "#D4A373",
  "#CCD5AE",
  "#E9EDC9",
  "#606C38",
];

export function chartColor(index) {
  return PALETTE[index % PALETTE.length];
}

export const tooltipStyle = {
  backgroundColor: "#1A1612",
  border: "1px solid rgba(255, 107, 0, 0.35)",
  borderRadius: "4px",
  fontFamily: "IBM Plex Mono, monospace",
  fontSize: "12px",
  color: "#F5F0E8",
};

export function formatFunding(millions) {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  return `$${millions}M`;
}
