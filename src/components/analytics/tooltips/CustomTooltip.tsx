import React from "react";
import { TooltipProps } from "../types";

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

export default CustomTooltipComponent;