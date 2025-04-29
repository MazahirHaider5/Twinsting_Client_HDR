import React from "react";
import { CiMobile1 } from "react-icons/ci";

const GetTwiApp = () => {
  return (
    <div className="flex h-20 w-full items-center justify-start rounded-xl bg-[#000000] px-4 text-white">
      <CiMobile1 className="text-white opacity-80 bg-[#523b70] p-2 rounded-xl" size={48} />
      <p className="ml-2 text-[15px] xs:text-xs sm:text-sm md:text-base truncate">Get the TWI app to keep productivity going, no matter where you go</p>
      <button className="ml-auto bg-[#523b70] bg-opacity-50   px-4 py-4 md:px-8 md:py-3 lg:py-4 xl:py-6  rounded-xl text-xs sm:text-sm">Download Now</button>
    </div>
  );
};

export default GetTwiApp;
