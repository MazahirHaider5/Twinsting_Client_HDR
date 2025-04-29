"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegEye, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { orders } from "@/components/main/data";
import { ImageUpload } from "@/components/dialogs/ImageUpload";
import { useRouter } from "next/navigation";

const CompanyDashboard = () => {
  const router = useRouter();

  const [verificationDialogFirst, setVerificationDialogFirst] = useState(false);
  const [verifyYourIdentity, setVerifyYourIdentity] = useState(false);
  const [verifyIdCard, setVerifyIdCard] = useState(false);
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showPhoneSubmittedDialog, setShowPhoneSubmittedDialog] = useState(false);  

  const handleGoHome = () => {
    setIsSubmittedDialogOpen(false); 
    setVerifyIdCard(false); 
    router.push("/company/company-dashboard"); // Navigate to dashboard
  };

  const handleGoToVerification = () => {
    setIsSubmittedDialogOpen(false); // Close the current dialog
    setVerificationDialogFirst(true); // Open the Verification Center dialog
  };

  return (
    <div className="flex flex-col items-center justify-around gap-6 px-4 py-6 md:px-6 lg:px-8 2xl:px-12">
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        {/* Left Side (70%) */}
        <div className="flex w-full flex-col gap-6 lg:w-[70%]">
          {/* Main Welcome Section */}
          <div className="rounded-xl bg-[#270A4C] p-4 sm:p-6 lg:p-8">
            <p className="mb-4 text-base font-bold text-white sm:text-lg lg:text-xl 2xl:text-2xl">
              Welcome Back, Domenica.
            </p>

            {/* Scrollable Container with Custom Scrollbar */}
            <div className="custom-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2 whitespace-nowrap">
              {/* Recommended Section */}
              <div className="min-w-[280px] flex-shrink-0 rounded-xl bg-[#523b70] p-4 sm:min-w-[320px] sm:p-6">
                <p className="py-2 text-sm text-gray-300 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg">
                  RECOMMENDED FOR YOU
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    alt="Image"
                    src="/images/magicpen.png"
                    width={0}
                    height={0}
                    className="h-8 w-8 rounded-full bg-[#270A4C] p-2 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-10 lg:w-10"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white sm:text-base">Get Twist</p>
                    <p className="text-xs text-gray-300 sm:text-sm">Lorem ipsum dolor sit amet</p>
                  </div>
                  <button className="ml-auto rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-4 py-2 text-xs text-white sm:px-6 sm:py-3 sm:text-sm">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="min-w-[280px] flex-shrink-0 rounded-xl bg-[#523b70] p-4 sm:min-w-[320px] sm:p-6">
                <p className="py-2 text-sm text-gray-300 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg">
                  COMPLETE ACCOUNT VERIFICATION
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    alt="Image"
                    src="/images/verification.png"
                    width={0}
                    height={0}
                    className="h-8 w-8 rounded-full bg-[#270A4C] p-2 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-10 lg:w-10"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white sm:text-base">Start Verification</p>
                    <p className="text-xs text-gray-300 sm:text-sm">Lorem ipsum dolor sit amet</p>
                  </div>
                  <button
                    className="ml-auto rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-4 py-2 text-xs text-white sm:px-6 sm:py-3 sm:text-sm"
                    onClick={() => setVerificationDialogFirst(true)}
                  >
                    Get Started
                  </button>
                </div>
                {verificationDialogFirst && (
                  <div className="fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="relative max-h-[90vh] w-full max-w-[90%] overflow-y-auto rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[80%] md:max-w-[70%] lg:w-2/3">
                      <div className="top flex flex-col items-center text-center">
                        <div className="ml-auto px-2">
                          <RxCross1 onClick={() => setVerificationDialogFirst(false)} className="cursor-pointer" />
                        </div>
                        <div className="absolute top-5 right-5 cursor-pointer text-xl text-[#C3C3C4]"></div>
                        <div className="rounded-full bg-[#F3FBF9] p-3">
                          <Image
                            src="/images/shield.png"
                            alt=""
                            width={0}
                            height={0}
                            className="h-8 w-8 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12"
                          />
                        </div>
                        <h1 className="pt-4 text-center text-base leading-tight font-bold sm:text-lg md:text-xl lg:text-2xl">
                          Verify yourself to activate your account
                        </h1>
                        <p className="w-full pt-1 text-center text-xs text-wrap break-words text-[#929294] sm:text-sm md:text-base">
                          Complete the following steps to complete verification
                        </p>
                      </div>

                      {/* Verification Boxes - Adjusted for Responsive Design */}
                      <div className="verify-box-main grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
                        {/* Box 1: Verify Email */}
                        <div className="box-left flex w-full flex-col rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
                          <div className="flex w-full items-center justify-between">
                            <Image src="/images/email.png" alt="Email" width={40} height={40} />
                            <div className="w-full text-right text-sm break-words">Ni*******78@gmail.com</div>
                          </div>
                          <p className="w-full py-2 font-bold text-wrap break-words">Verify email</p>
                          <p className="w-full text-sm text-wrap break-words text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                          <div className="btn-bottom mt-5 flex w-full items-center justify-between text-sm">
                            <button className="cursor-pointer bg-gradient-to-b from-[#F5AF48] to-[#E32379] bg-clip-text font-bold text-transparent">
                              Edit
                            </button>
                            <button className="flex items-center gap-2 rounded-lg border-2 border-[#C3C3C4] px-3 py-2 font-semibold text-wrap break-words">
                              Verify now
                            </button>
                          </div>
                        </div>

                        {/* Box 2: Verify Phone */}
                        <div className="box-right flex w-full flex-col rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
                          <div className="flex w-full items-center justify-between">
                            <Image src="/images/phone.png" alt="Phone" width={40} height={40} />
                            <div className="w-full text-right text-sm break-words">+32**********23</div>
                          </div>
                          <p className="w-full py-2 font-bold text-wrap break-words">Verify phone number</p>
                          <p className="w-full text-sm text-wrap break-words text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                          <div className="btn-bottom mt-5 flex w-full items-center justify-between text-sm">
                            <button className="cursor-pointer bg-gradient-to-b from-[#F5AF48] to-[#E32379] bg-clip-text font-bold text-transparent">
                              Edit
                            </button>
                            <button 
                              onClick={() => setShowPhoneVerification(true)}
                              className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-3 py-2 font-semibold text-wrap break-words text-white"
                            >
                              Verify now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Additional Verification Boxes */}
                      <div className="verify-box-main grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
                        {/* Box 3: Verify Identity */}
                        <div className="box-left flex w-full flex-col rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
                          <div className="flex w-full items-center justify-start">
                            <Image src="/images/verifyIdentityLogo.png" alt="Identity" width={40} height={40} />
                          </div>
                          <p className="w-full py-2 font-bold text-wrap break-words">Verify your identity</p>
                          <p className="w-full text-sm text-wrap break-words text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                          <div className="btn-bottom mt-5 flex w-full items-center justify-end text-sm">
                            <button
                              className="flex items-center gap-2 rounded-lg border-2 border-[#C3C3C4] px-3 py-2 font-semibold text-wrap break-words"
                              onClick={() => setVerifyYourIdentity(true)}
                            >
                              Start
                            </button>
                          </div>
                        </div>

                        {/* Box 4: Verify Company Account */}
                        <div className="box-right flex w-full flex-col rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
                          <div className="flex items-center justify-start">
                            <Image src="/images/verifyIdentityLogo.png" alt="Company Account" width={40} height={40} />
                          </div>
                          <p className="w-full py-2 font-bold text-wrap break-words">Verify your Company Account</p>
                          <p className="w-full text-sm text-wrap break-words text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                          <div className="btn-bottom mt-5 flex items-center justify-end text-sm">
                            <button className="flex items-center gap-2 rounded-lg border-2 border-[#C3C3C4] px-3 py-2 font-semibold text-wrap break-words">
                              Start
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {verifyYourIdentity && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
                    <div className="relative max-h-[90vh] w-full max-w-[90%] overflow-y-auto rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[80%] md:max-w-[70%] lg:w-2/3">
                      {/* Close Button */}
                      <div className="absolute top-4 right-4">
                        <RxCross1
                          onClick={() => setVerifyYourIdentity(false)}
                          className="cursor-pointer text-lg text-gray-600 hover:text-black"
                        />
                      </div>

                      {/* Heading */}
                      <p className="break-words text-gray-500">
                        Verification Center / <span className="text-gray-900">Verify your identity</span>
                      </p>

                      {/* Title Section */}
                      <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                        <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[#FEEDF4] p-3">
                          <Image src="/images/verifyIdentityLogo.png" alt="" width={50} height={50} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-2xl font-semibold break-words">Verify your identity</p>
                          <p className="font-medium break-words text-[#6E6E70]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque
                          </p>
                        </div>
                      </div>

                      {/* Verification Options */}
                      <div className="verify-box-main flex flex-wrap items-center justify-center gap-6 pt-6">
                        {/* ID Card */}
                        <button
                          className="box-left w-full cursor-pointer rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-6 text-center shadow-md sm:w-64"
                          onClick={() => setVerifyIdCard(true)}
                        >
                          <div className="flex justify-center">
                            <Image src="/images/verifyIdCard.png" alt="ID Card" width={50} height={50} />
                          </div>
                          <p className="py-2 font-bold">Verify with ID card</p>
                          <p className="text-sm text-wrap text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                        </button>

                        {verifyIdCard && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="relative my-5 w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
                              {/* Close Button - Positioned Absolutely to Top Right */}
                              <div className="absolute top-4 right-4">
                                <RxCross1
                                  onClick={() => setVerifyIdCard(false)}
                                  className="cursor-pointer text-2xl text-gray-600 hover:text-black"
                                />
                              </div>

                              {/* Breadcrumb */}
                              <p className="text-sm text-gray-500 sm:text-base">
                                Verification Center / Verify your Identity /
                                <span className="text-gray-900"> Verify with ID Card </span>
                              </p>

                              {/* Header Section */}
                              <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                                <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[#FEEDF4] p-3 ps-4 pt-3.5">
                                  <Image
                                    src="/images/verifyIdentityLogo.png"
                                    alt="verify identity logo"
                                    width={100}
                                    height={40}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-lg font-semibold sm:text-2xl">Verify your identity</p>
                                  <p className="text-sm font-medium text-[#6E6E70] sm:text-base">
                                    Lorem ipsum dolor sit amet consectetur. Auctor pellentesque
                                  </p>
                                </div>
                              </div>

                              {/* Image Upload Fields */}
                              <div className="verify-box-main flex flex-col gap-4 pt-6 sm:flex-col sm:justify-center md:flex-col">
                                <ImageUpload />
                                <ImageUpload />
                              </div>

                              {/* Submit Button */}
                              <div className="mt-6 flex justify-center">
                                <button
                                  className="w-full rounded-full bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-6 py-3 text-center font-semibold text-white sm:w-auto sm:px-8 sm:py-4"
                                  onClick={() => setIsSubmittedDialogOpen(true)}
                                >
                                  Submit for Verification
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isSubmittedDialogOpen && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="container mx-auto flex w-full items-center justify-center px-4">
                              <div className="relative mx-auto w-full max-w-xs rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                                {/* Close Button */}
                                <div className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-600">
                                  <RxCross1
                                    onClick={() => setIsSubmittedDialogOpen(false)}
                                    className="cursor-pointer"
                                  />
                                </div>

                                {/* Top Section */}
                                <div className="flex flex-col items-center gap-4 text-center">
                                  {/* Icon */}
                                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEEDF4] p-4">
                                    <Image src="/images/verifiedbadge.png" alt="Verified" width={40} height={40} />
                                  </div>

                                  {/* Message */}
                                  <div>
                                    <p className="text-base font-semibold text-wrap sm:text-base md:text-base lg:text-lg 2xl:text-lg">
                                      Your information is submitted
                                    </p>
                                    <p className="text-sm text-wrap text-gray-600 sm:text-sm md:text-sm lg:text-base 2xl:text-base">
                                      We will notify you once your information is verified
                                    </p>
                                  </div>
                                </div>

                                {/* Buttons Section */}
                                <div className="mt-6 flex flex-col gap-3">
                                  <button
                                    className="w-full rounded-lg bg-[#FEEDF4] py-3 text-sm font-semibold sm:text-base"
                                    onClick={handleGoHome}
                                  >
                                    <span className="bg-gradient-to-r from-[#F5AF48] to-[#E32379] bg-clip-text text-transparent">
                                      Back home
                                    </span>
                                  </button>

                                  <button
                                    onClick={handleGoToVerification}
                                    className="w-full rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-5 py-3 text-sm font-semibold text-white sm:text-base"
                                  >
                                    Back to Verification Center
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Passport */}
                        <div className="box-right w-full rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-6 text-center shadow-md sm:w-64">
                          <div className="flex justify-center">
                            <Image src="/images/verifyPassport.png" alt="Passport" width={50} height={50} />
                          </div>
                          <p className="py-2 font-bold">Verify with passport</p>
                          <p className="text-sm text-wrap text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                        </div>

                        {/* License */}
                        <div className="box-left w-full rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-6 text-center shadow-md sm:w-64">
                          <div className="flex justify-center">
                            <Image src="/images/verifyPassport.png" alt="License" width={50} height={50} />
                          </div>
                          <p className="py-2 font-bold">Verify with license</p>
                          <p className="text-sm text-wrap text-[#454548]">
                            Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6 lg:p-8">
            {/* Enable scrolling on small screens */}
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse rounded-lg">
                <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-center sm:px-6">Order No#</th>
                    <th className="px-4 py-3 text-center sm:px-6">Artist Name</th>
                    <th className="px-4 py-3 text-center sm:px-6">Booking Date</th>
                    <th className="px-4 py-3 text-center sm:px-6">Budget</th>
                    <th className="px-4 py-3 text-center sm:px-6">Status</th>
                    <th className="px-4 py-3 text-center sm:px-6">Action</th>
                  </tr>
                </thead>

                <tbody className="bg-white text-sm sm:text-base">
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 text-center text-xs text-gray-900">{order.id}</td>

                      {/* Artist Name and Image */}
                      <td className="py-3 text-center text-xs sm:text-sm">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <Image
                            src={order.artistImage}
                            alt="Artist"
                            className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
                            width={40}
                            height={40}
                          />
                          <span className="text-xs font-semibold sm:text-sm">{order.artistName}</span>
                        </div>
                      </td>

                      <td className="mx-4 py-3 text-center text-xs">{order.bookingDate}</td>
                      <td className="py-3 text-center text-xs">{order.budget}</td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center sm:px-6">
                        <span className="inline-block rounded-full bg-[#FFEECC] px-3 py-2 text-xs text-[#553D00] sm:text-sm">
                          {order.status}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 py-3 text-center sm:px-6">
                        <div className="flex justify-center gap-2 sm:gap-3">
                          <button className="rounded-lg bg-[#F0E7FF] p-2 text-purple-500 hover:text-purple-700 sm:p-3">
                            <FaRegEye size={18} />
                          </button>
                          <button className="rounded-lg bg-[#F0E7FF] p-2 text-red-500 hover:text-red-700 sm:p-3">
                            <FaRegTrashAlt size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side (30%) */}
        <div className="w-full lg:w-[30%]">
          <div className="relative rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:border-gray-400 hover:shadow-md">
            <div className="relative h-32 rounded-lg bg-pink-100">
              <FaHeart className="absolute top-3 right-3 size-10 cursor-pointer rounded-full bg-white p-2 text-gray-300 hover:text-red-500" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-24 w-24">
                <Image
                  src="/images/ArtistsServicesImg.png"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white"
                />
                <BsCheckCircleFill className="absolute right-0 bottom-0 rounded-full bg-white text-xl text-green-500" />
              </div>
            </div>
            <div className="mt-16 space-y-2 text-center">
              <p className="text-xl font-semibold">Domenico</p>
              <p className="text-lg text-gray-500">UXUI Designer</p>
              <div className="flex items-center justify-center gap-2 text-lg text-gray-500">
                <MdLocationOn />
                <span>Bologna, Italy</span>
              </div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={`text-lg ${index < 5.0 ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 font-semibold">5.0</span>
                <span className="ml-1 text-sm text-gray-500">(890)</span>
              </div>
              <div className="flex flex-wrap gap-2 px-4">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">Product design</span>
              </div>

              <div className="p-4">
                <Link href={`/artists/`}>
                  <p className="w-full rounded-lg border border-[#F5AF48] py-3 text-center font-semibold text-[#F5AF48] transition hover:bg-[#F5AF48] hover:text-white">
                    View Profile
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">Inbox (295 unread)</p>
                <p className="gradient-text font-bold">View all</p>
              </div>
              <div className="my-4 w-full border-b border-gray-200"></div>
              <div className="flex items-start justify-start gap-4 pt-6">
                <Image alt="Image" src="/images/SellerDp.png" width={40} height={40} className="h-14 w-14" />
                <div className="flex-col items-center justify-between">
                  <p className="font-semibold text-gray-900">Domenica</p>
                  <p className="font-semibold text-gray-900">Hey, i have just finished th...</p>
                </div>
                <div className="gradient-bg ml-auto flex h-8 w-8 items-center justify-center rounded-full p-2 font-bold text-white">
                  2
                </div>
              </div>
              <div className="flex items-start justify-start gap-4 pt-6">
                <Image alt="Image" src="/images/SellerDp.png" width={40} height={40} className="h-14 w-14" />
                <div className="flex-col items-center justify-between">
                  <p className="text-gray-900">Domenica</p>
                  <p className="text-gray-900">Hey, i have just finished th...</p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-4 pt-6">
                <Image alt="Image" src="/images/SellerDp.png" width={40} height={40} className="h-14 w-14" />
                <div className="flex-col items-center justify-between">
                  <p className="text-gray-900">Domenica</p>
                  <p className="text-gray-900">Hey, i have just finished th...</p>
                </div>
              </div>
              <div className="flex items-start justify-start gap-4 pt-6">
                <Image alt="Image" src="/images/SellerDp.png" width={40} height={40} className="h-14 w-14" />
                <div className="flex-col items-center justify-between">
                  <p className="text-gray-900">Domenica</p>
                  <p className="text-gray-900">Hey, i have just finished th...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Verification Dialog */}
      {showPhoneVerification && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <RxCross1
                onClick={() => setShowPhoneVerification(false)}
                className="cursor-pointer text-lg text-gray-600 hover:text-black"
              />
            </div>

            <div className="top flex flex-col">
              <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                <div className="h-14 w-14 rounded-full bg-[#FEEDF4] p-3">
                  <Image 
                    src="/images/phone.png" 
                    alt="Phone" 
                    width={40} 
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10" 
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-semibold sm:text-2xl">Verify Phone Number</p>
                  <p className="text-sm font-medium text-[#6E6E70] sm:text-base">
                    Enter your phone number to receive verification code
                  </p>
                </div>
              </div>
            </div>

            <div className="verify-box-main mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-3 font-medium sm:px-5">
                <select
                  className="w-full border-0 py-4 text-sm outline-0 sm:py-5 sm:text-base"
                  name="countryCode"
                  id="countryCode"
                >
                  <option value="+44">+44</option>
                  <option value="+93">+93</option>
                  <option value="+92">+92</option>
                  <option value="+91">+91</option>
                </select>
              </div>

              <div className="flex-1 rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-3 font-medium sm:px-5">
                <input
                  className="no-spinner w-full border-0 py-4 text-sm outline-0 placeholder:text-gray-500 sm:text-base"
                  type="tel"
                  placeholder="Enter Phone Number..."
                />
              </div>
            </div>

            <div className="mt-8 flex w-full items-center justify-center">
              <button
                onClick={() => {
                  setShowPhoneVerification(false);
                  setShowPhoneSubmittedDialog(true);
                }}
                className="w-full cursor-pointer rounded-full bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-6 py-3 font-semibold text-white sm:w-auto sm:px-8 sm:py-4"
              >
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Verification Submitted Dialog */}
      {showPhoneSubmittedDialog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <RxCross1
                onClick={() => setShowPhoneSubmittedDialog(false)}
                className="cursor-pointer text-lg text-gray-600 hover:text-black"
              />
            </div>

            <div className="top flex flex-col">
              <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                <div className="h-14 w-14 rounded-full bg-[#FEEDF4] p-3">
                  <Image 
                    src="/images/phone.png" 
                    alt="Phone" 
                    width={40} 
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10" 
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-semibold sm:text-2xl">Enter OTP to Verify</p>
                  <p className="text-sm font-medium text-[#6E6E70] sm:text-base">
                    We have sent an OTP to your number if you wish to change number,
                    <button className="ps-2 font-medium text-[#E32379] underline decoration-2 underline-offset-4">
                      Click here
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="verify-box-main flex flex-wrap items-center justify-center gap-3 py-6 sm:gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-3 font-medium sm:px-5">
                  <input
                    className="no-spinner w-8 border-0 py-4 text-center text-lg outline-0 sm:w-10"
                    type="number"
                    maxLength={1}
                    min="0"
                    max="9"
                    onChange={(e) => {
                      e.target.value = e.target.value.slice(0, 1);
                      if (e.target.value && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLElement).focus();
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 text-center text-sm sm:text-base">
              <span className="text-gray-600">Didn&apos;t receive code? </span>
              <button className="font-semibold text-[#E32379]">Resend</button>
            </div>

            <div className="mt-6 flex w-full items-center justify-center">
              <button className="w-full cursor-pointer rounded-full bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-6 py-3 font-semibold text-white sm:w-auto sm:px-8 sm:py-4">
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  
  );
};

export default CompanyDashboard;
