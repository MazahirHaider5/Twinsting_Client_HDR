"use client";
import {
  FaStar,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaFlag,
  FaLink,
  FaShareAlt,
  FaRegThumbsUp,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";

const images = [
  "/images/servicebg4.jpg",
  "/images/servicebg5.jpg",
  "/images/servicebg6.jpg",
  "/images/servicebg7.jpg",
  "/images/servicebg4.jpg",
  "/images/servicebg6.jpg",
  "/images/servicebg7.jpg",
  "/images/servicebg5.jpg",
  "/images/servicebg4.jpg"
];

const reviews = [
  { stars: 5, count: 1405 },
  { stars: 4, count: 385 },
  { stars: 3, count: 98 },
  { stars: 2, count: 120 },
  { stars: 1, count: 400 }
];
// Define the Review Type
type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  avatar: string;
};

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 2,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 3,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 2,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 4,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 5,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 6,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 7,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 8,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 2,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 9,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  }
];
const filterOptions: (number | "All")[] = ["All", 5, 4, 3, 2, 1];
const ServicePage = () => {
  const [selectedPackage, setSelectedPackage] = useState("Standard");
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedFilter, setSelectedFilter] = useState<number | "All">("All");

  const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0);

  // Filter reviews based on selection
  const filteredReviews =
    selectedFilter === "All" ? reviewsData : reviewsData.filter((review) => review.rating === selectedFilter);

  return (
    <>
      <main className="grid grid-cols-1 gap-6 bg-white px-10 pt-10 md:grid-cols-3">
        {/* *****************Left Section**************************** */}
        <section className="md:col-span-2">
          <div>
            <h1 className="text-2xl font-bold">
              Providing Multiple Services for <br /> Companies - Easy
            </h1>
            <div className="mt-2 flex items-center text-gray-600">
              <Image
                src="/images/serviceUserProfile.png"
                alt="Domenica"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="ps-2 font-semibold">Domenica</span>
              <FaStar className="ms-6 pe-2 text-yellow-500" />
              <span>4.9 (3,058 reviews)</span>
            </div>
            {/* Main Image Display */}
            <div className="relative mt-4 h-[40rem] w-full">
              <Image
                src={selectedImage}
                alt="Selected Service Preview"
                fill
                className="rounded-lg object-cover object-center"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-4 flex w-full gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 ${
                    selectedImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image src={img} alt="Thumbnail" width={80} height={80} className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          {/* -------------about section-----------  */}
          <div className="py-10">
            <h1 className="text-2xl font-semibold">About Service</h1>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p className="text-justify">
              Dignissim enim sit amet venenatis urna cursus eget nunc. Mauris ultrices eros in cursus turpis massa
              tincidunt dui ut. Nibh praesent tristique magna sit amet. Dolor sit amet consectetur adipiscing. Duis at
              consectetur lorem donec massa sapien. Aliquam etiam erat velit scelerisque. Diam ut venenatis tellus in
              metus vulputate eu scelerisque felis. Proin sed libero enim sed faucibus. Ultrices gravida dictum fusce ut
              placerat orci nulla. Volutpat blandit aliquam etiam erat velit scelerisque in dictum.
            </p>
            <p className="text-justify">
              Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Egestas integer eget aliquet nibh praesent
              tristique magna sit amet. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.
              Facilisi etiam dignissim diam quis enim lobortis scelerisque. Sit amet luctus venenatis lectus magna
              fringilla. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Semper quis lectus
              nulla at volutpat diam ut venenatis tellus. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum
              consequat. Mi ipsum faucibus vitae aliquet nec ullamcorper.
            </p>
          </div>
          {/* -------------review section ------------ */}
          <h2 className="mb-2 text-2xl font-semibold">Reviews</h2>
          <div className="flex items-center space-x-2 text-lg font-bold">
            <FaStar className="text-xl text-yellow-500" />
            <span>4.9</span>
            <span className="text-sm">/5 Very Satisfied</span>
          </div>
          <div className="mt-2">
            {reviews.map(({ stars, count }) => {
              const percentage = (count / totalReviews) * 100;
              return (
                <div key={stars} className="flex items-center justify-start gap-2 text-sm">
                  <span className="w-2 pb-1">{stars}</span>
                  <FaStar className="pb-1 text-base text-yellow-500" />
                  <div className="h-3 w-64 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
          <div className="my-6 flex space-x-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFilter(option)}
                className={`cursor-pointer rounded-lg border px-10 py-2 ${
                  selectedFilter === option ? "bg-orange-400 text-white" : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {option === "All" ? "All" : `${option} Star `}
              </button>
            ))}
          </div>
          {filteredReviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-1">
              <div className="flex items-center space-x-3">
                <Image src={review.avatar} alt="User Avatar" width={50} height={50} className="rounded-full" />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="mt-1 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-yellow-500 ${i >= review.rating ? "opacity-30" : ""}`} />
                ))}
                <span className="ml-2 font-semibold">{review.rating}.0</span>
              </div>
              <p className="mt-2 text-justify text-sm">{review.review}</p>
              <div className="mt-5 flex items-center justify-end space-x-4 text-sm text-gray-500">
                <div className="flex cursor-pointer items-center hover:text-gray-700">
                  <FaRegThumbsUp className="mr-1" />
                  <span>Was this review helpful?</span>
                </div>
                <div className="flex cursor-pointer items-center text-red-500 hover:text-red-700">
                  <FaFlag className="mr-1" />
                  <span>Report</span>
                </div>
                <div className="flex cursor-pointer items-center hover:text-gray-700">
                  <FaShareAlt className="mr-1" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-5 mb-10 flex items-center justify-end space-x-2">
            <button className="rounded-full bg-gray-100 p-2 disabled:opacity-50">
              <FaChevronLeft size={16} />
            </button>

            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-red-400 text-sm text-white`}
              >
                {page}
              </button>
            ))}
            <span className="px-2">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm">10</button>

            <button className="rounded-full bg-gray-100 p-2 disabled:opacity-50">
              <FaChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* *******************Right Section************************* */}
        <section className="">
          <div className="h-[40rem] rounded-lg bg-[#FAFAFA] p-6 shadow-md">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Select Service Package</h2>
              <p className="bg-gradient-to-r from-[#F5AF48] via-[#F5AF48] to-[#E32379] bg-clip-text font-bold text-transparent">
                Compare Package
              </p>
            </div>
            {/* Package Selection */}
            <div className="my-4 flex justify-between">
              {["Starter", "Standard", "Advanced"].map((pkg, index) => (
                <div
                  key={index}
                  className={`flex w-1/3 cursor-pointer flex-col items-center rounded-lg p-4`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#E0E0E0]">
                    {selectedPackage === pkg && <div className="h-4 w-4 rounded-full bg-[#E0E0E0]"></div>}
                  </div>
                  <span className="pt-3 text-xl text-gray-500">{pkg}</span>
                  <span className="font-bold text-black">${index === 0 ? "100" : index === 1 ? "200" : "300"}</span>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold text-gray-900">Providing Multiple Services</p>
            <p className="text-base text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="semi-bold mt-4 flex justify-between text-gray-500">
              <span className="flex items-center gap-1 text-base">
                <MdOutlineWatchLater className="text-2xl" /> Deliver Time:
              </span>
              <span className="">10 Days</span>
            </div>
            <div className="mt-5 flex flex-col items-center justify-between rounded-xl bg-white p-4 shadow-md">
              <div className="flex flex-col items-center gap-3 space-x-3">
                <div className="relative">
                  <Image
                    src="/images/serviceUserProfile.png"
                    alt="Domenica"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-dashed border-red-400"
                  />
                  <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border border-white bg-green-500"></span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">Domenica</p>
                  <p className="text-gray-500">Last seen 1hr ago • 09:38 PM</p>
                </div>
              </div>
              <div className="flex space-x-2 pt-7 text-xl">
                <button className="flex items-center gap-2 rounded-full bg-pink-200 px-3 shadow-md">
                  <Image src="/images/telegram.png" alt="Telegram Logo" width={20} height={20} />
                  <span className="bg-gradient-to-r from-[#F5AF48] via-[#F5AF48] to-[#E32379] bg-clip-text text-transparent">
                    Message
                  </span>
                </button>
                <button className="rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-3 py-2 text-white shadow-md">
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center pt-8 text-gray-600">
            <div className="flex items-center space-x-2 text-2xl">
              <span>Share:</span>
              <FaLink />
              <FaFacebook className="text-blue-600" />
              <FaInstagram className="text-pink-500" />
              <FaTwitter className="text-blue-400" />
            </div>
            <div className="mt-2 flex cursor-pointer items-center space-x-2 text-base">
              <FaFlag />
              <span>Report the account</span>
            </div>
          </div>
        </section>
      </main>
      {/* <TopRatedArtists /> */}
      {/* <ServiziDiTendenzaHome /> */}
    </>
  );
};

export default ServicePage;
