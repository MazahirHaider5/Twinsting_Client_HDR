"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCheck2All, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaBold, FaItalic, FaLink, FaSmile } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const chatDetails = [
  { id: 1, name: "Domenica", status: "Hey there, what's up?", time: "04:43" },
  { id: 2, name: "Alex", status: "Let's meet tomorrow!", time: "12:15" },
  { id: 3, name: "Sophia", status: "Call me when free!", time: "10:30" },
  { id: 4, name: "James", status: "See you soon!", time: "09:45" },
  { id: 5, name: "Olivia", status: "Meeting postponed.", time: "14:20" },
  { id: 6, name: "Michael", status: "Send the files.", time: "16:50" },
  { id: 7, name: "Emma", status: "Good morning!", time: "08:10" },
  { id: 8, name: "William", status: "See my latest post!", time: "18:00" },
  { id: 9, name: "Ava", status: "I'll call you back.", time: "20:30" },
  { id: 10, name: "Daniel", status: "Join the group chat.", time: "22:15" }
];

const messages = [
  {
    id: 1,
    sender: "Domenica",
    time: "10:23 AM",
    text: "Hy Shanks, Are you available for a tuition?",
    type: "received"
  },
  {
    id: 2,
    sender: "Domenica",
    time: "10:23 AM",
    text: "Can you share the process of your teaching with me?",
    type: "received"
  },
  {
    id: 3,
    sender: "You",
    time: "10:23 AM",
    text: "Hi Nico, Yes! I am available, Can you share further details?",
    type: "sent"
  }
];

