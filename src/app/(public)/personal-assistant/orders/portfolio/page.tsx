"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";

const dummydata = [
    {
        orderNo: "54625",
        artistName: "Domenica",
        artistImage: "/images/Ellipse 15.png",
        date: "23 Nov, 2023",
        clearanceTime: "1 Day",
        amount: "$235"
    },
    {
        orderNo: "54626",

        artistName: "John Doe",

        artistImage: "/images/Ellipse 15.png",

        date: "24 Nov, 2023",

        clearanceTime: "2 Days",

        amount: "$500"
    },
    {
        orderNo: "54627",

        artistName: "Jane Smith",

        artistImage: "/images/Ellipse 15.png",

        date: "25 Nov, 2023",

        clearanceTime: "3 Days",

        amount: "$350"
    },

    {
        orderNo: "54628",

        artistName: "Michael",

        artistImage: "/images/Ellipse 15.png",

        date: "26 Nov, 2023",

        clearanceTime: "1 Day",

        amount: "$450"
    },

    {
        orderNo: "54629",

        artistName: "Emily",

        artistImage: "/images/Ellipse 15.png",

        date: "27 Nov, 2023",

        clearanceTime: "2 Days",

        amount: "$400"
    },

    {
        orderNo: "54630",

        artistName: "Sarah",

        artistImage: "/images/Ellipse 15.png",

        date: "28 Nov, 2023",

        clearanceTime: "3 Days",

        amount: "$380"
    },

    {
        orderNo: "54631",

        artistName: "David",

        artistImage: "/images/Ellipse 15.png",

        date: "29 Nov, 2023",

        clearanceTime: "2 Days",

        amount: "$410"
    },

    {
        orderNo: "54632",

        artistName: "Olivia",

        artistImage: "/images/Ellipse 15.png",

        date: "30 Nov, 2023",

        clearanceTime: "1 Day",

        amount: "$320"
    },

    {
        orderNo: "54633",

        artistName: "Liam",

        artistImage: "/images/Ellipse 15.png",

        date: "1 Dec, 2023",

        clearanceTime: "3 Days",

        amount: "$515"
    },

    {
        orderNo: "54634",

        artistName: "Sophia",

        artistImage: "/images/Ellipse 15.png",

        date: "2 Dec, 2023",

        clearanceTime: "2 Days",

        amount: "$280"
    }
];

const Portfolio = () => {
    const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
    const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);

    return (
        <div className="min-h-screen bg-[#EFEEF3] pb-12">
            {/* Breadcrumb */}
            <div className="px-6 py-5 md:px-8 lg:px-12">
                <div className="flex items-center gap-2 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                    </Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-900">Wallet</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold">My Wallet</h1>
            </div>

            {/* Cards Section */}
            <div className="mx-auto grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 md:px-8 lg:px-12">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Balance available for use</p>
                    <p className="mt-2 text-2xl font-bold">$1,712.00</p>
                    <button 
                        onClick={() => setShowWithdrawDialog(true)}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        Withdraw your balance
                    </button>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Payments being cleared</p>
                    <p className="mt-2 text-2xl font-bold">$112.00</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Earnings to date</p>
                    <p className="mt-2 text-2xl font-bold">$102,059.32</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Total jobs</p>
                    <p className="mt-2 text-2xl font-bold">230</p>
                </div>
            </div>

            {/* Order History Section */}
            <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-4 sm:p-6">
                        <h2 className="text-lg font-bold">Order History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50 text-xs sm:text-sm text-gray-600">
                                    <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 text-left font-medium">Order No#</th>
                                    <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 text-left font-medium">Artist Name</th>
                                    <th className="hidden sm:table-cell whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 text-left font-medium">Date</th>
                                    <th className="hidden md:table-cell whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 text-left font-medium">Clearance Time</th>
                                    <th className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 text-left font-medium">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummydata.map((data, index) => (
                                    <tr 
                                        key={index} 
                                        className="border-b border-gray-100 text-xs sm:text-sm hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">#{data.orderNo}</td>
                                        <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <Image 
                                                    src={data.artistImage} 
                                                    alt={data.artistName} 
                                                    width={24}
                                                    height={24}
                                                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
                                                />
                                                <span className="truncate max-w-[100px] sm:max-w-none">{data.artistName}</span>
                                            </div>
                                        </td>
                                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">{data.date}</td>
                                        <td className="hidden md:table-cell whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">{data.clearanceTime}</td>
                                        <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4 font-medium">{data.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Withdraw Dialog */}
            {showWithdrawDialog && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
                    <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
                        {/* Close Button */}
                        <div className="absolute top-4 right-4">
                            <RxCross1
                                onClick={() => setShowWithdrawDialog(false)}
                                className="cursor-pointer text-lg text-gray-600 hover:text-black"
                            />
                        </div>

                        <div className="text-center">
                            <h2 className="text-lg font-semibold">Withdraw Balance</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                To begin the withdrawal process, select your preferred payout method.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            {/* PayPal Option */}
                            <button 
                                onClick={() => {
                                    setShowWithdrawDialog(false);
                                    setShowPaymentMethodDialog(true);
                                }}
                                className="flex w-full items-center justify-center rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Image 
                                        src="/images/paypal.png" 
                                        alt="PayPal" 
                                        width={24} 
                                        height={24} 
                                        className="h-6 w-6"
                                    />
                                    <span className="font-medium">PayPal Account</span>
                                </div>
                            </button>

                            {/* Bank Transfer Option */}
                            <button 
                                onClick={() => {
                                    setShowWithdrawDialog(false);
                                    setShowPaymentMethodDialog(true);
                                }}
                                className="flex w-full items-center justify-center rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Image 
                                        src="/images/BankTransfer.png" 
                                        alt="Bank Transfer" 
                                        width={0} 
                                        height={0} 
                                        className="h-6 w-6"
                                    />
                                    <span className="font-medium">Bank Transfer</span>
                                </div>
                              
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Method Dialog */}
            {showPaymentMethodDialog && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
                    <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
                        {/* Close Button */}
                        <div className="absolute top-4 right-4">
                            <RxCross1
                                onClick={() => setShowPaymentMethodDialog(false)}
                                className="cursor-pointer text-lg text-gray-600 hover:text-black"
                            />
                        </div>

                        <div className="text-center">
                            <h2 className="text-lg font-semibold">Enter Payment Details</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Please enter your payment details to proceed with the withdrawal
                            </p>
                        </div>

                        {/* Add payment form here */}
                        <div className="mt-6">
                            {/* Form fields will go here */}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => setShowPaymentMethodDialog(false)}
                                className="w-full rounded-lg bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                            >
                                Confirm Withdrawal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
