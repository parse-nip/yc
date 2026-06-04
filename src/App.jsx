import stats from "./data/yc-stats.json";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import IndustryChart from "./components/IndustryChart";
import SubsectorChart from "./components/SubsectorChart";
import BatchTimeline from "./components/BatchTimeline";
import FundingChart from "./components/FundingChart";
import LocationChart from "./components/LocationChart";
import CompanyExplorer from "./components/CompanyExplorer";

export default function App() {
  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <div className="app-inner">
        <Header total={stats.totalCompanies} />
        <StatCards stats={stats} />
        <main className="dashboard">
          <section className="panel panel-hero" id="industries">
            <div className="panel-header">
              <span className="panel-tag">01</span>
              <div>
                <h2>Industry Landscape</h2>
                <p>Where YC capital concentrates across nine macro sectors</p>
              </div>
            </div>
            <IndustryChart data={stats.industries} />
          </section>

          <section className="panel" id="subsectors">
            <div className="panel-header">
              <span className="panel-tag">02</span>
              <div>
                <h2>Top Subsectors</h2>
                <p>The twenty-five most populated niches within YC&apos;s portfolio</p>
              </div>
            </div>
            <SubsectorChart data={stats.subsectors} />
          </section>

          <section className="panel panel-wide" id="batches">
            <div className="panel-header">
              <span className="panel-tag">03</span>
              <div>
                <h2>Batch Timeline</h2>
                <p>Companies per YC batch — winter and summer cohorts since 2005</p>
              </div>
            </div>
            <BatchTimeline data={stats.batches} />
          </section>

          <section className="panel" id="funding">
            <div className="panel-header">
              <span className="panel-tag">04</span>
              <div>
                <h2>Disclosed Funding</h2>
                <p>
                  Top raises extracted from company profiles ({stats.fundingDisclosureCount}{" "}
                  of {stats.totalCompanies} disclose amounts)
                </p>
              </div>
            </div>
            <FundingChart data={stats.topFunded} />
          </section>

          <section className="panel" id="locations">
            <div className="panel-header">
              <span className="panel-tag">05</span>
              <div>
                <h2>Geographic Hubs</h2>
                <p>Primary city for each company headquarters</p>
              </div>
            </div>
            <LocationChart data={stats.locations} />
          </section>

          <section className="panel panel-full" id="explorer">
            <div className="panel-header">
              <span className="panel-tag">06</span>
              <div>
                <h2>Company Explorer</h2>
                <p>Search and filter the full YC directory</p>
              </div>
            </div>
            <CompanyExplorer companies={stats.companies} />
          </section>
        </main>

        <footer className="site-footer">
          <p>
            Data sourced from Y Combinator company profiles · {stats.totalCompanies.toLocaleString()}{" "}
            companies · Generated {new Date(stats.generatedAt).toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
