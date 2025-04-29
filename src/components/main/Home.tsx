import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Ratings from "@/components/home/Ratings";

const Home = () => {
  return (
    <section className="grid w-full grid-cols-1 bg-[#3D113E] px-4 text-white sm:px-6 md:grid-cols-2 lg:flex-nowrap xl:px-16">
      {/* Left Section */}
      <div className="m-auto w-full space-y-4 p-4 pt-8 md:space-y-8">
        {/* Ratings */}
        <Ratings />
        <p className="text-xl font-bold sm:text-2xl md:text-4xl">Start Browsing to Discover New Talents!</p>
        {/* Search Bar */}
        <div className="flex w-full items-center gap-3 rounded-lg bg-white/70 p-1.5 text-gray-800 md:p-3 lg:flex-nowrap">
          <input
            placeholder="Search for anything"
            className="w-full rounded-lg bg-gray-200 p-2 text-sm focus:outline-none sm:p-3 sm:text-base"
          />
          <section className="flex w-full items-center rounded-lg bg-gray-200 px-2 sm:px-3">
            <FaLocationDot className="size-5 text-gray-500 sm:size-6" />
            <input
              defaultValue=""
              placeholder="Location.."
              className="w-full rounded-lg p-2 text-sm focus:outline-none sm:p-3 sm:text-base"
            />
          </section>
          <div className="gradient ml-auto flex size-10 items-center justify-center self-end rounded-lg p-2 sm:size-12 sm:p-3 lg:size-auto">
            <IoSearch className="text-lg text-white sm:text-2xl" />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-white sm:text-lg md:text-xl">Popular Categories:</p>
          <section className="flex flex-wrap gap-2 text-xs text-white sm:text-sm md:text-base">
            <span className="rounded-full border border-gray-500 px-3 py-1 sm:px-4 sm:py-2">Performers</span>
            <span className="rounded-full border border-gray-500 px-3 py-1 sm:px-4 sm:py-2">Service Providers</span>
            <span className="rounded-full border border-gray-500 px-3 py-1 sm:px-4 sm:py-2">
              Creative & Technical Staff
            </span>
          </section>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex w-full justify-center md:pt-8">
        <Image alt="home" src="/images/HomeMainImg.png" width={550} height={400} />
      </div>
    </section>
  );
};
export default Home;
