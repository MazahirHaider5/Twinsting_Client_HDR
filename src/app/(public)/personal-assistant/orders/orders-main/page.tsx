import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
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
  date: string;
  price: string;
  status: string;
  user: User;
  artist:string;
  company:string;
}

interface Message {
  id: number;
  name: string;
  message: string;
  unread: boolean;
}

const ArtistsideDashboard: React.FC = () => {
  const orders: Order[] = [
    {
      id: 1,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40",
      },
      artist: "Work With Artist",
      company:"Work With Company",
    },

    {
      id: 2,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40",
      },
      artist:"Work With Artist",
      company:"Work With Company",
    },

    {
      id: 3,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40",
      },
      artist:"Work With Artist",
      company:"Work With Company",
    },

    {
      id: 3,
      title: "I Need Dance for a Shoot",
      location: "Bologna, Italy",
      date: "Wed, Nov 29 at 9:30am",
      price: "$350",
      status: "Active",
      user: {
        name: "Domenica",
        username: "domenica67@gmail.com",
        img: "https://via.placeholder.com/40",
      },
      artist:"Work With Artist",
      company:"Work With Company",
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      name: "Domenica",
      message: "Hey, I have just finished th.. ",
      unread: true,
    },
    {
      id: 2,
      name: "Antonio",
      message: "Hey, i have just finished the test 😊 ",
      unread: true,
    },
    {
      id: 3,
      name: "Leonardo",
      message: "Hey, i have just finished the test 😊 ",
      unread: true,
    },
    {
      id: 4,
      name: "Marco",
      message: "Hey, i have just finished the test 😊",
      unread: true,
    },
    {
      id: 5,
      name: "Lorenzo",
      message: "Hey, i have just finished the test 😊 ",
      unread: true,
    },
  ];

  return (
    <div className="bg-[#EFEEF3] p-5 flex justify-center items-center">
      <div className="maincontainer w-full lg:w-[90%] gap-6 flex flex-col lg:flex-row">
        <div className="leftside flex-1 py-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>

          <div className="flex flex-wrap gap-4 mb-6 font-semibold">
            <button className="px-4 py-2 hover:rounded-md hover:bg-gray-200">
              Active
              <span className="ml-4 bg-[#E32379] text-white rounded-md px-2 py-2">
                28
              </span>
            </button>
            <button className="px-4 py-2 hover:rounded-md hover:bg-gray-200">
              Completed
              <span className="ml-4 bg-white text-black rounded-md px-2 py-2">
                28
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-4 w-[100%]">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">{order.title}</h2>
                  <div className="ml-36 md:justify-between">
                  <span className="px-3 py-1 mr-2 text-sm bg-[#F2EBFB] text-[#8B8B8D] rounded-full">
                    {order.company}
                  </span>  
                  <span className="px-3 py-1 mr-2 text-sm bg-[#F2EBFB] text-[#9D67E2] rounded-full">
                    {order.artist}
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-100 text-[#0E8B1A] rounded-full">
                    {order.status}
                  </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  {order.location}
                </p>
                <div className="flex justify-between mt-2 text-gray-700 text-sm">
                  <span className="flex w-48 items-center gap-2">
                    <Image 
                      src="/images/calendar-edit.png" 
                      alt="Calendar" 
                      width={20} 
                      height={20} 
                    />
                    {order.date}</span>
                  <span className="text-lg font-semibold">{order.price}</span>
                </div>

                {/* Price and User Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-10">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/serviceUserProfile.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-[16px] font-bold">{order.user.name}</p>
                      <p className="text-[14px] text-gray-500">
                        {order.user.username}
                      </p>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500 sm:mt-0 ">
                    <button className="text-blue-500 ">Directions</button>
                    <button className="text-red-500 ml-4">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rightside pt-5">
          <div className="lg:w-[90%] w-full bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
            <div className="flex justify-center">
              <Image
                src="/images/SellerDp.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-2 border-white shadow-md"
              />

            </div>
            <div className="text-center mt-3">
              <h2 className="text-lg font-semibold text-[#0E0E0F]">Domenica</h2>
              <p className="text-sm text-[#6E6E6F]">domenica67@gmail.com</p>
              <p className="text-sm items-center mt-2 text-[#6E6E6F]">
                  <FaMapMarkerAlt className="inline mr-2 " />
                  Bologna, Italy
                </p>
            </div>
            <div className="flex justify-center items-center mt-3">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500 text-lg ml-2" />
              ))}
              <span className="text-gray-700 font-semibold ml-2">5.0</span>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-[#6C6D6E]">Total Orders:</p>
              <p className="text-[#0A0B0E]">145</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-[#6C6D6E]">Added on</p>
              <p className="text-[#0A0B0E]">23 Apr, 2024</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-[#6C6D6E]">Total Earned Amount:</p>
              <p className="text-[#0A0B0E]">$2,000.00</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-[#6C6D6E]">Completed Orders</p>
              <p className="text-[#0A0B0E]">$2,000.00</p>
            </div>
            
          </div>
          <div className="sm:w-[90%] lg:w-[90%] bg-white p-4 mt-8 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Inbox (295 unread)</h2>
              <button className="text-red-500 text-sm font-semibold underline">
                View all
              </button>
            </div>
            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <Image
                    src="/images/TrustUsers1.png"
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{msg.name}</h3>
                    <p className="text-gray-500 text-sm  w-80 flex items-center">
                      {msg.message}
                    </p>
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

export default ArtistsideDashboard;
