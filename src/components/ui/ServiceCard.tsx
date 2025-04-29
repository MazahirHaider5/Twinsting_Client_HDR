import Image from "next/image";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { ServiceData } from "../../types/services"; // adjust the import path where you saved ServiceData

interface ServiceCardProps {
  service: ServiceData;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { media, title, pricing } = service;

  const serviceImage = media.photos.length > 0 ? media.photos[0] : "/images/default-service-image.png"; // fallback if no photo

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 transition-all duration-300 hover:border-gray-400 hover:shadow-md">
      {/* Responsive Image */}
      <Image alt="service" src={serviceImage} width={350} height={300} className="h-50 w-full rounded-t-lg" />

      {/* Title with Truncation */}
      <p className="min-h-12 truncate px-4 text-lg font-semibold sm:text-xl">{title}</p>

      {/* Delivery & Price */}
      <div className="flex flex-col gap-2 border-b border-gray-200 px-4 pb-2 text-gray-700">
        <span className="flex items-center gap-2 text-sm sm:text-base">
          <CiClock2 className="size-5" />
          <p className="truncate">Delivery: 3 days</p>
        </span>
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <IoPricetagOutline />
          <p className="mx-1 truncate">
            Starts from: <span className="font-bold text-gray-900">${pricing?.starter?.price ?? 'N/A'}</span>
          </p>
        </div>
      </div>

      {/* Artist & Rating */}
      <div className="flex items-center justify-between px-4 pb-4 text-sm sm:text-base">
        <span className="flex items-center gap-2 truncate">
          <Image alt="artist" src="/images/ArtistsServicesImg.png" width={30} height={30} className="rounded-full" />
          <p className="truncate font-semibold">Artist Name</p>
        </span>
        <span className="flex items-center gap-2">
          <FaStar className="text-amber-400" />
          <p className="text-gray-700">0.0</p>
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
