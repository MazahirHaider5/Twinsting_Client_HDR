import React from "react";
import Image from "next/image";
import { countriesData } from "../data/chartData";

const TopCountries: React.FC = () => {
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

export default TopCountries;