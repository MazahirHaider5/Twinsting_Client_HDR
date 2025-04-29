"use client";
import {
  FaStar,
  
  FaFlag,
  
  FaShareAlt,
  FaRegThumbsUp,
  FaChevronLeft,
  FaChevronRight,
  FaPlay
} from "react-icons/fa";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/interceptor";


const reviews = [
  { stars: 5, count: 1405 },
  { stars: 4, count: 385 },
  { stars: 3, count: 98 },
  { stars: 2, count: 120 },
  { stars: 1, count: 400 }
];

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  avatar: string;
};

const reviewsData: Review[] = [
  // Same as your dummy reviews
  {
    id: 1,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "/images/serviceUserProfile.png"
  }
  // ... rest of your reviews
];

const filterOptions: (number | "All")[] = ["All", 5, 4, 3, 2, 1];

export interface Package {
  name: string;
  description: string;
  price: number;
  _id: string;
}

export interface Pricing {
  starter: Package;
  standard: Package;
  advanced: Package;
}

export interface Media {
  photos: string[];
  videos: string[];
  _id: string;
}

export interface Order {
  id: string;
  item: string;
  quantity: number;
}

export interface Service {
  _id: string;
  artist_id: string;
  title: string;
  category: string;
  subcategory: string;
  searchTags: string[];
  description: string;
  media: Media;
  pricing: Pricing;
  status: string;
  orders: Order[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ServicePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState<Service>();
  const [selectedPackage, setSelectedPackage] = useState("Standard");
  const [selectedMedia, setSelectedMedia] = useState<string>("");
  const [isVideo, setIsVideo] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<number | "All">("All");

  // Pagination for reviews
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0);

  // Use useCallback to memoize getServiceDetail
  const getServiceDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/service/getServiceById/${id}`);
      if (response?.status === 200) {
        setServiceData(response?.data?.data);
        if (response?.data?.data?.media?.photos?.length > 0) {
          setSelectedMedia(response?.data?.data?.media?.photos[0]);
          setIsVideo(false);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Add id as a dependency

  useEffect(() => {
    getServiceDetail();
  }, [getServiceDetail]); // Include getServiceDetail in the dependency array

  const filteredReviews =
    selectedFilter === "All" ? reviewsData : reviewsData.filter((review) => review.rating === selectedFilter);

  // Pagination Logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleThumbnailClick = (item: string, type: "photo" | "video") => {
    setSelectedMedia(item);
    setIsVideo(type === "video");
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <main className="grid grid-cols-1 gap-6 bg-white px-10 pt-10 md:grid-cols-3">
          {/* *****************Left Section**************************** */}
          <section className="md:col-span-2">
            <div>
              <h1 className="text-2xl font-bold">{serviceData?.title}</h1>
              {/* <div className="mt-2 flex items-center text-gray-600">
                <Image src={user?.profilePicture || ""} alt="Domenica" width={30} height={30} className="rounded-full" />
                <span className="ps-2 font-semibold">{user?.name ?? "NAN"}</span>
                <FaStar className="ms-6 pe-2 text-yellow-500" />
                <span>4.9 (3,058 reviews)</span>
              </div> */}
              {/* Main Media Display */}
              <div className="relative mt-4 h-[40rem] w-full">
                {isVideo ? (
                  <video controls className="h-full w-full rounded-lg object-cover">
                    <source src={selectedMedia} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={selectedMedia}
                    alt="Selected Service Preview"
                    fill
                    className="rounded-lg object-cover object-center"
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="mt-4 flex w-full flex-wrap gap-4">
                {serviceData?.media?.photos?.map((photo, index) => (
                  <div
                    key={`photo-${index}`}
                    className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 ${
                      selectedMedia === photo && !isVideo ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailClick(photo, "photo")}
                  >
                    <Image src={photo} alt="Thumbnail" width={80} height={80} className="object-cover" />
                  </div>
                ))}
                {serviceData?.media?.videos?.map((video, index) => (
                  <div
                    key={`video-${index}`}
                    className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 ${
                      selectedMedia === video && isVideo ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailClick(video, "video")}
                  >
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-lg bg-black">
                      <FaPlay className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* About Section */}
            <div className="py-10">
              <h1 className="text-2xl font-semibold">About Service</h1>
              <p className="text-justify">{serviceData?.description}</p>
            </div>

            {/* Reviews Section */}
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

            {/* Filter Buttons */}
            <div className="my-6 flex space-x-2">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer rounded-lg border px-10 py-2 ${
                    selectedFilter === option ? "bg-orange-400 text-white" : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  {option === "All" ? "All" : `${option} Star `}
                </button>
              ))}
            </div>

            {/* Package Selection */}
            <div className="my-4">
              <h2 className="text-xl font-semibold">Select Package</h2>
              <div className="flex space-x-2">
                {["Starter", "Standard", "Advanced"].map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`cursor-pointer rounded-lg border px-4 py-2 ${
                      selectedPackage === pkg ? "bg-orange-400 text-white" : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>

            {/* Paginated Reviews */}
            {currentReviews.map((review) => (
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

            {/* Pagination Controls */}
            <div className="mt-5 mb-10 flex items-center justify-end space-x-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className="rounded-full bg-gray-100 p-2 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    currentPage === page ? "bg-red-400 text-white" : "bg-gray-100"
                  } text-sm`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className="rounded-full bg-gray-100 p-2 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ServicePage;
