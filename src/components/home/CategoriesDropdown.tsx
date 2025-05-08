"use client";
import { useState, useRef, useEffect } from "react";
import { categories } from "@/data/categories";
import { FaChevronDown, FaChevronUp, FaChevronLeft } from "react-icons/fa";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between py-2 font-semibold">
        Categories
        {isOpen ? <FaChevronUp className="ml-2 size-4" /> : <FaChevronDown className="ml-2 size-4" />}
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg text-gray-800">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative flex cursor-pointer items-center gap-4 px-4 py-3 whitespace-nowrap hover:bg-gray-100"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <FaChevronLeft className="size-4 text-gray-500" />
              <span>{category.name}</span>
              {/* Subcategories - Open on Left Side */}
              {hoveredCategory === category.name && (
                <div className="absolute top-0 right-[102%] rounded-lg border border-gray-200 bg-white shadow-lg">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory} className="px-4 py-3 hover:bg-gray-200">
                      {subcategory}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
