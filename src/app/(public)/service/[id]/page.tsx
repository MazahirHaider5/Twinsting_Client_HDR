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
import { useState, useEffect } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { useParams } from "next/navigation";
import apiClient from "@/lib/interceptor";
import ConfirmOrderModal from "@/components/modals/ConfirmOrderModal";

// Define types for our API response
type Package = {
  name: string;
  description: string;
  price: number;
  _id: string;
  deliveryTime: number;
};

type Pricing = {
  starter?: Package;
  standard?: Package;
  advanced?: Package;
  [key: string]: Package | undefined;
};

type Media = {
  photos: string[];
  videos: string[];
  _id: string;
};
type Artist = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  profile_description: string;
  username: string;
};
type ServiceData = {
  _id: string;
  artist_id: Artist;
  title: string;
  category: string;
  subcategory: string;
  searchTags: string[];
  description: string;
  media: Media;
  pricing: Pricing;
  status: string;
  orders: any[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Define the Review Type
type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  avatar: string;
};

// Temporary reviews data until we have real reviews from API
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
  }
];

// Calculate review stats based on review data
const calculateReviewStats = (reviews: Review[]) => {
  const stats = [
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 }
  ];

  reviews.forEach((review) => {
    const starIndex = 5 - review.rating;
    if (starIndex >= 0 && starIndex < 5) {
      stats[starIndex].count += 1;
    }
  });

  return stats;
};

const filterOptions: (number | "All")[] = ["All", 5, 4, 3, 2, 1];

