"use client";

import React, { useState } from "react";
import Image from "next/image";
import WithdrawBalance from "./withdraw"; // Assuming WithdrawBalance.tsx is in the same directory

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

const OrdersTable = () => {
  return (
    <div
      className="relative mx-4 max-h-[350px] w-full overflow-auto md:mx-4 lg:mx-0"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}
    >
      <table className="w-full min-w-[600px] border-collapse">
        {/* Table Head */}
        <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
          <tr className="border-b border-gray-300 text-[#6E6E70]">
            <th className="p-4 text-left">Order No#</th>
            <th className="p-4 text-left">Artist Name</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Clearance Time</th>
            <th className="p-4 text-left">Amount</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="overflow-y-auto">
          {dummydata.map((data, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-4">#{data.orderNo}</td>
              <td className="flex items-center gap-2 p-4">
                <Image
                  src="/analytics-page/EllipseAnalytics.svg"
                  width={30}
                  height={30}
                  className="rounded-full bg-[#fff]"
                  alt=""
                />
                {data.artistName}
              </td>
              <td className="p-4">{data.date}</td>
              <td className="p-4">{data.clearanceTime}</td>
              <td className="p-4">{data.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Walletpage = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const handleWithdrawClick = () => {
    setIsWithdrawOpen(true);
  };

  const handleCloseWithdraw = () => {
    setIsWithdrawOpen(false);
  };

  return (
    <div className="relative h-full w-full bg-[#EFEEF3] pb-12">
      <div className="px-6 py-5 text-center text-[22px] font-bold sm:text-start md:px-6 lg:px-[2.5rem]">
        <h1>My Wallet</h1>
      </div>

      <div className="mx-[2.5rem] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <div className="h-44 rounded-xl bg-white p-5 text-center">
          <p className="text-sm font-semibold text-[#6E6E70]">Balance available for use</p>
          <p className="pt-2 text-2xl font-bold">$1,712.00</p>
          <div className="mt-4">
            <button
              onClick={handleWithdrawClick}
              className="cursor-pointer rounded-lg bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-8 py-4 font-semibold whitespace-nowrap text-white"
            >
              Withdraw your balance
            </button>
          </div>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-xl bg-white p-5">
          <p className="text-sm font-semibold text-[#6E6E70]">Payments being cleared</p>
          <p className="pt-2 text-2xl font-bold">$112.00</p>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-xl bg-white p-5">
          <p className="text-sm font-semibold text-[#6E6E70]">Earnings to date</p>
          <p className="pt-2 text-2xl font-bold">$102,059.32</p>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-xl bg-white p-5">
          <p className="text-sm font-semibold text-[#6E6E70]">Total jobs</p>
          <p className="pt-2 text-2xl font-bold">230</p>
        </div>
      </div>

      <div className="m-auto mx-4 mt-10 overflow-x-auto rounded-xl bg-[#fff] md:mx-4 lg:mx-[2.5rem]">
        <div className="p-5 text-lg font-bold">
          <h1>Order History</h1>
        </div>
        <OrdersTable />
      </div>

      {isWithdrawOpen && <WithdrawBalance onClose={handleCloseWithdraw} />}
    </div>
  );
};

export default Walletpage;
