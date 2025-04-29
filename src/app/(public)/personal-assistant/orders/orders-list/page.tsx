"use client";
import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Image from "next/image";

interface User {
  name: string;
  username: string;
  img: string;
}

interface Order {
  id: number;
  title: string;
  location: string;
  duration: string;
  date: string;
  price: string;
  status: "Active" | "Completed" | "Cancelled" | "Upcoming";
  user: User;
  artist:string;
  company:string;
  status1:string;
}

const orders: Order[] = [
  {
    id: 1,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "https://via.placeholder.com/40",
    },
    status1:"Active",
    artist:"Work With Artist",
    company:"Work With Company",
    
  },
  {
    id: 2,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "",
    },
    artist:"Work With Artist",
    company:"Work With Company",
    status1:"Active",
  },
  {
    id: 3,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "",
    },
    artist:"Work With Artist",
      company:"Work With Company",
      status1:"Active",
  },
  {
    id: 4,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "",
    },
    artist:"Work With Artist",
      company:"Work With Company",
      status1:"Active",
  },
  {
    id: 5,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "",
    },
    artist:"Work With Artist",
      company:"Work With Company",
      status1:"Active",
  },
  {
    id: 6,
    title: "I Need Dance for a Shoot",
    location: "23 Elm Street, Portland, Oregon GT351",
    duration: "Est. 6-8 hrs",
    date: "Wed, Nov 29 at 9:30am",
    price: "$350",
    status: "Active",
    user: {
      name: "Domenica",
      username: "@gtoneric45",
      img: "",
    },
    artist:"Work With Artist",
      company:"Work With Company",
      status1:"Active",
  },
];

const OrderList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Order["status"]>("Active");

  return (
    <div className="p-6 bg-gray-100 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Order Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["Active", "Completed", "Cancelled", "Upcoming"] as Order["status"][]).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {orders
          .filter((order) => order.status === activeTab)
          .map((order) => (
            <div key={order.id} className="bg-white  p-4">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-2">
                <h2 className=" text-xl lg:text-lg font-bold">{order.title}</h2>
                <div className=" hidden lg:flex flex-row">
                  <span className="text-sm mb-1 mr-2 bg-[#F2EBFB] text-[#8B8B8D] rounded-full">
                    {order.company}
                  </span>  
                  <span className="rounded-full mb-2 text-sm mr-2 bg-[#F2EBFB] text-[#9D67E2]">
                    {order.artist}
                  </span>
                  <span className="text-sm rounded-full bg-green-100 text-[#0E8B1A]">
                    {order.status1}
                  </span>
                  </div>
              </div>

              {/* Order Details */}
              <p className="text-gray-500 text-sm flex items-center mt-2">
                <FaMapMarkerAlt className="mr-2 text-gray-400" /> {order.location}
              </p>
              <p className="text-gray-500 text-sm flex items-center mt-2">
                <FaClock className="mr-2 text-gray-400" /> {order.duration}
              </p>
              <div className="flex justify-between mt-2 text-gray-700 text-sm">
                <span>{order.date}</span>
                <span className="text-lg font-semibold">{order.price}</span>
              </div>

              {/* User Info and Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/SellerDp.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "jobcardpic.png";
                    }}
                  />
                  <div>
                    <p className="text-[16px] font-bold">{order.user.name}</p>
                    <p className="text-[14px] text-gray-500">
                      {order.user.username}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="text-blue-500 text-sm hover:text-blue-700">
                    Directions
                  </button>
                  <button className="text-red-500 text-sm hover:text-red-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderList;