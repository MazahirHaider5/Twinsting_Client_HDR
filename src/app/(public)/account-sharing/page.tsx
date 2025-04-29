"use client";

import Image from "next/image";
import { useState } from "react";
import { Cross1Icon as RxCross1 } from "@radix-ui/react-icons";
import { HiOutlineMail } from "react-icons/hi";

// Dummy data for users
const dummydata = [
  {
    userName: "Domenica",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "domenica745@gmail.com",
    date: "23 Nov, 2023",
    role: "Personal Assistance",
    amount: "$235"
  },
  {
    userName: "John Doe",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "John Doe745@gmail.com",
    date: "24 Nov, 2023",
    role: "Personal Assistance",
    amount: "$500"
  },
  {
    userName: "Jane Smith",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Jane Smith745@gmail.com",
    date: "25 Nov, 2023",
    role: "Personal Assistance",
    amount: "$350"
  },
  {
    userName: "Michael",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Michael745@gmail.com",
    date: "26 Nov, 2023",
    role: "Personal Assistance",
    amount: "$450"
  },
  {
    userName: "Emily",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Emily745@gmail.com",
    date: "27 Nov, 2023",
    role: "Personal Assistance",
    amount: "$400"
  },
  {
    userName: "Sarah",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Sarah745@gmail.com",
    date: "28 Nov, 2023",
    role: "Personal Assistance",
    amount: "$380"
  },
  {
    userName: "David",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "David745@gmail.com",
    date: "29 Nov, 2023",
    role: "Personal Assistance",
    amount: "$410"
  },
  {
    userName: "Olivia",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Olivia745@gmail.com",
    date: "30 Nov, 2023",
    role: "Personal Assistance",
    amount: "$320"
  },
  {
    userName: "Liam",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Liam745@gmail.com",
    date: "1 Dec, 2023",
    role: "Personal Assistance",
    amount: "$515"
  },
  {
    userName: "Sophia",
    userImage: "/images/Ellipse 15.png",
    emailaddress: "Sophia745@gmail.com",
    date: "2 Dec, 2023",
    role: "Personal Assistance",
    amount: "$280"
  }
];

const OrdersTable = () => {
  const [addUserDialog, setAddUserDialog] = useState(false); // State to manage the Add User dialog
  const [email, setEmail] = useState(""); // State to manage the email input

  return (
    <div className="mt-8 rounded-xl bg-white px-4 sm:mx-10 sm:px-6">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold">Account Sharing</h1>
          <p className="text-sm text-[#6E6E70]">Users that have access to your account</p>
        </div>
        <button
          className="text-md flex w-full items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-2.5 font-medium text-white transition-all hover:shadow-md sm:w-auto"
          onClick={() => setAddUserDialog(true)} // Open Add User dialog
        >
          <Image className="font-bold" src="/account-sharing/Add-icon.svg" width={23} height={23} alt="Add Icon" />
          Add New User
        </button>
      </div>

      {/* Card for New User */}
      <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        {/* Add User Dialog */}
        {addUserDialog && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="relative mx-auto w-full max-w-[95%] rounded-lg bg-white px-6 py-8 shadow-lg sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%]">
              <button
                onClick={() => setAddUserDialog(false)} // Close Add User dialog
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <RxCross1 className="h-5 w-5 font-bold" />
              </button>
              <div className="top flex flex-col">
                <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEEDF4] p-3">
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
                  <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    placeholder="Enter email address..."
                    className="w-full rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] py-4 pr-3 pl-10 text-sm font-medium outline-none focus:border-pink-400 sm:text-base"
                  />
                </div>
                <button className="w-full rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-6 py-4 font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:w-auto">
                  Invite
                </button>
              </div>
              <div className="">
                <div className="flex items-center gap-2 pt-3">
                  <div className="rounded-full border-2 border-dashed border-gray-300 p-1">
                    <Image
                      className="rounded-full bg-[#F7F3FD]"
                      src="/account-information/Frame (4).svg"
                      width={30}
                      height={30}
                      alt="cross"
                    />
                  </div>
                  <div className="">
                    <h2>Domenica</h2>
                    <p className="text-[#6E6E70]">domenica65@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto rounded-b-xl">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-[#F5F5F5] text-[#6E6E70]">
              <tr className="border-b border-gray-300">
                <th className="p-4 text-left">User Name</th>
                <th className="p-4 text-left">Email Address</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Add On</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummydata.map((data, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/analytics-page/EllipseAnalytics.svg"
                        width={30}
                        height={30}
                        className="rounded-full bg-[#fff]"
                        alt="User"
                      />
                      {data.userName}
                    </div>
                  </td>
                  <td className="p-4">{data.emailaddress}</td>
                  <td className="p-4">
                    <div className="inline-block rounded-full bg-[#E8ECFF] px-4 py-2 text-center">{data.role}</div>
                  </td>
                  <td className="p-4">{data.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button className="rounded-lg bg-[#F0E7FF] p-1 transition hover:scale-110">
                        <Image src="/account-sharing/eye.svg" alt="view" width={25} height={25} />
                      </button>
                      <button className="rounded-lg bg-[#fae2e2] p-1.5 transition hover:scale-110">
                        <Image src="/account-sharing/delete.svg" alt="delete" width={20} height={20} />
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
  );
};

export default OrdersTable;
