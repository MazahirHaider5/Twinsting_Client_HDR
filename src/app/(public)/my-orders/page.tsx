// Updated inbox functionality in UserOrdersPage.tsx
'use client'
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import apiClient from "@/lib/interceptor";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";

// Additional interfaces for conversation data
interface Participant {
  _id: string;
  name?: string;
  email: string;
  profilePicture: string;
  username?: string;
}

interface LastMessage {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Conversation {
  _id: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
  lastMessage: LastMessage;
  unreadCount: number;
  receiver: Participant;
  sender: Participant;
}

interface ConversationsResponse {
  success: boolean;
  message: string;
  data: {
    conversations: Conversation[];
    totalUnreadMessages: number;
    totalConversations: number;
  };
}

// Existing interfaces remain unchanged
interface Artist {
  _id: string;
  email: string;
  profilePicture: string;
  location: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
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

interface Order {
  _id: string;
  service_id: Service;
  order_title: string;
  location: string;
  delivery_date: string;
  status: string;
  amount: number;
  is_paid: boolean;
  user_id: User;
  artist_id: Artist;
  booking_date_time: string;
  createdAt: string;
  updatedAt: string;
  order_number: string;
  remaining_time: string;
}

const UserOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  // New state for conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0);
  const [conversationsLoading, setConversationsLoading] = useState<boolean>(true);
  const [conversationsError, setConversationsError] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user)
  console.log("This is user in order page",user);
  const userId = user._id;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/order/getUserOrders");
        if (response.data.success) {
          setOrders(response.data.data);
          
          // Set the first order's artist as the selected artist initially
          if (response.data.data.length > 0) {
            setSelectedArtist(response.data.data[0].artist_id);
          }
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("An error occurred while fetching orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // New useEffect to fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setConversationsLoading(true);
        
        const response = await apiClient.get(`/conversation/getAllUserConversations/${userId}`);
        if (response.data.success) {
          setConversations(response.data.data.conversations);
          setTotalUnreadMessages(response.data.data.totalUnreadMessages);
        } else {
          setConversationsError("Failed to fetch conversations");
        }
      } catch (err) {
        setConversationsError("An error occurred while fetching conversations");
        console.error("Error fetching conversations:", err);
      } finally {
        setConversationsLoading(false);
      }
    };

