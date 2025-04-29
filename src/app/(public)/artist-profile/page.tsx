"use client";
import { useState } from "react";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import TabMenu from "@/components/main/artists/TabMenu";
import AboutMe from "@/components/main/artists/AboutMe";
import WorkPhotos from "@/components/main/artists/WorkPhotos";
import Reviews from "@/components/main/artists/Reviews";
import SkillsExperience from "@/components/main/artists/SkillsExperience";
import { useSearchParams } from "next/navigation";
import { artists } from "@/components/main/data";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ArtistProfileDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [activeTab, setActiveTab] = useState("Skills & Experience");

  console.log("Artist ID from URL:", id);
  console.log("Artists Array:", artists);

  const artist = artists.find((a) => a.id === Number(id));

  if (!artist)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
      <section className="p-4 flex flex-row">
        <div className="mx-auto max-w-6xl w-[70%]">
          <p className="mt-4 px-4 text-sm text-gray-500 sm:px-8">
            Home / Artist Detail / <span className="text-sm text-black">{artist.name}</span>
          </p>
          <div className="relative mx-4 mt-2 sm:mx-8">
            {/* Cover Image */}
            <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-40 md:h-48 lg:h-56 xl:h-64">
              <Image
                src="/images/ArtistCoverPhoto.png"
                alt="Cover Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute bottom-[-15%] left-4 aspect-square size-16 overflow-hidden rounded-full border-4 border-white sm:size-20 md:size-24 lg:size-28 xl:size-32">
              <Image
                src={artist.image}
                alt="Profile Picture"
                width={200}
                height={200}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          {/* Artist Info */}
          <div className="mt-10 flex flex-col px-4 sm:px-8">
            <div className="flex items-center">
              <p className="text-lg font-semibold sm:text-xl">{artist.name}</p>
              <Image alt="verified" src="/images/verifiedbadge.png" width={20} height={20} className="ml-2" />
            </div>
            <p className="mt-1 flex items-center text-gray-600">
              <GoLocation className="mr-1" />
              {artist.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 px-4 py-2 sm:px-8">
            <div className="rounded-full bg-[#FFF0CB] px-4 py-2 text-sm text-[#BD8C11]">Top Rated</div>
            <div className="rounded-full bg-[#D0FFD4] px-4 py-2 text-sm text-[#01AD10]">Top Rated</div>
          </div>

          {/* Pass the correct function reference */}
          <TabMenu onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className="mt-4 px-2 md:px-4 lg:px-10 text-sm">
            <div className="mx-auto w-full text-left text-xs sm:text-center sm:text-base md:w-4/5 md:text-left md:text-lg lg:w-3/4 lg:text-xl 2xl:text-2xl">
              {activeTab === "Skills & Experience" && <SkillsExperience artist={artist} />}
              {activeTab === "About me" && <AboutMe />}
              {activeTab === "Work Photos" && <WorkPhotos />}
              {activeTab === "Reviews" && <Reviews />}
            </div>
          </div>
        </div>
        <div className="w-[30%] my-12 flex flex-col items-center">
        <div className="flex w-full max-w-sm items-center justify-between rounded-lg border p-4 shadow-sm">
          {/* Left Section - Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-pink-500">
              <Image
                src="/images/profile.png"
                alt="User"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <p className="font-semibold">Domenica</p>
                <IoMdCheckmarkCircle className="text-green-500 text-lg" />
              </div>
              <p className="text-xs text-gray-500">Last seen 1hr ago · 09:38 PM</p>
            </div>
          </div>

          {/* Right Section - Heart Icon */}
          <button className="text-xl text-gray-500 hover:text-gray-700">❤️</button>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex w-full max-w-sm justify-between">
          <button className="flex justify-center items-center rounded-full bg-gray-100 px-6 py-2 font-medium text-gray-700 gap-2">
            <Image src="/images/message.png" alt="" width={20} height={20}/>
            <p>Message</p>
          </button>
          <button className="ml-3 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-2 font-medium text-white">
            Confirm
          </button>
        </div>

        {/* Social Media Share */}
        <div className="mt-4 flex items-center justify-center space-x-3">
          <p className="text-sm text-gray-500">Share:</p>
          <FaFacebookF className="text-blue-500 cursor-pointer" />
          <FaInstagram className="text-pink-500 cursor-pointer" />
          <FaTwitter className="text-blue-400 cursor-pointer" />
        </div>

        {/* Report Button */}
        <div className="flex justify-center">
          <button className="mt-3 flex items-center space-x-1 text-sm text-center text-gray-900 hover:text-red-500 font-bold">
            🚩 Report the account
          </button>
        </div>
        </div>
      </section>
  );
};

export default ArtistProfileDetails;
