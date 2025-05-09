"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import apiClient from "@/lib/interceptor";
import toast from "react-hot-toast";

const interestOptions = [
  { name: "Solo", image: "/images/Artists3.png" },
  { name: "Classical", image: "/images/Artists4.png" },
  { name: "HipHop", image: "/images/Artists1.png" },
  { name: "Hostesses", image: "/images/Artists6.png" },
  { name: "Models", image: "/images/Artists7.png" },
  { name: "Theater", image: "/images/Artists5.png" }
];

const Interest = () => {
  const router = useRouter();
  const [setupDone, setSetupDone] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (name: string) => {
    setSelectedInterests((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]));
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.patch("/user/select-interest", {
        interest: selectedInterests
      });
      if (response?.status === 201 || response?.status === 200) {
        toast.success(response?.data?.message);
        setSetupDone(true);
        // router.push("/profile-setup/corporate-subscriptions");
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleHomeNavigate = () => {
    router.push("/signin");
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center p-6">
      <h2 className="text-lg font-medium text-gray-500">Profile Completion</h2>
      <h1 className="mt-2 text-center text-xl font-bold md:text-2xl">
        What type of Artist, Dancer, Singer and Etc are you looking for?
      </h1>
      <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {interestOptions.map((option) => (
          <div
            key={option.name}
            onClick={() => toggleInterest(option.name)}
            className={`relative cursor-pointer rounded-lg p-1 text-black ${
              selectedInterests.includes(option.name) ? "border-4 border-pink-500" : ""
            }`}
          >
            <div className="relative aspect-square w-full max-w-[300px]">
              <Image src={option.image} alt={option.name} fill className="rounded-lg object-cover" />
              {selectedInterests.includes(option.name) && (
                <FaCheckCircle className="absolute top-2 right-2 text-xl text-green-500" />
              )}
            </div>
            <p className="mt-2 text-center text-sm">{option.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-80 flex flex-col items-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-center p-4">
        {/* Preview Button */}
        <div className="">
          <button
            className="flex cursor-pointer w-58 items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 text-gray-500"
          >
            Preview
          </button>
        </div>

        {/* Save and Continue Button */}
        <div className="">
          <button
            className="gradient-bg flex cursor-pointer w-58 items-center justify-center gap-2 rounded-xl px-6 py-3 text-white"
            onClick={handleSubmit}
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

      {setupDone && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="relative mx-auto w-full max-w-sm rounded-lg bg-white px-4 py-6 shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSetupDone(false)}
            >
              <RxCross2 className="m-2 cursor-pointer text-xl" />
            </button>
            <div className="flex flex-col items-center justify-center">
              <Image src="/images/congrats.png" alt="" width={40} height={40} />
              <p className="mt-2 text-base font-bold">Welcome aboard!</p>
              <p className="mt-1 text-center text-sm text-gray-600">Your profile is ready to use. Explore Twi Today!</p>
              <div className="mt-4 flex w-full flex-col gap-2">
                <button
                  className="flex-1 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 py-2 text-sm text-white hover:opacity-90"
                  onClick={handleHomeNavigate}
                >
                  Discover Twi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interest;
