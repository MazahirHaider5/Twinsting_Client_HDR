import { CountryData, WeeklyVisitorData } from "../types";

// Chart data
export const chartData = [
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

export const revenueData = [
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

export const weeklyVisitorsData: WeeklyVisitorData[] = [
  { subject: "Mon", A: 80, B: 30, fullMark: 150 },
  { subject: "Tue", A: 60, B: 70, fullMark: 150 },
  { subject: "Wed", A: 70, B: 40, fullMark: 150 },
  { subject: "Thu", A: 90, B: 60, fullMark: 150 },
  { subject: "Fri", A: 40, B: 80, fullMark: 150 },
  { subject: "Sat", A: 60, B: 50, fullMark: 150 },
  { subject: "Sun", A: 80, B: 90, fullMark: 150 }
];

export const countriesData: CountryData[] = [
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