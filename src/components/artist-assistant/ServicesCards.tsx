"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import apiClient from "@/lib/interceptor";
import { showConfirmationAlert } from "../../utils/Alerts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export interface Review {
  user_id: string;
  stars: number;
  feedback: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  photos: string[];
  videos: string[];
  _id: string;
}

export interface Order {
  id: string;
  amount: number;
  status: string;
  // Add other relevant properties
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

interface ServiceCardProps {
  service: Service;
  onDelete: (id: string) => void;
}

const ServicesCards: React.FC<ServiceCardProps> = ({ service, onDelete }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const images = service?.media?.photos;
  const rating = service?.reviews?.length
    ? (service?.reviews?.reduce((acc, cur) => acc + cur.stars, 0) / service?.reviews?.length).toFixed(1)
    : "0.0";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteService = async (id: string) => {
    const result = await showConfirmationAlert(
      "Are you sure you want to delete this item?",
      "warning", // icon type: "success", "error", "warning", "info", "question"
      "Yes, delete it",
      "No, cancel"
    );

    if (result.isConfirmed) {
      try {
        const response = await apiClient.delete(`/service/deleteServiceById/${id}`);
        if (response?.status === 200) {
          toast.success("Service deleted success");
          onDelete(id);
        }
      } catch (error) {
        console.error("Submit error:", error);
      }
    } else {
      console.log("Delete cancelled");
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 transition-all duration-300 hover:border-gray-400 hover:shadow-md">
      <div className="relative">
        <Image
          alt="artist"
          src={images[activeDot]}
          width={350}
          height={250}
          className="h-60 w-100 rounded-t-lg object-cover"
        />

        <div className="absolute top-2 left-3 rounded-4xl bg-[#FFEECC] px-3 py-1 text-sm capitalize">
          {service?.status}
        </div>

        <div className="absolute top-2 right-3" ref={menuRef}>
          <div
            className="cursor-pointer rounded-full bg-white/30 p-2 text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image src="/artist-assistant/menu.svg" alt="Menu Icon"  width={24} height={24}/>
          </div>

          {showMenu && (
            <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg">
              <ul className="text-sm text-gray-700">
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => router.push(`/service-detail/${service?._id}`)}
                >
                  View
                </li>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => deleteService(service?._id)}>
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="absolute bottom-2 left-3 flex items-center space-x-2">
          <div
            className="cursor-pointer rounded-full bg-white/30 px-3 py-2.5 text-white"
            onClick={() => setShowVideo(true)}
          >
            <Image src="/artist-assistant/Vectorrr.svg" alt="Video Icon" width={24} height={24}/>
          </div>

          <div className="ml-17 flex space-x-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 cursor-pointer rounded-full ${activeDot === idx ? "bg-white" : "bg-white/50"}`}
                onClick={() => setActiveDot(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {showVideo && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-[90%] max-w-xl rounded-lg bg-white p-4">
            <button className="absolute -top-10 right-0 text-2xl text-white" onClick={() => setShowVideo(false)}>
              ✕
            </button>
            <video controls autoPlay className="w-full rounded-md">
              <source src={service?.media?.videos[0]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <p className="mb-1 px-4 text-lg font-bold sm:text-[1rem]">{service?.title}</p>
      <p className="px-4 py-0 text-sm font-medium text-gray-700">{service?.description}</p>
      <div className="mx-4 border-1 border-gray-200"></div>
      <div className="px-4 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Rating:</p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <FaStar className="text-amber-400" />
            {rating}
          </p>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Created On:</p>
          <p className="text-sm font-medium">{new Date(service?.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Avg Sale:</p>
          <p className="text-sm font-medium">${service?.pricing?.starter?.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Completed Order:</p>
          <p className="text-sm font-medium">{service?.orders?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
