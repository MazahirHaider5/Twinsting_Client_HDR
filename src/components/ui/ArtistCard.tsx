import Image from "next/image";
import { FaStar, FaHeart } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";

interface ArtistCardProps {
  id: number;
  image: string;
  name: string;
  profession: string;
  location: string;
  rating: number;
  reviews: number;
  skills: string[];
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, image, name, profession, location, rating, reviews, skills }) => {
  return (
    <div className="relative h-auto w-full rounded-lg border border-gray-300 bg-white p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-md sm:w-[320px] sm:p-6 md:w-[350px]">
      <div className="relative h-[100px] w-full rounded-lg bg-pink-100 sm:h-[120px]">
        <FaHeart className="absolute top-2 right-2 size-8 cursor-pointer rounded-full bg-white p-1 text-gray-300 hover:text-red-500 sm:top-3 sm:right-3 sm:size-10 sm:p-2" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
            <Image src={image} alt="Profile" width={96} height={96} className="rounded-full border-4 border-white" />
            {/* Fixing the Check Icon */}
            <BsCheckCircleFill className="absolute right-1 bottom-1 rounded-full bg-white p-0.5 text-lg text-green-500 shadow-md sm:right-2 sm:bottom-2 sm:text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center space-y-1 text-center sm:mt-16 sm:space-y-2">
        <p className="text-base font-semibold sm:text-lg md:text-xl">{name}</p>
        <p className="text-xs text-gray-500 sm:text-sm md:text-lg">{profession}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500 sm:gap-2 sm:text-sm md:text-lg">
          <MdLocationOn />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-center">
          {/* {[...Array(5)].map((index) => (
            <FaStar
              key={index}
              className={`text-sm sm:text-lg ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))} */}
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-sm sm:text-lg ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}

          <span className="ml-1 text-xs font-semibold sm:ml-2 sm:text-base">{rating}</span>
          <span className="ml-1 text-xs text-gray-500 sm:text-sm">({reviews})</span>
        </div>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          {skills.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-1 text-[0.5rem] text-gray-700 sm:px-3 md:text-base"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full p-2 sm:p-4">
          <Link href={`/artist-profile?id=${id}`}>
            <p className="w-full rounded-lg border border-[#F5AF48] py-2 text-center text-xs font-semibold text-[#F5AF48] transition hover:bg-[#F5AF48] hover:text-white sm:py-3 sm:text-base">
              View Profile
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
