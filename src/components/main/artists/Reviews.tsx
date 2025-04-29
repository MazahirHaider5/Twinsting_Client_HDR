import { useState } from "react";
import Image from "next/image";
import { FaFlag, FaRegThumbsUp, FaShareAlt, FaStar } from "react-icons/fa";

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
  {
    id: 1,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 4,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/serviceUserProfile.png"
  },
  {
    id: 2,
    name: "Domenica",
    date: "July 14, 2023",
    rating: 3,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "/images/serviceUserProfile.png"
  }
];

const filterOptions: (number | "All")[] = ["All", 5, 4, 3, 2, 1];

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState<number | "All">("All");
  // const t = useTranslations("HomePage");

  const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0);

  const filteredReviews =
    selectedFilter === "All"
      ? reviewsData
      : reviewsData.filter((review) => review.rating === selectedFilter);

  return (
    <div className="px-4 sm:px-6 md:px-14">
      <h2 className="mb-2 text-lg sm:text-xl md:text-2xl font-semibold">Reviews</h2>
      <div className="flex items-center space-x-2 text-sm sm:text-lg font-bold">
        <FaStar className="text-lg sm:text-xl text-yellow-500" />
        <span>4.9</span>
        <span className="text-xs sm:text-sm">/5 Very Satisfied</span>
      </div>

      <div className="mt-2">
        {reviews.map(({ stars, count }) => {
          const percentage = (count / totalReviews) * 100;
          return (
            <div key={stars} className="flex items-center justify-start gap-2 text-xs sm:text-sm">
              <span className="w-2 pb-1">{stars}</span>
              <FaStar className="pb-1 text-sm sm:text-base text-yellow-500" />
              <div className="h-2 sm:h-3 w-32 sm:w-64 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }}></div>
              </div>
              <span>{count}</span>
            </div>
          );
        })}
      </div>

      <div className="my-4 sm:my-6 flex flex-wrap space-x-2 sm:space-x-3 gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedFilter(option)}
            className={`cursor-pointer rounded-lg border px-4 py-2 sm:px-10 sm:py-2 ${
              selectedFilter === option ? "bg-orange-400 text-white" : "border-gray-300 bg-white text-gray-700"
            } text-xs sm:text-sm`}
          >
            {option === "All" ? "All" : `${option} Star`}
          </button>
        ))}
      </div>

      {/* Scrollable Reviews Container */}
      <div className="h-[300px] sm:h-[400px] overflow-y-auto pr-2 sm:pr-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-1">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image src={review.avatar} alt="User Avatar" width={40} height={40} className="rounded-full sm:w-[50px] sm:h-[50px]" />
              <div>
                <p className="text-sm sm:text-base font-semibold">{review.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            <div className="mt-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-500 text-xs sm:text-sm ${i >= review.rating ? "opacity-30" : ""}`}
                />
              ))}
              <span className="ml-2 text-xs sm:text-sm font-semibold">{review.rating}.0</span>
            </div>

            <p className="mt-2 text-justify text-xs sm:text-sm">{review.review}</p>

            <div className="mt-3 sm:mt-5 flex items-center justify-end space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
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
      </div>
    </div>
  );
};

export default Reviews;
