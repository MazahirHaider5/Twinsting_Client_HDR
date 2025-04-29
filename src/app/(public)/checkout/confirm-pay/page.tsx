"use client";
import NextStepButton from "@/components/main/NextStepButton";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const ConfirmPay = () => {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-base font-semibold sm:text-base md:text-lg lg:text-lg 2xl:text-xl">Checkout</h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex w-full flex-col">
          <div className="w-full rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6 lg:w-[80%] 2xl:w-[80%]">
            <div className="flex w-full sm:w-[60%] items-center gap-2 rounded-lg bg-red-300 p-2">
              <Image
                alt="img"
                src="/images/verifiedbadge.png"
                width={30}
                height={30}
                className="rounded-full bg-white p-1"
              />
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm text-gray-900">Thank You for your Purchase</p>
                <p className="text-xs sm:text-sm text-gray-500">A receipt was sent to your email address</p>
              </div>
              <div className="ml-auto px-2">
                <RxCross1 />
              </div>
            </div>
            <p className="pt-2 font-semibold">
              The artists needs the following information to start working on your order:
            </p>
            <div className="flex flex-col pt-3">
              <p className="font-semibold">1. How will you use this order? (optional)</p>
              <p className="px-2 sm:px-4 pt-1">Lorem ipsum dolor</p>
              <p className="px-2 sm:px-4 pt-1">Lorem ipsum dolor</p>
              <p className="px-2 sm:px-4 pt-1">Lorem ipsum dolor</p>
              <p className="px-2 sm:px-4 pt-1">Lorem ipsum dolor</p>

              <p className="pt-4 font-semibold">2. Which industry do you work in? (optional)</p>
              <input
                type="text"
                defaultValue=""
                className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                placeholder="Choose an industry - start typing..."
              />
              <p className="pt-4 font-semibold">3. What are you looking to achieve with this order? (optional)</p>
              <input
                type="text"
                defaultValue=""
                className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                placeholder="Select.."
              />
              <p className="pt-4 font-semibold">
                4. Please provide your shooting date so I can check my availability and ensure that I am able to provide
                my services on your desired date.
              </p>
              <textarea
                defaultValue=""
                className="my-2 h-34 w-full rounded-lg border border-gray-300 bg-gray-100 p-2"
                placeholder="Type here..."
              />
            </div>
          </div>
        </div>

        <div className="flex w-full lg:w-[60%] 2xl:w-[60%] flex-col gap-4">
          <div className="rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6">
            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold">Order Summary</p>
              <div className="flex flex-row gap-4 pt-4">
                <Image alt="img" src="/images/orderSummaryImg.png" width={100} height={100} />
                <p className="text-sm sm:text-base">Providing Multiple Services for Companies - Easy</p>
              </div>
              <div className="my-2 w-full border-b border-gray-200"></div>
              <div className="mx-2 sm:mx-4 flex items-center justify-between pt-2 w-full">
                <p className="text-gray-500">Service:</p>
                <p className="text-gray-900">Artists </p>
              </div>
              <div className="mx-2 sm:mx-4 flex items-center justify-between pt-2 w-full">
                <p className="text-gray-500">Qty:</p>
                <p className="text-gray-900">1x </p>
              </div>
              <div className="mx-2 sm:mx-4 flex items-center justify-between pt-2 w-full">
                <p className="text-gray-500">Tax:</p>
                <p className="text-gray-900">$70.00</p>
              </div>
              <div className="mx-2 sm:mx-4 flex items-center justify-between pt-2 w-full">
                <p className="text-gray-500">Subtotal:</p>
                <p className="text-gray-900">$70.00</p>
              </div>
              <div className="my-2 w-full border-b border-gray-200 pt-2"></div>
              <div className="mx-2 sm:mx-4 flex items-center justify-between pt-3 w-full">
                <p className="font-semibold text-gray-900">Total Price:</p>
                <p className="font-semibold text-gray-900">$70.00</p>
              </div>
              <div className="flex items-center justify-center py-4 w-full">
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <input
                    type="text"
                    placeholder="Coupon code..."
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-16 pl-4 text-gray-700 placeholder-gray-400 outline-none"
                  />
                  <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-md md:px-5 md:text-base lg:px-6">
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex items-end justify-end w-full">
                <NextStepButton
                  nextPath="/checkout/confirm-pay"
                  label="Proceed to Confirmation"
                  onClick={() => setShowDialog(true)}
                />
              </div>
              {showDialog && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center backdrop-blur-sm">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-3">
                      <Image alt="img" src="/images/services7.png" width={50} height={50} />
                    </div>
                    <p className="mt-4 text-xl font-semibold">Your order has been confirmed to the Artist</p>
                    <div className="my-2 border-b border-gray-100 m-8 text-center pt-4" ></div>

                      {/* Profile Image */}
                      <div className="pt-14">
                      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative h-20 w-20">
                          <Image
                            src="/images/TopArtistImg.png"
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white"
                          />
                          {/* Verification Badge */}
                          <BsCheckCircleFill className="absolute right-0 bottom-0 rounded-full bg-white text-xl text-green-500" />
                        </div>
                      </div>
                      </div>
                      {/* Name & Profession */}
                      <div className="pt-10 text-center">
                        <p className="text-lg font-semibold">Domenica</p>
                        <p className="text-sm text-gray-500">UXUI Designer</p>

                        {/* Location */}
                        <div className="mt-1 flex items-center justify-center text-sm text-gray-500">
                          <MdLocationOn className="text-lg" />
                          <span>Bologna, Italy</span>
                        </div>

                        {/* Ratings */}
                        <div className="mt-3 flex items-center justify-center">
                          {[...Array(5)].map((index) => (
                            <FaStar
                              key={index}
                              className={`text-lg ${index < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 font-semibold text-black">5.0</span>
                          <span className="ml-1 text-sm text-gray-500">(890)</span>
                        </div>
                      </div>
                    <div className="flex justify-center items-center gap-2">
                      <button className="mt-4 px-10 py-2 border border-gray-200 gradient-text rounded-lg cursor-pointer" onClick={() => router.push("/checkout/order-checkout")}>
                        Back home
                      </button>
                      <NextStepButton
                  nextPath="/checkout/order-details"
                  label="Continue to Order Chat"
                />
                    </div>
                    </div>
                  </div>
              
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6">
            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold">Choose Additional Services</p>
              <div className="flex items-center gap-4 rounded-lg p-2 w-full">
                <Image
                  alt="img"
                  src="/images/femaleCostume.png"
                  width={50}
                  height={50}
                  className="rounded-lg bg-gray-200 p-1"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm text-gray-900">Female Costume</p>
                  <p className="text-sm text-gray-500">$8.09 x 1</p>
                </div>
                <div className="ml-auto px-2">{/* <RxCross1 /> */}</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg p-2 w-full">
                <Image
                  alt="img"
                  src="/images/femaleCostume.png"
                  width={50}
                  height={50}
                  className="rounded-lg bg-gray-200 p-1"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm text-gray-900">Female Costume</p>
                  <p className="text-sm text-gray-500">$8.09 x 1</p>
                </div>
                <div className="ml-auto px-2">{/* <RxCross1 /> */}</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg p-2 w-full">
                <Image
                  alt="img"
                  src="/images/femaleCostume.png"
                  width={50}
                  height={50}
                  className="rounded-lg bg-gray-200 p-1"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm text-gray-900">Female Costume</p>
                  <p className="text-sm text-gray-500">$8.09 x 1</p>
                </div>
                <div className="ml-auto px-2">{/* <RxCross1 /> */}</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg p-2 w-full">
                <Image
                  alt="img"
                  src="/images/femaleCostume.png"
                  width={50}
                  height={50}
                  className="rounded-lg bg-gray-200 p-1"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm text-gray-900">Female Costume</p>
                  <p className="text-sm text-gray-500">$8.09 x 1</p>
                </div>
                <div className="ml-auto px-2">{/* <RxCross1 /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPay;
