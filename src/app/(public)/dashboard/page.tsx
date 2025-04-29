"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  
  Label,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Cell
} from "recharts";
import Image from "next/image";

// Type definitions
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; count?: number; name?: string }>;
  label?: string;
}

interface CountryData {
  name: string;
  value: number;
  change: string;
}

interface WeeklyVisitorData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface LabelProps {
  dataKey: string;
  value: number;
  x: number;
  y: number;
  width: number;
}

// Chart data
const chartData = [
  { month: "Jan", count: 80000 },
  { month: "Feb", count: 120000 },
  { month: "Mar", count: 60000 },
  { month: "Apr", count: 100000 },
  { month: "May", count: 450000 },
  { month: "Jun", count: 300000 },
  { month: "Jul", count: 350000 },
  { month: "Aug", count: 280000 },
  { month: "Sep", count: 250000 },
  { month: "Oct", count: 180000 },
  { month: "Nov", count: 70000 },
  { month: "Dec", count: 400000 }
];

const data = [
  { name: "Jan", value: 500 },
  { name: "Feb", value: 1000 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 300 },
  { name: "May", value: 2000 },
  { name: "Jun", value: 500 },
  { name: "Jul", value: 100 },
  { name: "Aug", value: 150 },
  { name: "Sep", value: 800 },
  { name: "Oct", value: 400 },
  { name: "Nov", value: 700 },
  { name: "Dec", value: 900 }
];

const dataWeeklyVisitors: WeeklyVisitorData[] = [
  { subject: "Mon", A: 80, B: 30, fullMark: 150 },
  { subject: "Tue", A: 60, B: 70, fullMark: 150 },
  { subject: "Wed", A: 70, B: 40, fullMark: 150 },
  { subject: "Thu", A: 90, B: 60, fullMark: 150 },
  { subject: "Fri", A: 40, B: 80, fullMark: 150 },
  { subject: "Sat", A: 60, B: 50, fullMark: 150 },
  { subject: "Sun", A: 80, B: 90, fullMark: 150 }
];

// Components
const CustomTooltipComponent = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-gray-300 bg-white p-2 shadow-md">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-gray-600">{`Value: ${payload[0].count}`}</p>
      </div>
    );
  }
  return null;
};

