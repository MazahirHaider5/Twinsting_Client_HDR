
import React from "react";
import { FaSearch } from "react-icons/fa";

const AccountInformation = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-2 sm:px-4">
      <div className="flex items-center gap-2 text-xs sm:text-sm py-2 sm:py-4 mb-2 sm:mb-4">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">Account Information</span>
      </div>
      
      <div className="center-part flex flex-col items-center justify-center p-2 sm:p-4">
        <div className="w-full p-4 sm:p-6 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Hi, how can we help you?</h2>
          <p className="mb-4 text-xs sm:text-sm text-gray-500">
            Use Knowledge Base search below or find answers in{" "}
            <span className="bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] bg-clip-text text-transparent">
              {" "}
              Tutorials
            </span>
          </p>
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px]">
            <input 
              type="text" 
              placeholder="Describe your issue..." 
              className="shadow-lg w-full rounded-sm p-2 sm:p-3 text-xs sm:text-sm" 
            />
            <button className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 transform rounded-md bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] p-1.5 sm:p-2 text-white shadow-md hover:opacity-90">
              <FaSearch size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            <p className="font-medium">Can&apos;t find an answer?</p>
            <p>Select a topic and get in touch with our Success team</p>
          </div>
        </div>
      </div>

      {/* Grid Section Below */}
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-4">
        {[...Array(12)].map((_, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center rounded-2xl bg-white p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FEEDF4]">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#F478AF]"></div>
            </div>
            <p className="mt-3 text-xs sm:text-sm font-bold">Lorem ipsum dolor sit amet</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountInformation;
