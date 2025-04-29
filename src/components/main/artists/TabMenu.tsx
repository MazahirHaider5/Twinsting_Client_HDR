"use client";
import { useState } from "react";

interface TabMenuProps {
  onTabChange: (tab: string) => void; 
}

const TabMenu: React.FC<TabMenuProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>("Skills & Experience");

  const tabs = [
    { name: "Skills & Experience" },
    { name: "About me" },
    { name: "Work Photos" },
    { name: "Reviews" },
  ];

  return (
    <div className="border-gray-300 mt-6">
      <div className="flex justify-start space-x-8 px-14">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`relative py-2 text-sm font-medium text-gray-500 transition-colors ${
              activeTab === tab.name
                ? "bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent"
                : "hover:text-black"
            }`}
            onClick={() => {
              setActiveTab(tab.name);
              onTabChange(tab.name);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;
