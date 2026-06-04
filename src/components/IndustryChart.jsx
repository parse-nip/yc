import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { chartColor, tooltipStyle } from "../utils/chartTheme";

export default function IndustryChart({ data }) {
  const chartData = data.map((d, i) => ({
    ...d,
    fill: chartColor(i),
  }));

  return (
    <div className="chart-wrap chart-donut">
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={130}
            paddingAngle={2}
            stroke="#0D0B09"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [value.toLocaleString(), name]}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontFamily: "IBM Plex Mono", fontSize: "11px" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-center-label">
        <span className="center-num">
          {data.reduce((s, d) => s + d.count, 0).toLocaleString()}
        </span>
        <span className="center-text">total</span>
      </div>
    </div>
  );
}
