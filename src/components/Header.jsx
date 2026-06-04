export default function Header({ total }) {
  return (
    <header className="site-header">
      <div className="header-eyebrow">
        <span className="yc-mark">Y</span>
        <span>Combinator Portfolio Analysis</span>
      </div>
      <h1 className="site-title">
        The <em>YC Almanac</em>
      </h1>
      <p className="site-lede">
        An editorial atlas of {total.toLocaleString()} Y Combinator companies — sectors,
        batches, geography, and the funding figures they choose to disclose.
      </p>
      <nav className="section-nav" aria-label="Dashboard sections">
        {[
          ["Industries", "#industries"],
          ["Subsectors", "#subsectors"],
          ["Batches", "#batches"],
          ["Funding", "#funding"],
          ["Locations", "#locations"],
          ["Explorer", "#explorer"],
        ].map(([label, href]) => (
          <a key={href} href={href} className="nav-chip">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