export default function ChatApp() {
  const [activeChat, setActiveChat] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar - Chats List */}
      <div
        className={`custom-scrollbar h-screen w-full overflow-y-auto border-r bg-gray-100 p-4 sm:w-1/3 lg:w-1/4 ${
          activeChat ? "hidden sm:block" : "block"
        }`}
      >
        {/* Search Input */}
        <div className="mx-4 mb-6 flex flex-row rounded-full border border-gray-300 bg-gray-200 p-4">
          <CiSearch className="text-xl text-gray-500" />
          <input type="text" placeholder="Search..." className="w-full bg-transparent px-2 outline-none" />
        </div>

        {/* Chat List */}
        <ul>
          {chatDetails.map((msg) => (
            <li
              key={msg.id}
              className="mb-2 flex w-full cursor-pointer items-center justify-between rounded bg-white p-2 shadow"
              onClick={() => setActiveChat(true)}
            >
              {/* Container for Avatar, Text & Read Icon */}
              <div className="flex w-full items-center">
                {/* Avatar + Tick Icon */}
                <div className="relative mx-2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16">
                  <Image alt="avatar" src="/images/serviceUserProfile.png" fill className="rounded-full object-cover" />
                  <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md sm:h-5 sm:w-5 md:h-6 md:w-6">
                    <Image
                      alt="tick"
                      src="/images/tickLoginIcon.png"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name & Status */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-lg xl:text-lg">
                    {msg.name.length > 20 ? msg.name.substring(0, 17) + "..." : msg.name}
                  </p>
                  <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-base xl:text-base">
                    {msg.status.length > 25 ? msg.status.substring(0, 22) + "..." : msg.status}
                  </p>
                </div>

                {/* Time & Read Icon */}
                <div className="flex flex-col items-end px-2">
                  <p className="text-xs text-gray-500 sm:text-sm md:text-base">{msg.time}</p>
                  <BsCheck2All className="mt-1 text-base text-blue-500 sm:text-lg md:text-xl" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Chat Section */}
      <div
        className={`custom-scrollbar h-screen w-full overflow-y-auto bg-white p-4 sm:w-2/3 lg:w-1/2 ${
          activeChat ? "block" : "hidden sm:block"
        }`}
      >
        <button className="mb-2 text-blue-500 sm:hidden" onClick={() => setActiveChat(false)}>
          <IoIosArrowBack />
        </button>

        {/* Chat Header */}
        <div className="flex w-full items-center justify-between border-b pb-2">
          <div className="flex items-center">
            <div className="relative mx-2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16">
              <Image alt="avatar" src="/images/serviceUserProfile.png" fill className="rounded-full object-cover" />
              <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md sm:h-5 sm:w-5 md:h-6 md:w-6">
                <Image alt="tick" src="/images/tickLoginIcon.png" width={16} height={16} className="object-contain" />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-lg xl:text-lg">
                Name
              </p>
              <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-base xl:text-base">Online</p>
            </div>
          </div>
          <div className="flex flex-col items-center px-4">
            <div className="rounded bg-gray-100 p-3">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>

        {/* Chat Messages Section */}
        <div className="relative m-4 flex h-screen flex-col rounded-lg bg-gray-100 p-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl">
          <div className="border-b py-2 text-center text-sm text-gray-400">TODAY</div>

          <div className="flex max-h-[70vh] flex-col space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end ${msg.type === "sent" ? "justify-end" : "justify-start"}`}>
                {msg.type === "received" && (
                  <Image
                    src="/images/serviceUserProfile.png"
                    width={32}
                    height={32}
                    alt="Avatar"
                    className="mr-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                  />
                )}
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 shadow sm:max-w-sm md:max-w-md ${
                    msg.type === "sent"
                      ? "rounded-br-none bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                      : "rounded-bl-none bg-white text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.type === "sent" && (
                  <Image
                    src="/images/serviceUserProfile.png"
                    width={32}
                    height={32}
                    alt="Avatar"
                    className="ml-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Contract Section */}
          <div className="mx-auto w-full max-w-4xl rounded-lg bg-white px-2 py-4 shadow-lg sm:px-8 md:px-10 lg:max-w-3xl xl:max-w-2xl">
            <p className="md:text-md text-sm font-semibold sm:text-sm lg:text-lg 2xl:text-xl">
              Boa Hancock do you want to be hired?
            </p>
            <p className="text-xs text-gray-500 sm:text-xs md:text-sm lg:text-base 2xl:text-base">
              The term of this contract is for one year, commencing on 23 Sep, 2023 and ending on 23 Sep, 2024.
            </p>
            <p className="pt-3 text-sm text-gray-900 sm:text-sm md:text-base lg:text-base 2xl:text-lg">
              Your offer Included:
            </p>
            <div className="flex w-full justify-between pt-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-2">
                  <LuCircleDollarSign className="h-3 w-3 text-gray-900 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5" />
                  <p className="text-sm font-bold text-gray-600 sm:text-sm md:text-base lg:text-lg 2xl:text-lg">
                    Amount: <span className="font-semibold text-gray-900">$15</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="my-2 w-full border-b border-gray-200"></div>
            <div className="flex w-full items-center justify-end gap-2 py-4">
              <p className="text-left text-xs whitespace-nowrap text-black underline sm:text-xs md:text-sm lg:text-sm 2xl:text-base">
                View Contract Detail
              </p>
              <div className="rounded-lg bg-gray-200 p-4 text-xs text-gray-600 sm:text-xs md:text-sm lg:text-sm 2xl:text-base">
                Contract Accepted
              </div>
            </div>
          </div>
          {/* <p className="px-4 pt-4 text-center text-xs text-gray-500 sm:px-6 sm:pt-6 sm:text-left sm:text-sm md:text-base lg:px-8 lg:pt-10 lg:text-lg 2xl:px-10 2xl:pt-12 2xl:text-xl">
            Nico Robin is typing...
          </p> */}

          {/* Input Section */}
          <div className="absolute bottom-0 left-0 w-full bg-white p-2 shadow-md sm:p-3">
            <div className="flex w-full flex-wrap items-center justify-between rounded-lg border border-gray-300 p-2 sm:p-3">
              <input
                type="text"
                placeholder="Type here something..."
                className="min-w-0 flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none sm:text-sm md:text-base lg:text-lg"
              />
              <div className="ml-2 flex items-center space-x-2 sm:ml-4 sm:space-x-3">
                <FaBold className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                <FaItalic className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                <FaLink className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                <FaSmile className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
              </div>

              <div className="mt-2 ml-2 flex flex-wrap items-center space-x-2 sm:mt-0 sm:ml-4 sm:space-x-4">
                <button className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
                  Create an offer
                </button>
                <span className="cursor-pointer text-xs text-gray-700 hover:underline sm:text-sm">Send Message</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
