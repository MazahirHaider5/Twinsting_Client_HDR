import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar
} from "recharts";
import { weeklyVisitorsData } from "../data/chartData";

const WeeklyVisitorsRadarChart: React.FC = () => {
  return (
    <div className="">
      <h2 className="mb-4 px-5 pt-5 text-lg font-semibold text-gray-700">Weekly Visitors</h2>
      <div className="mb-4 flex items-center space-x-4 px-5">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-sm bg-gradient-to-r from-red-400 to-orange-400"></div>
          <span className="text-sm text-gray-600">Name here</span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-sm bg-gray-700"></div>
          <span className="text-sm text-gray-600">Name here</span>
        </div>
      </div>
      <div className="relative h-64 px-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={weeklyVisitorsData}>
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#6B7280" }} />
            <PolarRadiusAxis angle={90} tick={false} domain={[0, 100]} />
            <Radar name="Name here" dataKey="A" stroke="#454548" fillOpacity={0.6} fill="#454548" />
            <Radar name="Name here" dataKey="B" stroke="#FF8A65" fillOpacity={0.6} fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF8A65" />
                <stop offset="100%" stopColor="#FFC107" />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyVisitorsRadarChart;