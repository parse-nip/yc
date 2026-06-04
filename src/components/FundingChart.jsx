import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { chartColor, tooltipStyle, formatFunding } from "../utils/chartTheme";

export default function FundingChart({ data }) {
  if (!data.length) {
    return (
      <p className="empty-chart">
        No funding amounts could be extracted from company profiles.
      </p>
    );
  }

  const chartData = [...data].reverse().map((d, i) => ({
    ...d,
    label: d.name.length > 22 ? `${d.name.slice(0, 20)}…` : d.name,
    fill: chartColor(i),
  }));

  return (
    <>
      <p className="chart-note">
        Amounts parsed from self-reported profile text — valuations and total
        raised where explicitly stated. Many iconic YC companies omit figures.
      </p>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={480}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 8, right: 32, left: 8, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              horizontal={false}
              stroke="rgba(245, 240, 232, 0.08)"
            />
            <XAxis
              type="number"
              tick={{ fill: "#A89F94", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatFunding(v)}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={130}
              tick={{ fill: "#D4CCC0", fontSize: 10, fontFamily: "IBM Plex Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [formatFunding(value), "Disclosed"]}
              labelFormatter={(_, payload) => {
                const row = payload?.[0]?.payload;
                return row ? `${row.name} · ${row.batch} · ${row.industry}` : "";
              }}
            />
            <Bar dataKey="fundingM" radius={[0, 3, 3, 0]} maxBarSize={16}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
