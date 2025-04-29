"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import apiClient from "@/lib/interceptor";
import toast from "react-hot-toast";

const interestOptions = [
  { name: "Solo", image: "/images/Artists1.png" },
  { name: "Classical", image: "/images/Artists2.png" },
  { name: "HipHop", image: "/images/Artists3.png" },
  { name: "Hostesses", image: "/images/Artists4.png" },
  { name: "Models", image: "/images/Artists5.png" },
  { name: "Theater", image: "/images/Artists6.png" }
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
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-lg font-medium text-gray-500">Profile Completion</h2>
      <h1 className="mt-2 text-center text-xl font-bold md:text-2xl">
        What type of Artist, Dancer, Singer and Etc are you looking for?
      </h1>
      <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {interestOptions.map((option) => (
          <div
            key={option.name}
            onClick={() => toggleInterest(option.name)}
            className={`relative cursor-pointer rounded-lg p-1 ${
              selectedInterests.includes(option.name) ? "border-4 border-pink-500" : "border border-gray-300"
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

      <div className="mt-6 flex w-full max-w-md justify-around p-4 md:fixed md:bottom-7">
        {/* <button className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">Preview</button> */}
        <button
          className="rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-2 text-white"
          onClick={handleSubmit}
        >
          Save and Continue →
        </button>
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
