import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Cell
} from "recharts";
import Image from "next/image";
import { revenueData } from "../data/chartData"; 
import CustomRevenueTooltip from "../tooltips/CustomRevenueTooltip";
import { LabelProps } from "../types";

const RevenueChart: React.FC = () => {
  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src="/analytics-page/revenue-icon.svg"
            width={20}
            height={20}
            className="rounded-full bg-[#fff]"
            alt=""
          />
          <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
        </div>
        <div className="relative">
          <button className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200">
            Monthly
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="pb-3 text-4xl font-semibold text-gray-800">$5,789.68</h3>
        <div className="flex items-center text-sm text-gray-600">
          <div className="mr-2 flex items-center justify-between gap-1 rounded-lg bg-[#3B82F6] px-1 py-1 text-[#fff]">
            <Image
              src="/analytics-page/top-right-arrow.svg"
              width={20}
              height={20}
              className="rounded-full bg-[#fff]"
              alt=""
            />
            46.9%
          </div>
          From $4,430.21
        </div>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value: number) => `$${value}`}
              domain={[0, "dataMax + 500"]}
            >
              <Label
                value="Revenue"
                position="left"
                angle={-90}
                offset={10}
                style={{ textAnchor: "middle", fontSize: 12, fill: "#6B7280" }}
              />
            </YAxis>
            <Tooltip content={<CustomRevenueTooltip />} />
            <Bar
              dataKey="value"
              fill="#4A5568"
              radius={[5, 5, 0, 0]}
              barSize={30}
              label={({ dataKey, value, x, y, width }: LabelProps) => (
                <g transform={`translate(${x + width / 2},${y - 10})`}>
                  {dataKey === "value" && value === 2000 && (
                    <>
                      <text
                        x={0}
                        y={0}
                        dy={-5}
                        textAnchor="middle"
                        fill="#000"
                        fontSize={12}
                        className="rounded-md bg-yellow-300 px-2 py-1"
                      >
                        $4,430
                      </text>
                      <path d="M0,0 L-5,-5 L5,-5 Z" fill="#000" />
                    </>
                  )}
                </g>
              )}
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value === 2000 ? "#FF8A65" : "#4A5568"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;