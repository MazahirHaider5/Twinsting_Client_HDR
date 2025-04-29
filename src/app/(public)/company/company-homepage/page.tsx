import Image from "next/image";
import React from "react";
import { artists, services, servicesData } from "@/components/main/data";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ArtistCard from "@/components/ui/ArtistCard";
import ServiceCard from "@/components/ui/ServiceCard";

const CompanyHomepage = () => {
  const t = useTranslations("HomePage");

  const cardsData = [
    {
      title: "RECOMMENDED FOR YOU",
      image: "/images/magicpen.png",
      mainText: "Get Twist",
      subText: "Lorem ipsum dolor sit amet"
    },
    {
      title: "COMPLETE ACCOUNT VERIFICATION",
      image: "/images/verification.png",
      mainText: "Start Verification",
      subText: "Lorem ipsum dolor sit amet"
    },
    {
      title: "BUSINESS COMPANY RECOMMENDED",
      image: "/images/magicpen.png",
      mainText: "Complete Personal Info",
      subText: "Lorem ipsum dolor sit amet"
    }
  ];

  return (
    <div className="mx-4 my-4 flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-[#270A4C] p-4">
        <p className="mb-4 text-base font-bold text-white sm:text-base md:text-base lg:text-lg 2xl:text-xl">
          Welcome Back, Domenica.
        </p>
        <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-4">
          {cardsData.map((card, index) => (
            <div key={index} className="min-w-[280px] flex-shrink-0 rounded-xl bg-[#523b70] px-6 py-6 md:min-w-[320px]">
              <p className="text-base text-gray-300 sm:text-base md:text-base lg:text-lg 2xl:text-lg">{card.title}</p>
              <div className="flex items-center gap-2 pt-2">
                <Image
                  alt="img"
                  src={card.image}
                  width={0}
                  height={0}
                  className="h-8 w-8 rounded-full bg-[#270A4C] p-2 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-10 lg:w-10 2xl:h-10 2xl:w-10"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-white sm:text-sm md:text-sm lg:text-base 2xl:text-base">{card.mainText}</p>
                  <p className="mr- text-xs text-gray-300 sm:text-xs md:text-xs lg:text-sm 2xl:text-sm">
                    {card.subText}
                  </p>
                </div>
                <button className="gradient-bg rounded-full px-3 py-2 text-xs sm:px-3 sm:py-2 sm:text-xs md:px-3 md:py-2 md:text-xs lg:px-3 lg:py-2 lg:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Service Categories */}

      <div className="mx-auto my-6 space-y-6 px-4 sm:px-6 lg:px-6">
        <span>
          <p className="text-center text-lg font-bold sm:text-lg md:text-lg lg:text-2xl 2xl:text-2xl">
            {t("browseByServiceCategories")}
          </p>
          <p className="pt-2 text-center text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl">
            {t("browseByServiceSubheading")}
          </p>
        </span>
        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {/* Mapping Services Data */}
          {services.map((service) => (
            <div
              key={service.heading}
              className="flex items-center gap-2 rounded-xl border border-gray-300 p-2 transition-all duration-300 hover:border-gray-400 hover:shadow-md"
            >
              {/* Icon */}
              <div className="rounded-lg bg-pink-100 p-2">
                <Image
                  alt={service.heading}
                  src={service.icon}
                  width={0}
                  height={0}
                  className="h-6 w-6 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10"
                />
              </div>
              {/* Text Section */}
              <div className="flex w-full flex-col">
                <p className="text-sm font-semibold sm:text-sm md:text-base lg:text-lg 2xl:text-lg">
                  {service.heading}
                </p>
                <p className="flex items-center gap-4">{service.subheading}</p>
              </div>
              <FaArrowRightLong className="text-xs text-gray-600 sm:text-xs md:text-xs lg:text-base 2xl:text-lg" />
            </div>
          ))}
        </section>
      </div>

      {/* TOP TODAY SEARCH  */}

      <div className="mx-auto my-6 w-full space-y-6 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg font-bold sm:text-lg md:text-lg lg:text-2xl 2xl:text-2xl">{t("topTodayServices")}</p>
          {/* Arrow Buttons */}
          <span className="flex items-center gap-4 sm:gap-6">
            <FaArrowLeft className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
            <FaArrowRight className="size-8 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-900" />
          </span>
        </div>
        <section className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id} // Add the key prop here
              service={{
                _id: String(service.id),
                artist_id: "default-artist-id", // fallback if not present
                title: service.name,
                category: "default-category",
                subcategory: "default-subcategory",
                searchTags: [],
                description: "",
                media: {
                  photos: [],
                  videos: [],
                  _id: ""
                },
                status: "active",
                orders: [],
                reviews: [],
                pricing: {
                  starter: {
                    name: "Starter Plan",
                    description: "Basic service package",
                    price: Number(service.price),
                    _id: "starter-plan-id"
                  },
                  standard: {
                    name: "Standard Plan",
                    description: "Standard service package",
                    price: Number(service.price) + 50,
                    _id: "standard-plan-id"
                  },
                  advance: {
                    name: "Advance Plan",
                    description: "Premium service package",
                    price: Number(service.price) + 100,
                    _id: "advance-plan-id"
                  }
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __v: 0
              }}
            />
          ))}
        </section>
      </div>

      {/* TOP RATED ARTISTS  */}

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
      <div className="bg-gray-200 p-10 text-center">
        <p className="text-4xl font-bold">Join Our Newsletter</p>
        <p className="text-xl">Receive pricing updates, shopping tips & more!</p>
        <div className="flex items-center justify-center py-4">
          <div className="flex h-16 w-96 items-center rounded-full border border-gray-200 bg-white px-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none"
            />
            {/* Subscribe Button */}
            <button className="rounded-full bg-gradient-to-br from-[#F5AF48] via-[#F47C6A] to-[#E32379] px-8 py-3 font-semibold text-white shadow-md">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHomepage;
