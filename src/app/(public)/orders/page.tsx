"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
interface User {
  name: string;
  username: string;
  img: string;
}

interface Order {
  id: number;
  title: string;
  location: string;
  hrs: string;
  date: string;
  price: string;
  status: string;
  user: User;
  artist: string;
  company: string;
}

interface Message {
  id: number;
  name: string;
  message: string;
  unread: boolean;
}

const OrdersPage: React.FC = () => {
  const orders: Order[] = [
    {
      id: 1,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Completed",
      hrs: "Est. 6-8 hrs",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40"
      },
      artist: "Work With Artist",
      company: "Work With Company"
    },

    {
      id: 2,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      hrs: "Est. 6-8 hrs",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40"
      },
      artist: "Work With Artist",
      company: "Work With Company"
    },

    {
      id: 3,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      hrs: "Est. 6-8 hrs",
      price: "$350",
      status: "Completed",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40"
      },
      artist: "Work With Artist",
      company: "Work With Company"
    },

    {
      id: 3,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      hrs: "Est. 6-8 hrs",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40"
      },
      artist: "Work With Artist",
      company: "Work With Company"
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      name: "Domenica",
      message: "Hey, I have just finished th.. ",
      unread: true
    },
    {
      id: 2,
      name: "Antonio",
      message: "Hey, i have just finished the test 😊 ",
      unread: true
    },
    {
      id: 3,
      name: "Leonardo",
      message: "Hey, i have just finished the test 😊 ",
      unread: true
    },
    {
      id: 4,
      name: "Marco",
      message: "Hey, i have just finished the test 😊",
      unread: true
    },
    {
      id: 5,
      name: "Lorenzo",
      message: "Hey, i have just finished the test 😊 ",
      unread: true
    }
  ];
  const [activeTab, setActiveTab] = useState<"Active" | "Completed">("Active");

  const filteredOrders = orders.filter((order) => order.status === activeTab);
  return (
    <div className="flex items-center justify-center bg-[#EFEEF3] p-5">
      <div className="maincontainer flex w-full flex-col gap-6 lg:w-[90%] lg:flex-row">
        <div className="leftside flex-1 rounded-lg py-4">
          <h1 className="mb-4 text-2xl font-bold">Orders</h1>

          {/* <div className="mb-6 flex flex-wrap gap-4 font-semibold">
            <button className="px-4 py-2 hover:rounded-md hover:bg-gray-200">
              Active
              <span className="ml-4 rounded-md bg-[#E32379] px-2 py-2 text-white">28</span>
            </button>
            <button className="px-4 py-2 hover:rounded-md hover:bg-gray-200">
              Completed
              <span className="ml-4 rounded-md bg-white px-2 py-2 text-black">28</span>
            </button>
          </div> */}
          <div className="mb-6 flex flex-wrap gap-4 font-semibold">
            <button
              onClick={() => setActiveTab("Active")}
              className={`cursor-pointer px-4 py-2 hover:rounded-md hover:bg-gray-200 ${
                activeTab === "Active" ? "border-b-2 border-[#ed6d5f]" : ""
              }`}
            >
              Active
              <span
                className={`ml-4 rounded-md px-2 py-2 ${activeTab === "Active" ? "bg-[#ed6d5f] text-white" : "bg-white text-black"}`}
              >
                {filteredOrders?.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("Completed")}
              className={`cursor-pointer px-4 py-2 hover:rounded-md hover:bg-gray-200 ${
                activeTab === "Completed" ? "border-b-2 border-[#ed6d5f]" : ""
              }`}
            >
              Completed
              <span
                className={`ml-4 rounded-md px-2 py-2 ${activeTab === "Completed" ? "bg-[#ed6d5f] text-white" : "bg-white text-black"}`}
              >
                {filteredOrders?.length}
              </span>
            </button>
          </div>

          <div className="flex w-[100%] flex-col gap-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="rounded-lg bg-white p-4 shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-bold">{order.title}</h2>
                  <div className="ml-36 md:justify-between">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-[#0E8B1A]">{order.status}</span>
                  </div>
                </div>
                <p className="mt-2 flex items-center text-sm text-[#6e6e70]">
                  <IoLocationOutline className="mr-2 h-5 w-5 text-[#6e6e70]" />
                  {order.location}
                </p>
                <p className="mt-2 flex items-center text-sm text-[#6e6e70]">
                  <Image src="/images/hrs.svg" className="mr-2 h-5 w-5" alt="Calendar" width={20} height={20} />
                  {order.hrs}
                </p>

                <div className="mt-2 flex justify-between text-sm text-[#6e6e70]">
                  <span className="flex items-center justify-start">
                    <MdOutlineDateRange className="mr-2 h-5 w-5 text-[#6e6e70]" />
                    {order.date}
                  </span>

                  <span className="text-lg font-semibold text-black">{order.price}</span>
                </div>

                {/* Price and User Info */}
                <div className="mt-2 flex flex-col justify-between border-t border-t-1 border-t-gray-300 sm:flex-row sm:items-center">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/serviceUserProfile.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-[16px] font-bold">{order.user.name}</p>
                      <p className="text-[14px] text-gray-500">{order.user.username}</p>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500 sm:mt-0">
                    <button className="text-black">Directions</button>{" "}
                    <span className="ms-2 me-0 mb-4 text-4xl font-semibold text-gray-400">.</span>
                    <Link href={`order-details/${order.id}`}>
                      <button className="ml-4 cursor-pointer text-red-500">View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rightside pt-5">
          <div className="relative w-80 overflow-hidden rounded-2xl bg-white p-5 shadow-lg">
            {/* Top Rounded Background */}
            <div className="absolute top-0 left-0 h-24 w-full rounded-t-2xl bg-[#f5f5ff]"></div>

            {/* Profile Image */}
            <div className="relative z-10 mt-10 flex justify-center">
              <Image
                src="/images/SellerDp.png"
                alt="Profile"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-4 border-white shadow-md"
              />
              <span className="absolute right-[calc(50%-10px)] bottom-0 h-5 w-5 rounded-full bg-white p-[2px] shadow-sm">
                <FaCheckCircle className="text-green-500" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="mt-4 text-center">
              <h2 className="text-lg font-bold text-[#0E0E0F]">Domenica</h2>
              <p className="text-sm text-[#6E6E6F]">UXUI Designer</p>
              <p className="mt-1 text-sm text-[#6E6E6F]">
                <FaMapMarkerAlt className="mr-1 inline" />
                Bologna, Italy
              </p>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
              <span className="ml-2 font-semibold text-[#0E0E0F]">5.0</span>
              <span className="text-sm text-gray-500">(890)</span>
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Product Design", "App Design", "UI Design", "UX Design", "3+"].map((tag, index) => (
                <span key={index} className="rounded-full bg-[#f5f5f5] px-3 py-1 text-sm text-[#0E0E0F] shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* View Profile Button */}
            <div className="mt-5">
              <button
                className="w-full rounded-3xl border bg-white bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text py-2 text-center font-semibold text-transparent hover:opacity-80"
                style={{
                  borderImageSource: "linear-gradient(135deg, #F5AF48 0%, #F5AF48 0.21%, #E32379 100%)",
                  borderImageSlice: 1
                }}
              >
                View Profile
              </button>
            </div>
          </div>

          <div className="mt-8 w-80 rounded-lg bg-white p-4 shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Inbox (295 unread)</h2>
              <button className="text-sm font-semibold text-red-500 underline">View all</button>
            </div>
            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex cursor-pointer items-center rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
                >
                  <Image
                    src="/images/TrustUsers1.png"
                    alt="profile"
                    width={40}
                    height={40}
                    className="mr-3 h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{msg.name}</h3>
                    <p className="flex w-80 items-center text-sm text-gray-500">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
