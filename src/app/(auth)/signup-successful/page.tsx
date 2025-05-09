"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SignupSuccessful = () => {
  const router = useRouter();

  const handleHomeNavigate = () => {
    router.push("/");
  };

  const handleProfileSetup = () => {
    router.push("/profile-setup");
  };

  return (
    <div className="flex h-[90vh] w-[20rem] flex-col items-center justify-center p-6 sm:w-[20rem] md:w-[25rem] md:p-16 lg:w-[30rem] 2xl:w-[35rem]">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill="#FFEDC5" />
        <g clip-path="url(#clip0_157_17369)">
          <path d="M20 21H22" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 20V22" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M27.5 20L27 22" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M34 21H36" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M35 20V22" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M31 25L30 26" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M34 29L36 28.5" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M34 35H36" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M35 34V36" stroke="#121417" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M30 32.518L23.482 26L19.092 35.58C19.0053 35.766 18.9778 35.9742 19.0135 36.1763C19.0491 36.3785 19.1461 36.5647 19.2912 36.7099C19.4363 36.855 19.6226 36.952 19.8247 36.9876C20.0268 37.0232 20.235 36.9958 20.421 36.909L30 32.518Z"
            stroke="#121417"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_157_17369">
            <rect width="24" height="24" fill="white" transform="translate(16 16)" />
          </clipPath>
        </defs>
      </svg>

      <p className="mb-1 text-sm font-extrabold sm:text-sm md:text-base lg:text-lg 2xl:text-xl">Welcome aboard!</p>

      <p className="mb-5 text-center text-xs sm:text-xs md:text-xs lg:text-base 2xl:text-base">
        Your account is ready to use. Explore Twi Today!
      </p>

      {/* Complete Profile Setup Button */}
      <div className="mb-4 w-full rounded-xl bg-[#FEEDF4] p-1 cursor-pointer">
        <button
          className="gradient-text w-full rounded-xl py-2.5 text-xs font-bold hover:opacity-90 focus:outline-none sm:text-xs md:text-xs lg:text-base 2xl:text-base"
          onClick={handleProfileSetup}
        >
          Complete Profile Setup
        </button>
      </div>

      {/* Discover Twi Button */}
      <button
        className="gradient w-full rounded-xl py-2.5 text-xs font-bold text-white hover:opacity-90 focus:outline-none sm:text-xs md:text-xs lg:text-base 2xl:text-base cursor-pointer"
        onClick={handleHomeNavigate}
      >
        Discover Twi
      </button>
    </div>
  );
};

export default SignupSuccessful;
