import React from "react";
import Image from "next/image";
import { StatCardProps } from "../types";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changePercentage,
  subtitle = "This month",
  isWarning = false,
  warningText,
  expiryDate
}) => {
  return (
    <div className="h-44 rounded-xl bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{value}</h2>

        {isWarning ? (
          <div className="text mr-2 flex items-center justify-between gap-1 rounded-2xl bg-[#EF4444] px-2 py-1 text-sm text-white">
            {warningText}
          </div>
        ) : (
          <div className="mr-2 flex items-center justify-between gap-1 rounded-lg bg-[#4ADE80] px-1 py-1 text-sm text-black">
            <Image
              src="/analytics-page/top-right-arrow.svg"
              width={16}
              height={16}
              className="rounded-full bg-[#fff]"
              alt=""
            />
            {changePercentage}
          </div>
        )}
      </div>
      <p className="pt-1 text-[#6E6E70]">{title}</p>
      
      {expiryDate ? (
        <div className="flex items-center gap-2 pt-14">
          <p className="#6E6E70 text-sm">Exp</p>
          <p className="text-sm font-bold">{expiryDate}</p>
        </div>
      ) : (
        <div className="pt-6">
          <p className="text-2xl font-bold">30%</p>
          <p className="#6E6E70 text-sm">{subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default StatCard;