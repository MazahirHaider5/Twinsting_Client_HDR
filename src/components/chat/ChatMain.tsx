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
  const [activeChat, setActiveChat] = useState(true); // Set to true initially for the image view

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F2F5]">
      <div className="mx-5 flex h-[85vh] w-full max-w-full overflow-hidden rounded-xl shadow-lg">
        {/* Left Sidebar - Chats List */}
        <div
          className={`flex h-full w-full flex-col border-r border-[#ECECEC] bg-white pt-6 sm:w-1/3 lg:w-1/4 ${activeChat ? "hidden sm:block" : "block"}`}
        >
          <div className="custom-scrollbar h-full overflow-y-auto">
            {/* Search Input */}
            <div className="mx-4 mb-1 flex rounded-full border border-gray-300 bg-white px-3 py-2">
              <CiSearch className="text-3xl text-gray-500" />
              <input type="text" placeholder="Search People" className="w-full bg-transparent outline-none" />
            </div>

            <div className="px-4 py-3">
              <div className="mb-3 flex items-center gap-2">
                <p className="cursor-pointer rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-4 py-1 font-semibold whitespace-nowrap text-white">
                  All
                </p>
                <p className="rounded-full bg-[#F5F5F5] px-3 py-2.5 text-xs text-gray-700">
                  Unread Messages{" "}
                  <span className="ml-1 cursor-pointer rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-2 py-1 font-semibold whitespace-nowrap text-white">
                    12
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Image alt="tick" src="/twist-images/Frame (5).svg" width={18} height={18} className="object-contain" />
                <h2 className="text-sm text-[#7D7C7E]">
                  All Messages <span className="text-base text-black">(100)</span>
                </h2>
              </div>
            </div>

            {/* Chat List */}
            <ul>
              {chatDetails.map((msg) => (
                <li
                  key={msg.id}
                  className={`mb-2 flex w-full cursor-pointer items-center justify-between bg-white p-2 hover:bg-[#E8F0FE] ${
                    activeChat && "" // Highlight active chat in desktop view
                  }`}
                  onClick={() => setActiveChat(true)}
                >
                  {/* Container for Avatar, Text & Read Icon */}
                  <div className="flex w-full items-center">
                    {/* Avatar + Tick Icon */}
                    <div className="relative mx-2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                      <Image
                        alt="avatar"
                        src="/images/serviceUserProfile.png"
                        fill
                        className="rounded-full object-cover"
                      />
                      <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-md sm:h-4 sm:w-4">
                        <Image
                          alt="tick"
                          src="/images/tickLoginIcon.png"
                          width={12}
                          height={12}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Name & Status */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-base">
                        {msg.name.length > 20 ? msg.name.substring(0, 17) + "..." : msg.name}
                      </p>
                      <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-sm">
                        {msg.status.length > 25 ? msg.status.substring(0, 22) + "..." : msg.status}
                      </p>
                    </div>

                    {/* Time & Read Icon */}
                    <div className="flex flex-col items-end px-2">
                      <p className="text-xs text-gray-500 sm:text-sm">{msg.time}</p>
                      <BsCheck2All className="mt-1 text-xs text-blue-500 sm:text-sm" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Chat Section */}
        <div
          className={`flex h-full w-full flex-col overflow-hidden bg-white sm:w-2/3 ${activeChat ? "block" : "hidden sm:block"}`}
        >
          {/* Chat Header */}
          <div className="border-b px-4 py-2">
            <button className="mb-2 text-blue-500 sm:hidden" onClick={() => setActiveChat(false)}>
              <IoIosArrowBack />
            </button>
            <div className="flex items-center justify-between pt-5">
              <div className="flex items-center">
                <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                  <Image alt="avatar" src="/images/serviceUserProfile.png" fill className="rounded-full object-cover" />
                  <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-md sm:h-4 sm:w-4">
                    <Image
                      alt="tick"
                      src="/images/tickLoginIcon.png"
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="ml-3 flex flex-col">
                  <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-base">
                    Domenica
                  </p>
                  <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-sm">Active</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded bg-gray-100 p-2">
                  <BsThreeDotsVertical className="text-lg text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages Section */}
          <div className="relative flex-1 overflow-y-auto p-4">
            {/* Top Section */}
            <div className="border-b py-2 text-center text-sm text-gray-400">TODAY</div>

            {/* Scrollable Content */}
            <div className="flex flex-col space-y-3 py-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
                >
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
                    className={`max-w-xs rounded-lg px-3 py-2 shadow sm:max-w-sm md:max-w-md ${
                      msg.type === "sent"
                        ? "rounded-br-none bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                        : "rounded-bl-none bg-[#F3F3F3] text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="mt-1 text-right text-xs text-gray-500">{msg.time}</p>
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

              {/* Contract Section inside scroll */}
              <div className="mx-auto w-full max-w-md rounded-lg bg-[#F7F7F8] px-4 py-3 shadow-md">
                <p className="text-sm font-semibold text-gray-900">Boa Hancock do you want to be hired?</p>
                <p className="text-xs text-gray-500">
                  The term of this contract is for one year, commencing on 23 Sep, 2023 and ending on 23 Sep, 2024.
                </p>
                <p className="pt-2 text-sm text-gray-900">Your offer Included:</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <LuCircleDollarSign className="h-3 w-3 text-gray-900" />
                    <p className="text-xs font-bold text-gray-600">
                      Amount: <span className="font-semibold text-gray-900">$15</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* You can add icons for Duration and Service here if needed */}
                    <p className="text-xs font-bold text-gray-600">
                      Duration: <span className="font-semibold text-gray-900">One Week</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-gray-600">
                      Service: <span className="font-semibold text-gray-900">Online</span>
                    </p>
                  </div>
                </div>
                <div className="mt-2 w-full border-b border-gray-200"></div>
                <div className="flex w-full items-center justify-end gap-2 py-2">
                  <p className="text-left text-xs whitespace-nowrap text-black underline">View Contract Detail</p>
                  <div className="rounded-lg bg-[#D1FAE5] px-2 py-1 text-xs text-green-700">Contract Accepted</div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Input Section at the bottom */}
          <div className="border-t border-gray-200 bg-white px-2 py-2">
            <div className="mx-auto w-full rounded-xl bg-[#F7F7F8] p-2 shadow-inner lg:w-[98%]">
              <div className="flex w-full flex-wrap items-center justify-between rounded-lg border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="Type here something..."
                  className="min-w-0 flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none sm:text-sm md:text-base lg:text-sm"
                />
                <div className="ml-2 flex items-center space-x-2 sm:ml-4 sm:space-x-3">
                  <FaBold className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                  <FaItalic className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                  <FaLink className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                  <FaSmile className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
                </div>
                <div className="mt-2 ml-2 flex flex-wrap items-center space-x-2 sm:mt-0 sm:ml-4 sm:space-x-4">
                  <button className="rounded-full bg-[#5865F2] px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
                    Create an offer
                  </button>
                  <span className="cursor-pointer text-xs text-gray-700 hover:underline sm:text-sm">Send Message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
