"use client";
import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface Step {
  id: number;
  title: string;
  description: string;
}

export default function ProfileCompletionModal() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const handleonlickbutton = () => {
    router.push("/artist-side/service-creation/overview");
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
    }
  ];

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900 p-4">
      {/* Modal Container */}
      <div className="relative flex h-auto max-h-[90vh] w-full flex-col overflow-y-auto rounded-lg bg-white shadow-lg md:h-[80%] md:w-[80%] lg:w-[75%] lg:flex-row">
        {/* Left Section (Text & Progress) */}
        <div className="flex w-full flex-col justify-between p-6 md:w-full md:p-8 xl:w-1/2">
          {/* Profile Setup Complete */}
          <div>
            <div className="mb-6 flex items-center gap-4 font-medium text-green-400">
              <FaCheckCircle size={22} />
              <div>
                <p className="text-[18px] text-[#0E0D11]">You&apos;re Profile Setup is Completed</p>
                <p className="text-sm text-[#86868b]">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <h2 className="text-lg font-bold md:text-xl">
              Turn your talent into income - List your service today and Earn Now
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              aliqua.
            </p>

            {/* Steps List */}
            <div className="relative mt-6 flex">
              <div className="absolute top-0 left-4 h-[80%] w-[2px] bg-gray-300"></div>

              <div className="flex flex-col gap-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="relative z-10 flex h-8 w-10 items-center justify-center rounded-md bg-[#edcd86] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold">{step.title}</p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="mt-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] px-5 py-2 font-semibold text-white"
              onClick={handleonlickbutton}
            >
              Let&apos;s Start Selling <FaArrowRight />
            </button>
          </div>

          {/* Trusted Logos */}
          <div className="mt-10">
            <span className="text-md">Trusted By:</span>
            <div className="mt-7 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-4">
              <Image src="/images/firstlogo.png" alt="Logo" width={100} height={32} className="h-6 md:h-8" />
              <Image src="/images/Logoipsum.png" alt="Logo Ipsum" width={100} height={32} className="h-6 md:h-8" />
              <Image src="/images/logoipsum2.png" alt="Logo Ipsum 2" width={100} height={32} className="h-6 md:h-8" />
              <Image src="/images/logo(3).png" alt="Logo 3" width={100} height={32} className="h-6 md:h-8" />
            </div>
          </div>
        </div>

        <div className="relative hidden h-full w-1/2 items-center justify-center p-4 xl:flex">
          <Image
            src="/images/Dancerpic.png"
            alt="Ballet Dancer"
            width={500}
            height={500}
            className="h-full w-full rounded-r-lg"
          />
          {/* Close Button */}
          <button className="absolute top-6 right-6 rounded-full bg-white p-1 text-gray-600 hover:text-gray-800">
            <IoIosClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
