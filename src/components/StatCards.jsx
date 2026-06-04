export default function StatCards({ stats }) {
  const topIndustry = stats.industries[0];
  const topLocation = stats.locations[0];
  const latestBatch = stats.batches[stats.batches.length - 1];
  const topFunded = stats.topFunded[0];

  const cards = [
    {
      label: "Portfolio Size",
      value: stats.totalCompanies.toLocaleString(),
      detail: "companies indexed",
    },
    {
      label: "Leading Sector",
      value: topIndustry?.name ?? "—",
      detail: `${topIndustry?.count.toLocaleString()} companies`,
    },
    {
      label: "Startup Capital",
      value: topLocation?.name ?? "—",
      detail: `${topLocation?.count.toLocaleString()} HQ locations`,
    },
    {
      label: "Latest Cohort",
      value: latestBatch?.name ?? "—",
      detail: `${latestBatch?.count ?? 0} companies`,
    },
    {
      label: "Top Disclosed Raise",
      value: topFunded ? `$${topFunded.fundingM >= 1000 ? `${(topFunded.fundingM / 1000).toFixed(1)}B` : `${topFunded.fundingM}M`}` : "—",
      detail: topFunded?.name ?? "No disclosures parsed",
    },
  ];

  return (
    <div className="stat-cards">
      {cards.map((card, i) => (
        <article
          key={card.label}
          className="stat-card"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="stat-label">{card.label}</span>
          <span className="stat-value">{card.value}</span>
          <span className="stat-detail">{card.detail}</span>
        </article>
      ))}
    </div>
  );
}
