import { useMemo, useState } from "react";

const PAGE_SIZE = 25;

export default function CompanyExplorer({ companies }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [batch, setBatch] = useState("all");
  const [page, setPage] = useState(0);

  const industries = useMemo(
    () => [...new Set(companies.map((c) => c.industry))].sort(),
    [companies]
  );

  const batches = useMemo(
    () =>
      [...new Set(companies.map((c) => c.batch))]
        .sort((a, b) => {
          const order = (b) => {
            const y = parseInt(b.slice(1), 10);
            const year = y >= 50 ? 1900 + y : 2000 + y;
            return year * 2 + (b[0] === "W" ? 0 : 1);
          };
          return order(b) - order(a);
        }),
    [companies]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      if (industry !== "all" && c.industry !== industry) return false;
      if (batch !== "all" && c.batch !== batch) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.subsector.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    });
  }, [companies, query, industry, batch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function resetPage() {
    setPage(0);
  }

  return (
    <div className="explorer">
      <div className="explorer-controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search companies, sectors, locations…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            resetPage();
          }}
          aria-label="Search companies"
        />
        <select
          className="filter-select"
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            resetPage();
          }}
          aria-label="Filter by industry"
        >
          <option value="all">All industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={batch}
          onChange={(e) => {
            setBatch(e.target.value);
            resetPage();
          }}
          aria-label="Filter by batch"
        >
          <option value="all">All batches</option>
          {batches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <span className="result-count">
          {filtered.length.toLocaleString()} results
        </span>
      </div>

      <div className="table-scroll">
        <table className="company-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Batch</th>
              <th>Industry</th>
              <th>Subsector</th>
              <th>Location</th>
              <th>Funding</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((c) => (
              <tr key={`${c.name}-${c.batch}`}>
                <td className="col-name">
                  {c.website ? (
                    <a href={c.website} target="_blank" rel="noopener noreferrer">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </td>
                <td>
                  <span className="batch-badge">{c.batch}</span>
                </td>
                <td>{c.industry}</td>
                <td className="col-subsector">{c.subsector}</td>
                <td className="col-location">{c.location.split(";")[0]}</td>
                <td className="col-funding">
                  {c.fundingM
                    ? c.fundingM >= 1000
                      ? `$${(c.fundingM / 1000).toFixed(1)}B`
                      : `$${c.fundingM}M`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
