"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import GetTwiApp from "@/components/main/GetTwiApp";
import apiClient from "@/lib/interceptor";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  email?: string;
}

interface ServicePricing {
  name: string;
  description: string;
  price: number;
  deliveryTime: number;
}

interface ServiceMedia {
  photos: string[];
  videos: string[];
  _id: string;
}

interface Service {
  _id: string;
  artist_id: string;
  title: string;
  category: string;
  subcategory: string;
  searchTags: string[];
  description: string;
  media: ServiceMedia;
  pricing: {
    starter: ServicePricing;
    standard: ServicePricing;
    advance: ServicePricing;
  };
  status: string;
  orders: string[];
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

interface OrderDetails {
  _id: string;
  order_title: string;
  location: string;
  delivery_date: string;
  booking_date_time: string;
  amount: number;
  status: string;
  remaining_time: string;
  user_id: string;
  artist_id: string;
  service_id: Service;
  order_number: string;
  is_paid: boolean;
  createdAt: string;
  updatedAt: string;
}

const OrderDetails = () => {
  const params = useParams();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [artistDetails, setArtistDetails] = useState<any>(null);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const orderId = params.id;
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
                
        const response = await apiClient.get(`/order/details/${orderId}`);
        
        if (response.data.success) {
          setOrderDetails(response.data.data);          
          setArtistDetails(response.data.data.artist_id);
          
        } else {
          setError("Failed to fetch order details");
        }
      } catch (err) {
        setError("An error occurred while fetching order details");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.id]);

  

  // Format date function
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    }) + ' - ' + date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  useEffect(() => {
    if (!orderDetails?.delivery_date) return;
  
    const targetTime = new Date(orderDetails.delivery_date).getTime();
  
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;
  
      if (difference <= 0) {
        setTimer({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
  
      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      setTimer({ hours, minutes, seconds });
    };
  
    updateCountdown(); // initial call
    const interval = setInterval(updateCountdown, 1000);
  
    return () => clearInterval(interval); // cleanup on unmount
  }, [orderDetails?.delivery_date]);

  const handleOrderStatus = async() => {
    try {
      setLoading(true)
      const response = await apiClient.patch(`/order/status/${orderId}`);
      if (response.data.success) {
        toast.success("Order Completed!")

        setOrderDetails((prev) =>
          prev ? { ...prev, status: response.data.data.status } : prev
        );
      
      }
    } catch (error) {
      setError("An error occurred while updating the order status");
        console.error("Error updating order status:", error);
    }finally{
      setLoading(false)
    }
  }
  

  if (loading) {
    return (
      <section className="mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex justify-center items-center h-64">
          <p>Loading order details...</p>
        </div>
      </section>
    );
  }

  if (error || !orderDetails) {
    return (
      <section className="mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex justify-center items-center h-64">
          <p>{error || "Order details not found"}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Side DIV*/}
        <div className="flex w-full flex-col gap-6 lg:w-[65%]">
          {/* Top Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg font-bold sm:text-xl lg:text-2xl">Order No# {orderDetails.order_number}</p>
                <div className={`w-fit rounded-full  px-4 py-2 text-sm sm:text-base ${orderDetails.status === 'completed' ? 'bg-green-100 text-[#0E8B1A]' : 'bg-[#FFEECC] text-[#553D00]' }`}>
                  <p>{orderDetails.status}</p>
                </div>
              </div>
              <p className="pt-4 text-sm text-gray-500 sm:text-base">
                {orderDetails.service_id.description || "No description available"}
              </p>
            </div>
          </div>
          <GetTwiApp />
          {/* Service Details Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <p className="text-lg font-semibold sm:text-xl">Service Details</p>
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <div className="flex items-start gap-4">
                <Image
                  alt="img"
                  src="/images/tag.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Selected Service</p>
                  <p className="text-gray-900">{orderDetails.service_id.title}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row">
              <div className="flex flex-1 items-start gap-4">
                <Image
                  alt="img"
                  src="/images/calendar-edit.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">{formatDate(orderDetails.booking_date_time)}</p>
                </div>
              </div>
              <p className="gradient-text cursor-pointer font-semibold underline">Request Change</p>
            </div>
            <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row">
              <div className="flex flex-1 items-start gap-4">
                <Image
                  alt="img"
                  src="/images/location.png"
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full bg-gray-200 p-4"
                />
                <div className="flex-col">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{orderDetails.location}</p>
                </div>
              </div>
              <p className="gradient-text cursor-pointer font-semibold underline">Request Change</p>
            </div>
          </div>

          {/* Seller Details Section */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <p className="text-lg font-semibold sm:text-xl">Seller Details</p>
            <div className="flex flex-col items-start gap-4 pt-6 sm:flex-row">
              <div className="flex flex-1 items-start gap-4">
                <Image
                  alt="img"
                  src={artistDetails?.profilePicture || "/images/SellerDp.png"}
                  width={60}
                  height={60}
                  className="h-16 w-16 sm:h-20 sm:w-20"
                />
                <div className="flex-col">
                  <p className="font-semibold text-gray-900">{artistDetails?.name || "Artist"}</p>
                  <div className="flex space-x-1 pt-1">
                    <GoLocation className="text-gray-500" />
                    <p className="text-sm text-gray-500">{artistDetails?.location || "Location not available"}</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-base text-yellow-400 sm:text-lg" />
                    ))}
                    <span className="ml-2 font-semibold text-black">5.0</span>
                    <span className="ml-1 text-sm text-gray-500">({artistDetails?.reviews?.length || 0})</span>
                  </div>
                </div>
              </div>
              <button
                className="gradient-text mt-4 cursor-pointer font-semibold sm:mt-0"
                onClick={() => setShowReviewDialog(true)}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Side DIV */}
        <div className="flex w-full flex-col gap-6 lg:w-[35%]">
          <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div>
              <p className="text-lg font-bold sm:text-xl">Service Due In</p>
              <p className="pt-2 text-sm text-gray-500 sm:text-base">
                Time remaining until the service delivery date.
              </p>
              <div className="flex justify-between gap-4 py-4">
                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 text-center text-2xl text-gray-900 sm:p-8 sm:text-4xl">
                  {`${timer.hours} `}
                  </p>
                  <p className="text-center text-sm text-gray-700 sm:text-base">Hours</p>
                </div>

                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 text-center text-2xl text-gray-900 sm:p-8 sm:text-4xl">
                    {timer.minutes}
                  </p>
                  <p className="text-center text-sm text-gray-700 sm:text-base">Mins</p>
                </div>

                <div className="flex-col items-center justify-center">
                  <p className="text-bold rounded-xl bg-gray-100 p-4 text-center text-2xl text-gray-900 sm:p-8 sm:text-4xl">
                     {timer.seconds}
                  </p>
                  <p className="text-center text-sm text-gray-700 sm:text-base">Secs</p>
                </div>
              </div>
              <button className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-200 py-3 text-sm font-semibold sm:text-base cursor-pointer hover:bg-gray-300 transition-colors duration-100" onClick={handleOrderStatus}>
                Mark as Completed
              </button>
            </div>
          </div>

          {/* Action Cards */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/Chat.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Chat with Seller</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
              <FaChevronRight className="mt-4" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/calendar-edit.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Add to Calendar</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 sm:px-4 sm:py-6">
            <div className="flex items-start gap-4">
              <Image
                alt="img"
                src="/images/support.png"
                width={40}
                height={40}
                className="h-12 w-12 rounded-xl bg-gray-200 p-3"
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet</p>
              </div>
              <FaChevronRight className="mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      {showReviewDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg sm:p-6">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowReviewDialog(false)}
            >
              <RxCross2 className="m-2 cursor-pointer text-xl" />
            </button>
            <h2 className="text-center text-lg font-bold">Write a review</h2>
            <p className="text-center text-sm text-gray-600 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmmollit anim
            </p>

            <div className="mt-2 flex items-center justify-center">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-xl text-yellow-400 sm:text-2xl" />
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <p className="text-start font-semibold">Describe your experience</p>
              <textarea
                className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-gray-100 p-2 sm:h-44"
                placeholder="Type your experience..."
              />
              <button
                className="gradient-bg rounded-lg px-4 py-3 text-sm text-white sm:py-4 sm:text-base"
                onClick={() => setShowReviewDialog(false)}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetails;