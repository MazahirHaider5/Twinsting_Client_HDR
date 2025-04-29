"use client";
import { useEffect, useState } from "react";
import ServicesCards from "@/components/artist-assistant/ServicesCards";
import apiClient from "@/lib/interceptor";
import Link from "next/link";
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
  orders: Order[]; // Updated type from any[] to Order[]
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Services = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const handleDeleteService = (id: string) => {
    setAllServices((prev) => prev.filter((service) => service._id !== id));
  };
  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/service/getArtistServices");
      if (response?.status === 200) {
        setLoading(false);
        setAllServices(response?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="mx-16 my-10 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-2xl font-bold">Services</p>
        <Link href={"/artist-side/service-creation/overview"}>
          <button
            type="button"
            className="cursor-pointer rounded-xl border-2 border-[#f79252] bg-white px-3 py-3 text-sm font-medium text-[#f79252]"
          >
            + Add Service
          </button>
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-2xl">Fetching...</p>
      ) : (
        <section className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {allServices?.length > 0 ? (
            allServices?.map((service) => (
              <ServicesCards key={service._id} service={service} onDelete={handleDeleteService} />
            ))
          ) : (
            <p className="text-center text-2xl font-semibold">No services found</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Services;
