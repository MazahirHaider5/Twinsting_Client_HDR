"use client";
import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CorporateSubscriptions = () => {
  const router = useRouter();

  const handleNextButton = () => {
    router.push("/profile-setup/interest");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-lg font-medium text-gray-500">Profile Completion</h2>
      <h1 className="mt-2 text-2xl font-bold">Artist Subscription</h1>
      {/* Subscription Cards */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        {" "}
         {/* Cards will stack only on small screens */}
        <div className="relative w-full rounded-lg border-0 bg-[#FFFFFF] p-6 shadow-xl md:w-80">
          <FaRegCircle className="mb-2 size-6 text-[#3B82F6]" />
          <h3 className="text-lg font-bold">Gold Package</h3>
          <p className="mt-2 bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] bg-clip-text text-4xl font-bold text-transparent">
            {" "}
            $20<span className="text-2xl font-semibold">.99</span>
            <span className="text-sm font-normal text-black"> Per Month</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Contact with international artists and Twist to invite them to their country.
          </p>
          <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] py-2 font-semibold text-white shadow-md hover:opacity-90">
            Buy Now
          </button>
        </div>
        <div className="relative w-full rounded-lg border-2 border-gray-300 p-6 shadow-md md:w-80">
          <div className="flex justify-between gap-2">
            <FaRegCircle className="size-6 text-[#3B82F6]" />
            <span className="rounded-md border-2 bg-amber-500 px-2 py-1 text-xs font-bold text-white uppercase">
              Recommended
            </span>
          </div>
          <h3 className="mt-2 text-lg font-bold">Platinum Package</h3>
          <p className="mt-2 bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] bg-clip-text text-4xl font-bold text-transparent">
            $100<span className="text-2xl font-semibold">.00</span>
            <span className="text-sm font-normal text-black"> Per Month</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">More services, multi P.A. assistance for large companies.</p>
          <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] py-2 font-semibold text-white shadow-md hover:opacity-90">
            Buy Now
          </button>
        </div>
      </div>
      {/* Bottom Buttons (Stick to bottom only on small screens) */}
      <div className="mt-6 flex w-full max-w-md justify-around p-4 md:fixed md:bottom-7 md:bg-white">
        {/* <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">Preview</button> */}
        <button
          className="rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-2 text-white"
          onClick={handleNextButton}
        >
          Save and Continue →
        </button>
      </div>
    </div>
  );
};

export default CorporateSubscriptions;