const ServicePage = () => {
  const params = useParams();
  const serviceId = params.id as string;

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<number | "All">("All");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/service/getServiceById/${serviceId}`);
        const data = response.data;
        // console.log("This is service response data", response);
        // const service = response.data.data;
        // console.log(service.artist_id);

        if (data.success) {
          setService(data.data);
          // Set default selected image if media exists
          if (data.data.media?.photos && data.data.media.photos.length > 0) {
            setSelectedImage(data.data.media.photos[0]);
          }

          // Set default selected package based on what's available
          if (data.data.pricing) {
            const availablePackages = Object.keys(data.data.pricing);
            if (availablePackages.length > 0) {
              setSelectedPackage(availablePackages[0]);
            }
          }
        } else {
          setError(data.message || "Failed to fetch service data");
        }
      } catch (err) {
        setError("An error occurred while fetching service data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchServiceData();
    }
  }, [serviceId]);

  // Use reviews data for now, but in the future this would come from the API
  const reviews = calculateReviewStats(reviewsData);
  const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0);

  // Filter reviews based on selection
  const filteredReviews =
    selectedFilter === "All" ? reviewsData : reviewsData.filter((review) => review.rating === selectedFilter);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading service details...</div>;
  }

  if (error || !service) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error || "Service not found"}</div>;
  }

  // Extract available packages for display
  const availablePackages = Object.keys(service.pricing || {});

  // Get all media images
  const allImages = service.media?.photos || [];

  // Helper function to get current package price
  const getCurrentPackagePrice = () => {
    const pkg = service.pricing[selectedPackage];
    return pkg ? pkg.price : 0;
  };

  return (
    <>
      <main className="mx-auto grid max-w-[95%] grid-cols-1 px-10 pt-10 md:grid-cols-3">
        {/* *****************Left Section**************************** */}
        <section className="md:col-span-2">
          <div>
            <h1 className="text-2xl font-bold">{service.title}</h1>
            <div className="mt-2 flex items-center text-gray-600">
              <div className="relative h-[30px] w-[30px] overflow-hidden rounded-full">
                <Image src={service.artist_id.profilePicture} alt="Artist" fill className="object-cover" />
              </div>
              <span className="ps-2 font-semibold">{service.artist_id.name}</span>
              <FaStar className="ms-6 pe-2 text-yellow-500" />
              <span>4.9 ({totalReviews} reviews)</span>
            </div>

            {/* Main Image Display */}
            {selectedImage && (
              <div className="relative mt-4 h-[30rem] w-[90%]">
                <Image
                  src={selectedImage}
                  alt="Selected Service Preview"
                  fill
                  className="rounded-lg object-cover object-center"
                />
              </div>
            )}

            {/* Thumbnail Gallery */}
            {allImages.length > 0 && (
              <div className="mt-4 flex w-full gap-4">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className={`h-32 w-32 cursor-pointer overflow-hidden rounded-lg border-2 ${
                      selectedImage === img ? "border-orange-600" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={128}
                      height={128}
                      className="h-full w-full bg-amber-50 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* -------------about section-----------  */}
          <div className="py-10">
            <h1 className="text-2xl font-semibold">About Service</h1>
            <p className="text-justify">{service.description}</p>
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
                  <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
          <div className="my-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFilter(option)}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors duration-200 sm:px-8 sm:text-base ${
                  selectedFilter === option ? "gradient-bg text-white" : "border-gray-200 bg-gray-100 text-black"
                }`}
              >
                {option === "All" ? "All" : `${option} Star`}
              </button>
            ))}
          </div>

          {filteredReviews.map((review) => (
            <>
              <div key={review.id} className="mb-4 border-b border-gray-300 pb-1">
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
              </div>
              <div className="mt-2 flex items-center justify-end space-x-4 text-sm text-gray-600">
                <div className="flex cursor-pointer items-center gap-x-1 hover:text-gray-700">
                  {/* <FaRegThumbsUp className="mr-1" /> */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.2334 15.2916L8.81673 17.2916C9.15006 17.6249 9.90006 17.7916 10.4001 17.7916H13.5667C14.5667 17.7916 15.6501 17.0416 15.9001 16.0416L17.9001 9.95822C18.3167 8.79156 17.5667 7.79156 16.3167 7.79156H12.9834C12.4834 7.79156 12.0667 7.37489 12.1501 6.79156L12.5667 4.12489C12.7334 3.37489 12.2334 2.54156 11.4834 2.29156C10.8167 2.04156 9.9834 2.37489 9.65006 2.87489L6.2334 7.95822"
                      stroke="#50534D"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                    />
                    <path
                      d="M1.9834 15.2915V7.12484C1.9834 5.95817 2.4834 5.5415 3.65006 5.5415H4.4834C5.65006 5.5415 6.15006 5.95817 6.15006 7.12484V15.2915C6.15006 16.4582 5.65006 16.8748 4.4834 16.8748H3.65006C2.4834 16.8748 1.9834 16.4582 1.9834 15.2915Z"
                      stroke="#50534D"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span>Was this review helpful?</span>
                </div>
                <div className="flex cursor-pointer items-center gap-x-1 text-red-500 hover:text-red-700">
                  {/* <FaFlag className="mr-1" /> */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.29199 1.6665V18.3332"
                      stroke="#E06262"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.29199 3.3335H13.6253C15.8753 3.3335 16.3753 4.5835 14.792 6.16683L13.792 7.16683C13.1253 7.8335 13.1253 8.91683 13.792 9.50016L14.792 10.5002C16.3753 12.0835 15.792 13.3335 13.6253 13.3335H4.29199"
                      stroke="#E06262"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span>Report</span>
                </div>
                <div className="flex cursor-pointer items-center gap-x-1 hover:text-gray-700">
                  {/* <FaShareAlt className="mr-1" /> */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_157_18594)">
                      <path
                        d="M6.67188 7.5H5.83854C5.39651 7.5 4.97259 7.6756 4.66003 7.98816C4.34747 8.30072 4.17188 8.72464 4.17188 9.16667V15.8333C4.17188 16.2754 4.34747 16.6993 4.66003 17.0118C4.97259 17.3244 5.39651 17.5 5.83854 17.5H14.1719C14.6139 17.5 15.0378 17.3244 15.3504 17.0118C15.6629 16.6993 15.8385 16.2754 15.8385 15.8333V9.16667C15.8385 8.72464 15.6629 8.30072 15.3504 7.98816C15.0378 7.6756 14.6139 7.5 14.1719 7.5H13.3385"
                        stroke="#454548"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 11.6667V2.5"
                        stroke="#454548"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.5 5L10 2.5L12.5 5"
                        stroke="#454548"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_157_18594">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-black">Share</span>
                </div>
              </div>
            </>
          ))}
          <div className="mt-16 mb-10 flex items-center justify-end space-x-2">
            <button className="rounded-full bg-gray-100 p-2 disabled:opacity-50">
              <FaChevronLeft size={16} />
            </button>

            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-sm text-white`}
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
          <div className="h-auto rounded-lg bg-gray-100/50 p-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Select Service Package</h2>
              <p className="gradient-text bg-clip-text font-semibold text-transparent">Compare Package</p>
            </div>
            {/* Package Selection */}
            <div className="my-4 flex flex-wrap gap-6">
              {availablePackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`flex w-32 cursor-pointer flex-col items-center rounded-lg bg-white p-4`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300">
                    {selectedPackage === pkg && <div className="h-4 w-4 rounded-full bg-[#E0E0E0]"></div>}
                  </div>
                  <span className="pt-3 text-center text-sm font-semibold text-gray-500">
                    {service.pricing[pkg]?.name || pkg}
                  </span>
                  <span className="font-bold text-black">${service.pricing[pkg]?.price || 0}</span>
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold text-gray-900">{service.title}</p>

            <p className="overflow-auto text-sm break-words text-gray-600">
              {service.pricing[selectedPackage]?.description || "Service package description"}
            </p>

            <div className="semi-bold mt-4 flex justify-between text-gray-500">
              <span className="flex items-center gap-1 text-base">
                <MdOutlineWatchLater className="text-2xl" /> Deliver Time:
              </span>
              <span className="font-semibold text-black">
                {service.pricing[selectedPackage]?.deliveryTime
                  ? `${service.pricing[selectedPackage].deliveryTime} Days`
                  : "N/A"}
              </span>
            </div>

            <div className="mt-5 flex flex-col items-center justify-between rounded-xl bg-white p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-dashed border-red-400 p-0.5">
                  <Image
                    src={service.artist_id.profilePicture}
                    alt={service.artist_id.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute right-0 bottom-1 h-3 w-3 rounded-full border border-white bg-green-500"></span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">{service.artist_id.name}</p>
                  <p className="text-sm text-gray-500">Last seen 1hr ago • 09:38 PM</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-7 text-xl">
                <button className="flex items-center gap-1 rounded-full bg-[#FEEDF4] px-6 py-3">
                  <Image src="/images/telegram.png" alt="Telegram Logo" width={20} height={20} />
                  <span className="gradient-text text-sm">Message</span>
                </button>

                <ConfirmOrderModal
                  serviceId={service._id}
                  pricingType={selectedPackage}
                  deliveryTime={service.pricing[selectedPackage]?.deliveryTime || 0}
                  location={service.artist_id.location}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col items-center pt-8 text-gray-600">
            <div className="flex items-center space-x-2 text-lg">
              <span className="text-sm font-semibold">Share:</span>
              <FaLink />
              <FaFacebook className="text-blue-600" />
              <FaInstagram className="text-pink-500" />
              <FaTwitter className="text-blue-400" />
            </div>
            <div className="mt-2 flex cursor-pointer items-center space-x-1 text-base">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_157_18485)">
                  <path
                    d="M5.08301 13.3467H17.9163L13.7913 9.22168L17.9163 5.09668H5.08301V19.7633"
                    stroke="#0E0D11"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_157_18485">
                    <rect width="22" height="22" fill="white" transform="translate(0.5 0.513428)" />
                  </clipPath>
                </defs>
              </svg>

              <span className="text-sm font-semibold">Report the account</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicePage;