const ActivityLineChart = () => {
  return (
    <div className="">
      <h2 className="ms-6 mb-4 text-lg font-semibold text-gray-700">Stats</h2>
      <div className="relative h-64 min-w-[800px] sm:min-w-[900px]">
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

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-gray-300 bg-gray-100 p-2 shadow-md">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-gray-600">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
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

      <div className="relative h-64 min-w-[800px] sm:min-w-[900px] md:min-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            <Tooltip content={<CustomTooltip />} />
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value === 2000 ? "#FF8A65" : "#4A5568"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TopCountries = () => {
  const countriesData: CountryData[] = [
    { name: "Pakistan", value: 7.21, change: "up" },
    { name: "Canada", value: 6.88, change: "down" },
    { name: "United Kingdom", value: 5.12, change: "up" },
    { name: "United States", value: 9.34, change: "up" },
    { name: "India", value: 4.56, change: "down" },
    { name: "Germany", value: 3.87, change: "up" },
    { name: "Australia", value: 6.45, change: "down" },
    { name: "France", value: 4.12, change: "up" },
    { name: "Brazil", value: 5.76, change: "down" },
    { name: "Italy", value: 6.02, change: "up" }
  ];

  return (
    <div className="relative">
      <h2 className="px-5 py-3 text-lg font-semibold text-gray-700">Top Countries</h2>
      <div className="border-b border-[#E2E8F0]"></div>
      <div className="mb-4 px-5 pt-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-800">34.48K</div>
          <div className="text-xs font-medium text-gray-600">Since last week</div>
        </div>
      </div>
      <ul className="max-h-64 space-y-3 overflow-y-auto px-5">
        {countriesData.map((country, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 h-8 w-8 rounded-full bg-gray-300"></div>
              <span className="text-xs font-medium text-gray-700">{country.name}</span>
            </div>
            <div className="flex items-center">
              <Image
                src={
                  country.change === "up" ? "/analytics-page/light-green-arrow.svg" : "/analytics-page/red-arrow.svg"
                }
                width={22}
                height={22}
                className="mr-2 rounded-full bg-white"
                alt={`${country.change}-arrow`}
              />
              <span className="text-xs text-gray-600">{country.value}K</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const WeeklyVisitorsRadarChart = () => {
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
          <RadarChart data={dataWeeklyVisitors}>
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

const AnalyticsGraph = () => {
  return (
    <div className="h-full w-auto bg-[#EFEEF3] pb-12">
      <div className="px-6 py-5 text-center text-[22px] font-bold sm:text-start md:px-6 lg:px-[2.5rem]">
        <h1>Analytics</h1>
      </div>

      {/* Responsive cards */}
      <div className="mx-4 grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 md:mx-[2.5rem] lg:grid-cols-4">
        <div className="h-44 rounded-xl bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">5,789K</h2>

            <p className="mr-2 flex items-center justify-between gap-1 rounded-lg bg-[#4ADE80] px-1 py-1 text-sm text-black">
              <Image
                src="/analytics-page/top-right-arrow.svg"
                width={16}
                height={16}
                className="rounded-full bg-[#fff]"
                alt=""
              />
              46.9%
            </p>
          </div>
          <p className="pt-1 text-[#6E6E70]">Total Users/audience</p>
          <div className="pt-6">
            <p className="text-2xl font-bold">30%</p>
            <p className="#6E6E70 text-sm">This month</p>
          </div>
        </div>
        <div className="h-44 rounded-xl bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">5,789K</h2>

            <div className="mr-2 flex items-center justify-between gap-1 rounded-lg bg-[#4ADE80] px-1 py-1 text-sm text-black">
              <Image
                src="/analytics-page/top-right-arrow.svg"
                width={16}
                height={16}
                className="rounded-full bg-[#fff]"
                alt=""
              />
              46.9%
            </div>
          </div>
          <p className="pt-1 text-[#6E6E70]">Impressions</p>
          <div className="pt-6">
            <p className="text-2xl font-bold">30%</p>
            <p className="#6E6E70 text-sm">This month</p>
          </div>
        </div>
        <div className="h-44 rounded-xl bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">5,789K</h2>
            <div>
              <p className="mr-2 flex items-center justify-between gap-1 rounded-lg bg-[#4ADE80] px-1 py-1 text-sm text-black">
                <Image
                  src="/analytics-page/top-right-arrow.svg"
                  width={16}
                  height={16}
                  className="rounded-full bg-[#fff]"
                  alt=""
                />
                46.9%
              </p>
            </div>
          </div>
          <p className="pt-1 text-[#6E6E70]">Overall Clicks</p>
          <div className="pt-6">
            <p className="text-2xl font-bold">30%</p>
            <p className="#6E6E70 text-sm">This month</p>
          </div>
        </div>
        <div className="h-44 rounded-xl bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">- 12 Days</h2>
            <div className="text mr-2 flex items-center justify-between gap-1 rounded-2xl bg-[#EF4444] px-2 py-1 text-sm text-white">
              Upgrade
            </div>
          </div>
          <p className="pt-1 text-[#6E6E70]">Upcoming Ending Campaign</p>
          <div className="flex items-center gap-2 pt-14">
            <p className="#6E6E70 text-sm">Exp</p>
            <p className="text-sm font-bold"> Feb 15, 2024 - 12:45 PM</p>
          </div>
        </div>
      </div>

      {/* Responsive main charts section */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:gap-5 md:grid-cols-1 lg:grid-cols-[0.9fr_2.4fr_0.8fr] lg:px-[2.5rem]">
        <div className="order-1 overflow-x-auto rounded-xl bg-white shadow-md lg:order-none">
          <WeeklyVisitorsRadarChart />
        </div>
        <div className="order-3 w-full overflow-x-auto rounded-xl bg-white p-5 shadow-md lg:order-none">
          <RevenueChart />
        </div>
        <div className="order-2 rounded-xl bg-white shadow-md lg:order-none">
          <TopCountries />
        </div>
      </div>

      <div className="mt-6 px-4 lg:px-[2.5rem]">
        <div className="w-full overflow-x-auto rounded-xl bg-white p-5 shadow-md">
          <ActivityLineChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
