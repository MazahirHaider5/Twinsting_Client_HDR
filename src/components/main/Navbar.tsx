"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import CategoriesDropdown from "../home/CategoriesDropdown";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { FaUser, FaWallet, FaShareAlt, FaQuestionCircle } from "react-icons/fa";
const Navbar = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);
  useEffect(() => {
    if (user?._id && user?.email) {
      setIsAuthUser(true);
    } else {
      setIsAuthUser(false);
    }
  }, [user, router]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // ✅ fix here

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 sm:px-6 lg:px-10">
      {/* Logo */}
      <Image
        alt="Twinsting Logo"
        src="/images/TwinstingLogo.png"
        width={150}
        height={150}
        className="w-28 sm:w-36 lg:w-44"
      />

      {/* Search Bar (Hidden on mobile, shown on larger screens) */}
      {user?.role !== "artist" && (
        <div className="hidden w-[40%] items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 lg:flex">
          <input
            placeholder="Search for anything"
            className="w-full rounded-lg bg-gray-200 p-2 text-sm focus:outline-none sm:p-3 sm:text-base"
          />
          <div className="flex w-full items-center rounded-lg bg-gray-200 px-2 sm:px-3">
            <FaLocationDot className="size-5 text-gray-500 sm:size-6" />
            <input
              defaultValue=""
              placeholder="Location.."
              className="w-full rounded-lg p-2 text-sm focus:outline-none sm:p-3 sm:text-base"
            />
          </div>
          <div className="gradient ml-auto flex size-10 items-center justify-center self-end rounded-lg p-2 sm:size-12 sm:p-3 lg:size-auto">
            <IoSearch className="text-lg text-white sm:text-2xl" />
          </div>
        </div>
      )}
      {/* Desktop Navigation - Only for Large Screens (>=1024px) */}
      <div className="hidden items-center gap-4 text-sm lg:flex lg:text-base">
        {user?.role !== "artist" ? (
          <>
            <CategoriesDropdown />
            <p className="cursor-pointer hover:underline">Live Artist</p>
            <Link href="/artist-side">
              <p className="cursor-pointer hover:underline">Become a Seller</p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">
              <p className="cursor-pointer hover:underline">Dashboard</p>
            </Link>
            <Link href="/services">
              <p className="cursor-pointer hover:underline">Services</p>
            </Link>
            <Link href="/twist">
              <p className="cursor-pointer hover:underline">Twist</p>
            </Link>
            <Link href="/orders">
              <p className="cursor-pointer hover:underline">Orders</p>
            </Link>
            <Link href="chat">
              <p className="cursor-pointer hover:underline">Messages</p>
            </Link>
            <Link href="/analytics">
              <p className="cursor-pointer hover:underline">Analytics</p>
            </Link>
          </>
        )}
        <hr className="hidden h-6 border border-gray-300 lg:block" />
        {isAuthUser ? (
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex cursor-pointer items-center gap-1" onClick={() => setIsOpen(!isOpen)}>
              <Image
                width={20}
                height={20}
                src={user?.profilePicture || ""}
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="hidden text-left sm:block">
                <h4 className="text-sm font-semibold text-black">{user?.name}</h4>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <FaChevronDown className="text-gray-500" />
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 w-60 rounded-md border border-gray-200 bg-white shadow-lg">
                <button
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/account-information")}
                >
                  <FaUser size={16} /> Account Information
                </button>
                <button
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/wallet")}
                >
                  <FaWallet size={16} /> Payment/Wallet
                </button>
                <button
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/account-sharing")}
                >
                  <FaShareAlt size={16} /> Account Sharing
                </button>
                <button
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/get-help")}
                >
                  <FaQuestionCircle size={16} /> Get Help
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" className="font-semibold hover:underline">
              Login
            </Link>
            <Link
              href="/signup"
              className="gradient-text rounded-lg border border-gray-500 px-3 py-1 font-semibold hover:text-black hover:shadow-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile & Tablet Menu Toggle Button (Visible <1024px) */}
      <button
        className="z-50 block lg:hidden"
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking the button
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile & Tablet Menu - Only Visible When Toggled */}
      {isMenuOpen && (
        <div
          className="absolute top-14 left-0 z-50 flex w-full flex-col items-center border-t border-gray-200 bg-white p-4 shadow-md lg:hidden"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {user?.role !== "artist" ? (
            <>
              <CategoriesDropdown />
              <p className="cursor-pointer hover:underline">Live Artist</p>
              <Link href="/artist-side">
                <p className="cursor-pointer hover:underline">Become a Seller</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <p className="cursor-pointer hover:underline">Dashboard</p>
              </Link>
              <Link href="/services">
                <p className="cursor-pointer hover:underline">Services</p>
              </Link>
              <Link href="/twist">
                <p className="cursor-pointer hover:underline">Twist</p>
              </Link>
              <Link href="/orders">
                <p className="cursor-pointer hover:underline">Orders</p>
              </Link>
              <Link href="chat">
                <p className="cursor-pointer hover:underline">Messages</p>
              </Link>
              <Link href="/analytics">
                <p className="cursor-pointer hover:underline">Analytics</p>
              </Link>
            </>
          )}
          <hr className="my-2 w-full border border-gray-300" />
          {isAuthUser ? (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div className="flex cursor-pointer items-center gap-1" onClick={() => setIsOpen(!isOpen)}>
                <Image
                  width={20}
                  height={20}
                  src={user?.profilePicture || ""}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="hidden text-left sm:block">
                  <h4 className="text-sm font-semibold text-black">{user?.name}</h4>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <FaChevronDown className="text-gray-500" />
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-60 rounded-md border border-gray-200 bg-white shadow-lg">
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/account-information")}
                  >
                    <FaUser size={16} /> Account Information
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/wallet")}
                  >
                    <FaWallet size={16} /> Payment/Wallet
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/account-sharing")}
                  >
                    <FaShareAlt size={16} /> Account Sharing
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                    // onClick={() => router.push("/get-help")}
                  >
                    <FaQuestionCircle size={16} /> Get Help
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="font-semibold hover:underline">
                Login
              </Link>
              <Link
                href="/signup"
                className="gradient-text rounded-lg border border-gray-500 px-3 py-1 font-semibold hover:text-black hover:shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
