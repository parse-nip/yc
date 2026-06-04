import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { tooltipStyle } from "../utils/chartTheme";

export default function BatchTimeline({ data }) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
        >
          <defs>
            <linearGradient id="batchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 6"
            stroke="rgba(245, 240, 232, 0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#A89F94", fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
            interval={3}
            angle={-45}
            textAnchor="end"
            height={56}
          />
          <YAxis
            tick={{ fill: "#A89F94", fontSize: 11, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [value.toLocaleString(), "Companies"]}
            labelFormatter={(label) => `Batch ${label}`}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#FF6B00"
            strokeWidth={2}
            fill="url(#batchGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#FF6B00", stroke: "#F5F0E8", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
