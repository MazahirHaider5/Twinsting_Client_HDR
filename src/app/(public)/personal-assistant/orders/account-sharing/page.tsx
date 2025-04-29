"use client";
import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi"
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

interface User {
  name: string;
  email: string;
  role: string;
  date: string;
  avatar: string;
}

const users: User[] = [{
  name: "Domenico",
  email: "domenica745@gmail.com",
  role: "Personal Assistance",
  date: "23 May, 2024",
  avatar: "/images/serviceUserProfile.png"
},
{
  name: "Domenico",
  email: "domenica745@gmail.com",
  role: "Personal Assistance",
  date: "23 May, 2024",
  avatar: "/images/serviceUserProfile.png"
},
{
  name: "Domenico",
  email: "domenica745@gmail.com",
  role: "Personal Assistance",
  date: "23 May, 2024",
  avatar: "/images/serviceUserProfile.png"
},
{
  name: "Domenico",
  email: "domenica745@gmail.com",
  role: "Personal Assistance",
  date: "23 May, 2024",
  avatar: "/images/serviceUserProfile.png"
},
{
  name: "Domenico",
  email: "domenica745@gmail.com",
  role: "Personal Assistance",
  date: "23 May, 2024",
  avatar: "/images/serviceUserProfile.png"
}
];

const AccountSharing = () => {
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [email, setEmail] = useState("");
  
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="flex items-center gap-2 text-sm py-4 mb-4">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">Account Information</span>
      </div>
      <div className="rounded-lg bg-white shadow-md">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Account Sharing</h2>
            <p className="text-sm text-gray-500">Users that have access to your account</p>
          </div>
          <button
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-2.5 text-sm font-medium text-white hover:shadow-md transition-all"
            onClick={() => setAddUserDialog(true)}
          >
            + Add New User
          </button>

          {addUserDialog && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
              <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
                <button 
                  onClick={() => setAddUserDialog(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <RxCross1 size={24} />
                </button>
                <div className="top flex flex-col">
                  <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                    <div className="h-14 w-14 rounded-full bg-[#FEEDF4] p-3">
                      <HiOutlineMail className="h-8 w-8 text-pink-500 sm:h-10 sm:w-10" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold sm:text-2xl">Add New Personal Assistance</h2>
                      <p className="text-sm font-medium text-[#6E6E70] sm:text-base">
                        Enter email address to invite a new personal assistance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address..."
                      className="w-full rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] pl-10 pr-3 py-4 text-sm font-medium outline-none focus:border-pink-400 sm:text-base"
                    />
                  </div>
                  <button className="w-full sm:w-auto whitespace-nowrap rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-6 py-4 font-semibold text-white hover:opacity-90 transition-opacity">
                    Invite
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-pink-50 flex items-center justify-center">
                      <Image src="/images/loadingImage.png" alt="" width={0} height={0} className="h-10 w-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">Domenica</h3>
                      <p className="text-xs text-gray-500 truncate">domenica65@gmail.com</p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-6 py-4 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                      Can View ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Table Container */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                      Email Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                      Add on
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: User, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              src={user.avatar}
                              alt={`${user.name}'s avatar`}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="font-medium text-gray-900">{user.name}</span>
                            <span className="text-sm text-gray-500 sm:hidden">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-sm text-gray-900">{user.email}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className="text-sm text-gray-500">{user.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center gap-3">
                          <button className="rounded-full p-2 text-purple-500 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                            <FaEye size={16} />
                          </button>
                          <button className="rounded-full p-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <FaTrash size={16} />
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
      </div>
    </div>
  );
};

export default AccountSharing;