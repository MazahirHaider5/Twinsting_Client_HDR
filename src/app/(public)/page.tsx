"use client";
import { useEffect, useState } from "react";
import Home from "@/components/main/Home";
import Image from "next/image";
import apiClient from "@/lib/interceptor";
import { FaArrowRight, FaArrowLeft, FaArrowRightLong } from "react-icons/fa6";
import { artists, services, artists2 } from "../../components/main/data";
import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";
import ArtistCard from "@/components/ui/ArtistCard";
import { ServiceData } from "../../types/services";

const HomePage = () => {
  const [allServices, setAllServices] = useState<ServiceData[]>([]);
  const t = useTranslations("HomePage");
  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      // setLoading(true);
      const response = await apiClient.get("/service/getAllServices");
      if (response?.status === 200) {
        // setLoading(false);
        setAllServices(response?.data?.data);
      }
    } catch (error) {
      // setLoading(false);
      console.error("Submit error:", error);
    }
  };
  return (
    <>
      <Home />
      
      <section className="mt-10 space-y-10">
        {/* Artists by Category */}
        <div className="flex flex-col space-y-4">
          <p className="flex justify-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
            {t("artistsByCategory")}
          </p>
          <section className="scrollbar-hide flex gap-6 overflow-x-auto px-2 sm:px-4 md:px-8">
            {artists2.map((artist) => (
              <div key={artist.name} className="flex flex-col items-center justify-center">
                <div className="relative size-24 overflow-hidden rounded-xl sm:size-28 md:size-36 lg:size-40 xl:size-48 2xl:size-52">
                  <Image alt="artist" src={artist.src} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>

                <p className="mt-1 text-xs font-bold whitespace-nowrap sm:text-xs md:text-base lg:text-lg">
                  {artist.name}
                </p>
                <p className="text-xs text-gray-600 sm:text-xs md:text-base">{artist.count}</p>
              </div>
            ))}
          </section>
          <section className="mx-auto flex justify-center">
            <div className="gradient-bg rounded-lg p-[2px]">
              <div className="cursor-pointer rounded-lg bg-white px-4 py-2 text-center text-sm font-bold sm:px-6 sm:py-3 sm:text-base">
                {t("viewAllCategories")}
              </div>
            </div>
          </section>
        </div>
        {/* Top Today Services */}
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">{t("topTodayServices")}</p>
            {/* Arrow Buttons */}
            <span className="flex items-center gap-4 sm:gap-6">
              <FaArrowLeft className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
              <FaArrowRight className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
            </span>
          </div>
          <section className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
            {allServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </section>
        </div>
        {/* Most Popular Services */}
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">{t("mostPopularServices")}</p>
            {/* Arrow Buttons */}
            <span className="flex items-center gap-4 sm:gap-6">
              <FaArrowLeft className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
              <FaArrowRight className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
            </span>
          </div>
          <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {allServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </section>
        </div>
        {/* Browse By Services */}
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-10">
          <span>
            <p className="text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
              {t("browseByServiceCategories")}
            </p>
            <p className="pt-2 text-center text-sm sm:text-lg md:text-xl lg:text-2xl">
              {t("browseByServiceSubheading")}
            </p>
          </span>
          <section className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {/* Mapping Services Data */}
            {services.map((service) => (
              <div
                key={service.heading}
                className="flex items-center gap-4 rounded-xl border border-gray-300 p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-md"
              >
                {/* Icon */}
                <div className="rounded-lg bg-pink-100 p-2">
                  <Image alt={service.heading} src={service.icon} width={40} height={40} />
                </div>
                {/* Text Section */}
                <div className="space-y-3">
                  <p className="text-xl font-semibold">{service.heading}</p>
                  <p className="flex items-center gap-4">
                    {service.subheading}
                    <FaArrowRightLong className="text-xl text-gray-600" />
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
        {/* Trendy Services */}
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">{t("trendingServices")}</p>
            {/* Arrow Buttons */}
            <span className="flex items-center gap-4 sm:gap-6">
              <FaArrowLeft className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
              <FaArrowRight className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
            </span>
          </div>
          <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {allServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </section>
        </div>
        {/* Top Rated Artists */}
        <div className="m-6 space-y-6 rounded-xl border border-gray-300 bg-gray-100 p-6 sm:p-10 md:m-10">
          <span className="flex items-start justify-between">
            <p className="text-2xl font-bold sm:text-4xl">{t("topRatedArtists")}</p>
            <p className="cursor-pointer text-sm text-gray-600 underline-offset-2 hover:text-gray-900 hover:underline sm:text-base">
              {t("showAll")}
            </p>
          </span>
          {/* Responsive Grid Fix */}
          <section className="my-6 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artists.map((artist) => (
              <div key={artist.id} className="flex justify-center">
                <ArtistCard {...artist} />
              </div>
            ))}
          </section>
        </div>

        {/* Newsletter */}
        <div className="mt-6 w-full bg-gray-200 p-6 text-center sm:p-10">
          <p className="text-2xl font-bold sm:text-4xl">Join Our Newsletter</p>
          <p className="mt-2 text-base sm:text-xl">Receive pricing updates, shopping tips & more!</p>

          {/* Input & Button Wrapper */}
          <div className="flex w-full flex-col items-center justify-center py-4 sm:flex-row">
            <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-2 rounded-full border border-gray-300 bg-white p-2 sm:gap-4">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full flex-1 bg-transparent px-4 py-2 text-gray-700 placeholder-gray-400 outline-none sm:w-[70%] lg:w-[60%]"
              />

              {/* Subscribe Button */}
              <button className="w-full rounded-full bg-gradient-to-br from-[#F5AF48] via-[#F47C6A] to-[#E32379] px-6 py-3 font-semibold text-white shadow-md sm:w-auto">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
};

export default HomePage;
