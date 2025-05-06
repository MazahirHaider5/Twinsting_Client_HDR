import React from "react";
import { TooltipProps } from "../types";

const CustomRevenueTooltip = ({ active, payload, label }: TooltipProps) => {
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

export default CustomRevenueTooltip;