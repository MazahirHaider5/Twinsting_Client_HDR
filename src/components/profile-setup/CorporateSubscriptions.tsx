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
    <div className="mt-32 flex h-screen flex-col items-center justify-center p-6 md:mt-0">
      <h2 className="text-lg font-medium text-gray-600">Profile Completion</h2>
      <h1 className="mt-2 text-2xl font-bold">Corporate Subscriptions</h1>
      {/* Subscription Cards */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        {" "}
         {/* Cards will stack only on small screens */}
        <div className="relative h-80 w-full rounded-lg border-1 border-gray-200 bg-[#FFFFFF] p-6 md:w-80">
          <FaRegCircle className="mb-2 size-8 text-[#3B82F6]" />

          <h3 className="text-lg font-bold">Gold Package</h3>
          <p className="gradient-text mt-2 text-4xl font-bold text-transparent">
            {" "}
            $20<span className="text-2xl font-semibold">.99</span>
            <span className="text-sm font-normal text-black"> Per Month</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Contact with international artists and Twist to invite them to their country.
          </p>
          <button className="gradient-bg mt-16 w-full rounded-lg py-3 font-semibold text-white hover:opacity-90">
            Buy Now
          </button>
        </div>
        <div className="gradient-bg relative w-full rounded-lg p-6 md:w-80">
          <div className="flex justify-between gap-2">
            <FaRegCircle className="size-8 text-white" />
            <span className="rounded-md border-2 border-white/50 bg-white/20 px-3 py-1 text-sm font-semibold text-white uppercase">
              Recommended
            </span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-white">Platinum Package</h3>
          <p className="mt-2 text-4xl font-bold text-white">
            $100<span className="text-2xl font-semibold">.00</span>
            <span className="text-sm font-normal"> Per Month</span>
          </p>
          <p className="mt-2 text-sm text-white">More services, multi P.A. assistance for large companies.</p>
          <button className="mt-16 w-full rounded-lg bg-white py-3 font-semibold text-[#E94A6C] hover:opacity-90">
            Buy Now
          </button>
        </div>
      </div>
      {/* Bottom Buttons (Stick to bottom only on small screens) */}
      <div className="mt-20 flex w-full max-w-md justify-around p-4 md:bottom-7 md:mt-80">
        {/* <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">Preview</button> */}
        <button
          className="gradient-bg flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-white"
          onClick={handleNextButton}
        >
          Save and Continue
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.8333 10L4.16658 10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 15L15.8333 10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8333 5L15.8333 10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CorporateSubscriptions;
