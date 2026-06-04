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

export default function LocationChart({ data }) {
  const chartData = data.slice(0, 12).map((d, i) => ({
    ...d,
    fill: chartColor(i + 3),
  }));

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={chartData}
          margin={{ top: 16, right: 16, left: 0, bottom: 48 }}
        >
          <CartesianGrid
            strokeDasharray="3 6"
            stroke="rgba(245, 240, 232, 0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#D4CCC0", fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={64}
          />
          <YAxis
            tick={{ fill: "#A89F94", fontSize: 11, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [value.toLocaleString(), "Companies"]}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={40}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
