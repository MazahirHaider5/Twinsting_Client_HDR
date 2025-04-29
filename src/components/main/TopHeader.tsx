"use client";
import { setLanguage } from "@/actions/setLanguage";
import { useState } from "react";

const TopHeader = () => {
  const [locale, setLocale] = useState("en");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="flex w-full items-center justify-end gap-2 sm:gap-3 bg-gray-900 px-4 sm:px-6 py-2 text-white">
      {/* Currency Dropdown */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="rounded-lg bg-gray-900 px-2 sm:px-3 py-2 text-sm sm:text-base hover:bg-gray-700 focus:outline-none"
      >
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
      {/* Language Dropdown */}
      <select
        value={locale}
        onChange={(e) => {
          setLocale(e.target.value);
          setLanguage(e.target.value);
        }}
        className="rounded-lg bg-gray-900 px-2 sm:px-3 py-2 text-sm sm:text-base hover:bg-gray-700 focus:outline-none"
      >
        <option value="en">En</option>
        <option value="it">It</option>
      </select>
    </div>
  );
};

export default TopHeader;
