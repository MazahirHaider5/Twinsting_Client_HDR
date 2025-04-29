'use client';

import React from 'react';
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
  Cell,
} from 'recharts';
import Image from 'next/image';

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
  { month: 'Jan', count: 80000 },
  { month: 'Feb', count: 120000 },
  { month: 'Mar', count: 60000 },
  { month: 'Apr', count: 100000 },
  { month: 'May', count: 450000 },
  { month: 'Jun', count: 300000 },
  { month: 'Jul', count: 350000 },
  { month: 'Aug', count: 280000 },
  { month: 'Sep', count: 250000 },
  { month: 'Oct', count: 180000 },
  { month: 'Nov', count: 70000 },
  { month: 'Dec', count: 400000 },
];

const data = [
  { name: 'Jan', value: 500 },
  { name: 'Feb', value: 1000 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 300 },
  { name: 'May', value: 2000 },
  { name: 'Jun', value: 500 },
  { name: 'Jul', value: 100 },
  { name: 'Aug', value: 150 },
  { name: 'Sep', value: 800 },
  { name: 'Oct', value: 400 },
  { name: 'Nov', value: 700 },
  { name: 'Dec', value: 900 },
];

const dataWeeklyVisitors: WeeklyVisitorData[] = [
  { subject: 'Mon', A: 80, B: 30, fullMark: 150 },
  { subject: 'Tue', A: 60, B: 70, fullMark: 150 },
  { subject: 'Wed', A: 70, B: 40, fullMark: 150 },
  { subject: 'Thu', A: 90, B: 60, fullMark: 150 },
  { subject: 'Fri', A: 40, B: 80, fullMark: 150 },
  { subject: 'Sat', A: 60, B: 50, fullMark: 150 },
  { subject: 'Sun', A: 80, B: 90, fullMark: 150 },
];

// Components
const CustomTooltipComponent = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="text-gray-700 font-semibold">{label}</p>
        <p className="text-gray-600">{`Value: ${payload[0].count}`}</p>
      </div>
    );
  }
  return null;
};

const ActivityLineChart = () => {
  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Stats</h2>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
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
              dot={{ r: 4, fill: '#FF8A65', stroke: '#FF8A65', strokeWidth: 1 }}
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
      <div className="bg-gray-100 p-2 border border-gray-300 rounded shadow-md">
        <p className="text-gray-700 font-semibold">{label}</p>
        <p className="text-gray-600">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
        <div className="relative">
          <button className="flex items-center text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg py-1 px-3 hover:bg-gray-200">
            Monthly
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-4xl font-semibold text-gray-800 pb-3">$5,789.68</h3>
        <div className="flex items-center text-sm text-gray-600">
          <div className="flex items-center justify-between gap-1 bg-[#3B82F6] text-[#fff] rounded-lg py-1 px-1 mr-2">
            <Image src="/images/top-right-arrow.svg" width={20} height={20} className="bg-[#fff] rounded-full" alt="" />
            46.9%
          </div>
          From $4,430.21
        </div>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value: number) => `$${value}`}
              domain={[0, 'dataMax + 500']}
            >
              <Label
                value="Revenue"
                position="left"
                angle={-90}
                offset={10}
                style={{ textAnchor: 'middle', fontSize: 12, fill: '#6B7280' }}
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
                  {dataKey === 'value' && value === 2000 && (
                    <>
                      <text
                        x={0}
                        y={0}
                        dy={-5}
                        textAnchor="middle"
                        fill="#000"
                        fontSize={12}
                        className="bg-yellow-300 px-2 py-1 rounded-md"
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
                <Cell key={`cell-${index}`} fill={entry.value === 2000 ? '#FF8A65' : '#4A5568'} />
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
    { name: 'Pakistan', value: 7.21, change: 'up' },
    { name: 'Canada', value: 7.21, change: 'down' },
    { name: 'United Kingdom', value: 7.21, change: 'up' },
    { name: 'United States', value: 7.21, change: 'up' },
    { name: 'India', value: 7.21, change: 'down' },
    { name: 'India', value: 7.21, change: 'down' },
  ];

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Countries</h2>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-gray-800">34.48K</div>
          <div className="text-sm sm:text-lg text-gray-600 font-medium">Since last week</div>
        </div>
      </div>
      <ul className="space-y-3">
        {countriesData.map((country, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-700">{country.name}</span>
            </div>
            <div className="flex items-center">
              {country.change === 'up' ? (
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                </svg>
              )}
              <span className="text-sm text-gray-600">{country.value}K</span>
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
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Visitors</h2>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-orange-400 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-600">Name here</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-700 rounded-sm mr-2"></div>
          <span className="text-sm text-gray-600">Name here</span>
        </div>
      </div>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={dataWeeklyVisitors}>
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6B7280' }} />
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
    <div className="bg-[#EFEEF3] w-full h-full pb-12">
      <div className="px-6 text-center sm:text-start md:px-6 lg:px-26 text-[22px] font-bold py-5">
        <h1>Analytics</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 px-4 md:px-6 lg:px-26">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <WeeklyVisitorsRadarChart />
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <RevenueChart />
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <TopCountries />
        </div>
      </div>

      <div className="mt-6 px-4 md:px-6 lg:px-26">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <ActivityLineChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;