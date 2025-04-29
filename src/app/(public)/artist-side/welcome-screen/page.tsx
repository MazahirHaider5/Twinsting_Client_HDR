"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface Step {
  id: number;
  title: string;
  description: string;
}

const Desktop101: React.FC = () => {
  const router = useRouter();

  const handleNextButton = () => {
    router.push("/artist-side/profile-setup/basic-information");
  };

  const steps: Step[] = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    }
  ];
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-7xl flex-col rounded-lg bg-white shadow-lg lg:flex-row">
        {/* Left Section */}
        <div className="flex w-full flex-col justify-center p-6 lg:w-1/2 lg:p-10">
          <h2 className="mb-2 text-lg font-bold text-gray-800 lg:text-xl">Logo</h2>
          <h1 className="text-xl font-bold lg:text-2xl">Welcome, Domenica!</h1>
          <p className="mb-8 text-sm text-gray-600 lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <div className="mx-auto flex max-w-lg flex-col items-start">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 left-4 h-[80%] w-1 bg-[#d4ad59]"></div>
              {steps.map((step) => (
                <div key={step.id} className="relative mb-8 flex items-start">
                  {/* Number with background */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-[#da9e1f] text-lg font-bold text-black">
                    {step.id}
                  </div>
                  {/* Content */}
                  <div className="bg-white p-2">
                    <h3 className="text-sm font-bold lg:text-base">{step.title}</h3>
                    <p className="w-full text-xs text-gray-600 md:w-[400px] lg:text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-6 rounded-full bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] px-6 py-2 text-xs font-semibold text-white shadow lg:text-sm"
            onClick={handleNextButton}
          >
            Let&apos;s Get Started →
          </button>
          <p className="mt-4 text-xs text-gray-500 lg:text-sm">
            By clicking &quot;Let’s Get Started&quot; and opening a TWI Marketplace, you’re agreeing to TWI
            <span className="text-pink-500 underline"> Terms of Use</span> including our
            <span className="text-pink-500 underline"> Seller Policy</span>,
            <span className="text-pink-500 underline"> TWI Payments Policy</span>, and
            <span className="text-pink-500 underline"> Privacy Policy</span>.
          </p>
        </div>
        {/* Right Section (Hidden on Small Screens) */}
        <div className="hidden w-full md:block lg:ml-2 lg:w-1/2">
          <Image
            src="/images/image1.png"
            alt="Welcome"
            width={0}
            height={0}
            className="h-full w-full rounded-b-lg object-cover lg:rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop101;