    fetchConversations();
  }, []);
  
  // console.log("Full order data:", JSON.stringify(orders, null, 2));

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => order.status.toLowerCase() === activeTab);

  // Set selected artist when an order is clicked
  const handleOrderClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEE, MMM d 'at' h:mma");
    } catch (err) {
      return "Invalid date";
    }
  };

  // Get price with currency symbol
  const formatPrice = (amount: number) => {
    return `$${amount}`;
  };

  // Format username from email (extract username part before @)
  const formatUsername = (email: string) => {
    if (email?.includes('@')) {
      return email.split('@')[0];
    }
    return email;
  };

  // Get the other participant in a conversation (not the current user)
  const getOtherParticipant = (conversation: Conversation) => {
    // Assuming the first participant is the current user
    // In a real app, you would compare with the logged-in user ID
    // const userId = localStorage.getItem('userId') || '681448046090ba2889b1d4f5';
    
    return conversation.participants.find(p => p._id !== userId) || conversation.participants[0];
  };

  // Get a truncated version of the message text
  const truncateMessage = (text: string, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="flex items-center justify-center bg-[#EFEEF3] p-5">
      <div className="maincontainer flex w-full flex-col gap-6 lg:w-[90%] lg:flex-row">
        <div className="leftside flex-1 rounded-lg py-4">
          <h1 className="mb-4 text-2xl font-bold">My Orders</h1>

          <div className="mb-6 flex flex-wrap gap-4 font-semibold">
            <button
              onClick={() => setActiveTab("active")}
              className={`cursor-pointer px-4 py-2 hover:rounded-md hover:bg-gray-200 ${
                activeTab === "active" ? "border-b-2 border-[#ed6d5f]" : ""
              }`}
            >
              Active
              <span
                className={`ml-4 rounded-md px-2 py-2 ${activeTab === "active" ? "bg-[#ed6d5f] text-white" : "bg-white text-black"}`}
              >
                {orders.filter((order) => order.status.toLowerCase() === "active").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`cursor-pointer px-4 py-2 hover:rounded-md hover:bg-gray-200 ${
                activeTab === "completed" ? "border-b-2 border-[#ed6d5f]" : ""
              }`}
            >
              Completed
              <span
                className={`ml-4 rounded-md px-2 py-2 ${activeTab === "completed" ? "bg-[#ed6d5f] text-white" : "bg-white text-black"}`}
              >
                {orders.filter((order) => order.status.toLowerCase() === "completed").length}
              </span>
            </button>
          </div>

          <div className="flex w-[100%] flex-col gap-4">
            {loading ? (
              <div className="py-5 text-center">Loading orders...</div>
            ) : error ? (
              <div className="py-5 text-center text-red-500">{error}</div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-5 text-center">No {activeTab} orders found</div>
            ) : (
              filteredOrders.map((order) => (
                <div 
                  key={order._id} 
                  className="rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleOrderClick(order.artist_id)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-lg font-bold">{order.order_title}</h2>
                    <div className="ml-36 md:justify-between">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-[#0E8B1A]">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 flex items-center text-sm text-[#6e6e70]">
                    <IoLocationOutline className="mr-2 h-5 w-5 text-[#6e6e70]" />
                    {order.location}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-[#6e6e70]">
                    <Image src="/images/hrs.svg" className="mr-2 h-5 w-5" alt="Calendar" width={20} height={20} />
                    {`Est. ${order.remaining_time}`}
                  </p>

                  <div className="mt-2 flex justify-between text-sm text-[#6e6e70]">
                    <span className="flex items-center justify-start">
                      <MdOutlineDateRange className="mr-2 h-5 w-5 text-[#6e6e70]" />
                      {formatDate(order.booking_date_time)}
                    </span>

                    <span className="text-lg font-semibold text-black">{formatPrice(order.amount)}</span>
                  </div>

                  {/* Artist Info */}
                  <div className="mt-2 flex flex-col justify-between border-t-1 border-t-gray-300 sm:flex-row sm:items-center">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={order.artist_id.profilePicture || "/images/serviceUserProfile.png"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="text-[16px] font-bold">Artist</p>
                        <p className="text-[14px] text-gray-500">{formatUsername(order.artist_id.email)}</p>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500 sm:mt-0">
                      <button className="text-black">Directions</button>{" "}
                      <span className="ms-2 me-0 mb-4 text-4xl font-semibold text-gray-400">.</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rightside pt-5">
          {selectedArtist ? (
            <div className="relative w-80 overflow-hidden rounded-2xl bg-white p-5 shadow-lg">
              {/* Top Rounded Background */}
              <div className="absolute top-0 left-0 h-24 w-full rounded-t-2xl bg-[#f5f5ff]"></div>

              {/* Profile Image */}
              <div className="relative z-10 mt-10 flex justify-center">
                <Image
                  src={selectedArtist.profilePicture || "/images/SellerDp.png"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full border-4 border-white shadow-md object-cover"
                />
                <span className="absolute right-[calc(50%-10px)] bottom-0 h-5 w-5 rounded-full bg-white p-[2px] shadow-sm">
                  <FaCheckCircle className="text-green-500" />
                </span>
              </div>

              {/* Profile Info */}
              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-[#0E0E0F]">{formatUsername(selectedArtist.email)}</h2>
                <p className="text-sm text-[#6E6E6F]">Artist</p>
                <p className="mt-1 text-sm text-[#6E6E6F]">
                  <FaMapMarkerAlt className="mr-1 inline" />
                  {selectedArtist.location}
                </p>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
                <span className="ml-2 font-semibold text-[#0E0E0F]">5.0</span>
                <span className="text-sm text-gray-500">(12)</span>
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {["Artist", "Verified", "Active"].map((tag, index) => (
                  <span key={index} className="rounded-full bg-[#f5f5f5] px-3 py-1 text-sm text-[#0E0E0F] shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Profile Button */}
              <div className="mt-5">
                <button
                  className="w-full rounded-3xl border bg-white bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text py-2 text-center font-semibold text-transparent hover:opacity-80"
                  style={{
                    borderImageSource: "linear-gradient(135deg, #F5AF48 0%, #F5AF48 0.21%, #E32379 100%)",
                    borderImageSlice: 1
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40 w-80 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">Select an order to view artist details</p>
            </div>
          )}

          <div className="mt-8 w-80 rounded-lg bg-white p-4 shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Inbox ({totalUnreadMessages} unread)</h2>
              <button className="text-sm font-semibold text-red-500 underline">View all</button>
            </div>
            
            {/* Dynamic Conversations */}
            <div className="space-y-4">
              {conversationsLoading ? (
                <div className="text-center py-4">Loading conversations...</div>
              ) : conversationsError ? (
                <div className="text-center text-red-500 py-4">{conversationsError}</div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-4">No conversations found</div>
              ) : (
                conversations.map((conversation) => {
                  const otherParticipant = getOtherParticipant(conversation);
                  return (
                    <div
                      key={conversation._id}
                      className="flex cursor-pointer items-center rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
                    >
                      <Image
                        src={otherParticipant.profilePicture || "/images/TrustUsers1.png"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="mr-3 h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {otherParticipant.name || formatUsername(otherParticipant.email)}
                        </h3>
                        <p className="flex w-60 items-center text-sm text-gray-500">
                          {truncateMessage(conversation.lastMessage.text)}
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 h-2 w-2 rounded-full bg-red-500"></span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;