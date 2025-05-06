import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { chartData } from "../data/chartData";
import CustomTooltipComponent from "../tooltips/CustomTooltip";

const ActivityLineChart: React.FC = () => {
  return (
    <div className="">
      <h2 className="ms-6 mb-4 text-lg font-semibold text-gray-700">Stats</h2>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickCount={6}
              tickFormatter={(value: number) => {
                if (value >= 1000000) return `${value / 1000000}M`;
                if (value >= 1000) return `${value / 1000}K`;
                return value.toString();
              }}
              domain={[0, 500000]}
            />
            <Tooltip content={<CustomTooltipComponent />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="url(#gradient)"
              strokeWidth={2}
              dot={{ r: 4, fill: "#FF8A65", stroke: "#FF8A65", strokeWidth: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF8A65" />
                <stop offset="100%" stopColor="#FFC107" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityLineChart;