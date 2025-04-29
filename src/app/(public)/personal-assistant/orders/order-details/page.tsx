"use client";
import Image from "next/image";
import { useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import GetTwiApp from "@/components/main/GetTwiApp";

const OrderDetails = () => {
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 mt-10 " >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Side DIV*/}
        <div className="flex w-full flex-col gap-6 lg:w-[65%]">
          {/* Top Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">Order No# 594589</p>
                <div className="rounded-full bg-[#FFEECC] px-4 py-2 text-[#553D00] text-sm sm:text-base w-fit">
                  <p>On the way</p>
                </div>
              </div>
              <p className="pt-4 text-sm sm:text-base text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </div>
          <GetTwiApp/>
          {/* Service Details Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <p className="text-lg sm:text-xl font-semibold">Service Details</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-start gap-4">
                <Image
                  alt="img"
                  src="/images/tag.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Selected Service</p>
                  <p className="text-gray-900">Home Cleaning</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
              <div className="flex items-start gap-4 flex-1">
                <Image
                  alt="img"
                  src="/images/calendar-edit.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">23 Nov, 2023 - 12:09 AM</p>
                </div>
              </div>
              <p className="gradient-text font-semibold underline cursor-pointer">Request Change</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
              <div className="flex items-start gap-4 flex-1">
                <Image
                  alt="img"
                  src="/images/location.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">23 Elm street, Portland, Oregon GT351</p>
                </div>
              </div>
              <p className="gradient-text font-semibold underline cursor-pointer">Request Change</p>
            </div>
          </div>

          {/* Seller Details Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <p className="text-lg sm:text-xl font-semibold">Seller Details</p>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
              <div className="flex items-start gap-4 flex-1">
                <Image alt="img" src="/images/SellerDp.png" width={60} height={60} className="h-16 w-16 sm:h-20 sm:w-20" />
                <div className="flex-col">
                  <p className="font-semibold text-gray-900">Domenica</p>
                  <div className="flex space-x-1 pt-1">
                    <GoLocation className="text-gray-500" />
                    <p className="text-sm text-gray-500">Bologna, Italy</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((index) => (
                      <FaStar key={index} className="text-base sm:text-lg text-yellow-400"  />
                    ))}
                    <span className="ml-2 font-semibold text-black">5.0</span>
                    <span className="ml-1 text-sm text-gray-500">(890)</span>
                  </div>
                </div>
              </div>
              <button
                className="gradient-text cursor-pointer font-semibold mt-4 sm:mt-0"
                onClick={() => setShowReviewDialog(true)}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Side DIV */}
        <div className="flex w-full lg:w-[35%] flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div>
              <p className="text-lg sm:text-xl font-bold">Service Due In</p>
              <p className="pt-2 text-sm sm:text-base text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
              <div className="flex justify-between py-4 gap-4">
                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 sm:p-8 text-2xl sm:text-4xl text-center text-gray-900">05</p>
                  <p className="text-center text-sm sm:text-base text-gray-700">Hours</p>
                </div>

                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 sm:p-8 text-2xl sm:text-4xl text-center text-gray-900">58</p>
                  <p className="text-center text-sm sm:text-base text-gray-700">Mins</p>
                </div>

                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 sm:p-8 text-2xl sm:text-4xl text-center text-gray-900">45</p>
                  <p className="text-center text-sm sm:text-base text-gray-700">Secs</p>
                </div>
              </div>
              <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-200 py-3 font-semibold text-sm sm:text-base">
                Mark as Completed
              </button>
            </div>
          </div>

          {/* Action Cards */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/Chat.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Chat with Seller</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
              <FaChevronRight className="mt-4" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/calendar-edit.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Add to Calendar</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
              
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/support.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
              <FaChevronRight className="mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      {showReviewDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowReviewDialog(false)}
            >
              <RxCross2 className="text-xl m-2 cursor-pointer" />
            </button>
            <h2 className="text-center text-lg font-bold">Write a review</h2>
            <p className="text-center text-sm sm:text-base text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmmollit anim
            </p>

            <div className="mt-2 flex items-center justify-center">
              {[...Array(5)].map((index) => (
                <FaStar key={index} className="text-xl sm:text-2xl text-yellow-400" />
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <p className="text-start font-semibold">Describe your experience</p>
              <textarea
                className="h-32 sm:h-44 w-full resize-none rounded-lg border border-gray-200 bg-gray-100 p-2"
                placeholder="Type your experience..."
              />
              <button
                className="gradient-bg rounded-lg px-4 py-3 sm:py-4 text-white text-sm sm:text-base"
                onClick={() => setShowReviewDialog(false)}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetails;
