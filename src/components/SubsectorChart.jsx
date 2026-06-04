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
import { chartColor, tooltipStyle } from "../utils/chartTheme";

export default function SubsectorChart({ data }) {
  const chartData = [...data].reverse().map((d, i) => ({
    ...d,
    shortName: d.name.length > 28 ? `${d.name.slice(0, 26)}…` : d.name,
    fill: chartColor(i),
  }));

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={520}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
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
          />
          <YAxis
            type="category"
            dataKey="shortName"
            width={160}
            tick={{ fill: "#D4CCC0", fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [value.toLocaleString(), "Companies"]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ""}
          />
          <Bar dataKey="count" radius={[0, 3, 3, 0]} maxBarSize={18}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
