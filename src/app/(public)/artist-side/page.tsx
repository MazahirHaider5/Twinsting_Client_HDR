"use client";
import React, { useState, useEffect } from "react";
import { IoMdArrowForward } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiClient from "../../../lib/interceptor";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/authSlice";
const Artistside: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const handleBecomeArtist = async () => {
    setLoading(true);

    try {
      const response = await apiClient.post("/artist/becomeArtist");
      if (response?.status == 200) {
        dispatch(
          updateUser({
            role: "artist"
          })
        );
        toast.success(response?.data?.message);
        router.push("/artist-side/welcome-screen");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 md:px-12">
      {/* Image */}
      <Image src="/images/Business-Deal.png" alt="Business Deal" width={500} height={500} />

      {/* Heading */}
      <h2 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">Want to Sell as an Artist</h2>

      {/* Description */}
      <p className="mb-10 max-w-md text-center text-sm text-gray-600 sm:text-base md:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.
      </p>

      {/* Button */}
      <button
        disabled={loading}
        type="button"
        className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#F5AF48] via-[#E32379] to-[#E32379] px-6 py-3 text-sm text-white transition hover:opacity-90 sm:text-base md:text-lg"
        onClick={() => handleBecomeArtist()}
      >
        {loading ? "Joining..." : "Become a Artist"}
        <IoMdArrowForward size={20} />
      </button>
    </div>
  );
};

export default Artistside;
