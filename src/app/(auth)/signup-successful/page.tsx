"use client";
import React from "react";
import Image from "next/image";
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
    <div className="flex h-[90vh] w-[20rem] flex-col items-center justify-center p-8 sm:w-[20rem] md:w-[25rem] lg:w-[30rem] 2xl:w-[35rem]">
      <Image src="/images/congrats.png" alt="" width={50} height={50} />
      <p className="py-1 text-sm font-bold sm:text-sm md:text-base lg:text-lg 2xl:text-xl">Welcome aboard!</p>
      <p className="text-xs sm:text-xs md:text-xs lg:text-base 2xl:text-base">
        Your account is ready to use. Explore Twi Today!
      </p>
      <button className="gradient-text my-4 w-full cursor-pointer rounded-xl border border-red-500 bg-transparent py-2.5 text-xs hover:opacity-90 focus:outline-none sm:text-xs md:text-xs lg:text-base 2xl:text-base"
      onClick={handleProfileSetup}
      >
        Complete Profile Setup
      </button>

      <button
        className="gradient w-full cursor-pointer rounded-xl py-2.5 text-xs text-white hover:opacity-90 focus:outline-none disabled:opacity-50 sm:text-xs md:text-xs lg:text-base 2xl:text-base"
        onClick={handleHomeNavigate}
      >
        Discover Twi
      </button>
    </div>
  );
};

export default SignupSuccessful;
