"use client";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCheck2All, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

import io, { Socket } from "socket.io-client";
import apiClient from "@/lib/interceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MessageInputBox from "./MessageInputBox";

// API base URL - should be in your env file in a real app
const API_BASE_URL = "https://twinsting-api-hdr.onrender.com";


interface User {
  _id: string;
  name?: string;
  email: string;
  username: string;
}

interface Message {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

interface ContractDetails {
  amount: number;
  duration: string;
  service: string;
  isAccepted: boolean;
}

interface Reciever {
  _id: string;
  email: string;
  profilePicture: string;
  name: string;
}

interface Sender {
  _id: string;
  email: string;
  profilePicture: string;
  name: string;
}

interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  contractDetails?: ContractDetails;
  receiver?: Reciever;
  sender?: Sender;
}

interface MessagesByDate {
  [date: string]: Message[];
}

let socket: Socket | null = null;

export default function ChatApp() {
  const currentUser = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesByDate, setMessagesByDate] = useState<MessagesByDate>({});
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(API_BASE_URL);
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receiveMessage", (message: Message) => {
      // Skip if the message is from the current user (already added in handleSendMessage)
      if (message.sender === currentUser._id) return;

      if (activeConversation && message.conversationId === activeConversation._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessagesByDate((prev) => {
          const dateKey = getMessageDateKey(new Date(message.createdAt));
          return {
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), message]
          };
        });
      }

      setConversations((prevConversations) => {
        return prevConversations.map((conv) => {
          if (conv._id === message.conversationId) {
            return {
              ...conv,
              lastMessage: message,
              unreadCount: conv.unreadCount + (message.sender !== currentUser._id ? 1 : 0)
            };
          }
          return conv;
        });
      });
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [activeConversation, currentUser._id]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await apiClient.get(`/conversation/getAllUserConversations/${currentUser._id}`);
        if (response.data.success) {
          setConversations(response.data.data.conversations);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const conversationId = searchParams.get("conversationId");
    if (conversationId && conversations.length > 0 && !activeConversation) {
      const selectedConversation = conversations.find((conv) => conv._id === conversationId);
      if (selectedConversation) {
        setActiveConversation(selectedConversation);
        setActiveChat(true);
      } else {
        console.error("Conversation not found for ID:", conversationId);
      }
    }
  }, [searchParams, conversations, activeConversation]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversation) return;

      try {
        const response = await apiClient.get(`/message/getMessagesInChat/${activeConversation._id}`);
        if (response.data.success) {
          setMessages(response.data.data);

          const groupedMessages: MessagesByDate = {};
          response.data.data.forEach((msg: Message) => {
            const dateKey = getMessageDateKey(new Date(msg.createdAt));
            if (!groupedMessages[dateKey]) {
              groupedMessages[dateKey] = [];
            }
            groupedMessages[dateKey].push(msg);
          });
          setMessagesByDate(groupedMessages);

          await markMessagesAsRead();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const markMessagesAsRead = async () => {
      if (!activeConversation) return;

      try {
        await apiClient.put(`/message/read/${activeConversation._id}`, {
          userId: currentUser._id
        });

        setConversations((prevConversations) =>
          prevConversations.map((conv) => (conv._id === activeConversation._id ? { ...conv, unreadCount: 0 } : conv))
        );
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    };

    if (activeConversation) {
      fetchMessages();
    }
  }, [activeConversation, currentUser._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessageDateKey = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "TODAY";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "YESTERDAY";
    } else {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;

    const messageData = {
      conversationId: activeConversation._id,
      sender: currentUser._id,
      text: messageText
    };

    try {
      const response = await apiClient.post(`/message/sendMessage`, messageData);
      const newMessage = response.data.data;

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const dateKey = getMessageDateKey(new Date(newMessage.createdAt));
      setMessagesByDate((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newMessage]
      }));

      setConversations((prevConversations) => {
        return prevConversations.map((conv) => {
          if (conv._id === activeConversation._id) {
            return {
              ...conv,
              lastMessage: newMessage
            };
          }
          return conv;
        });
      });

      socket?.emit("sendMessage", newMessage);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setActiveChat(true);
    router.replace("/chat", undefined);
  };

  const formatMessageTime = (timestamp: string): string => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const getOtherParticipant = (conversation: Conversation | null): User | null => {
    if (!conversation || !conversation.participants) return null;
    return conversation.participants.find((p) => p._id !== currentUser._id) || conversation.participants[0];
  };

  const filteredConversations = conversations.filter((conv) => {
    const otherUser = getOtherParticipant(conv);
    return (
      otherUser &&
      ((otherUser.name && otherUser.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (otherUser.email && otherUser.email.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const getSortedDateKeys = (): string[] => {
    const keys = Object.keys(messagesByDate);
    const dateOrder: { [key: string]: number } = { TODAY: 1, YESTERDAY: 0 };
    return keys.sort((a, b) => {
      if (a in dateOrder && b in dateOrder) {
        return dateOrder[a] - dateOrder[b];
      } else if (a in dateOrder) {
        return 1;
      } else if (b in dateOrder) {
        return -1;
      } else {
        return new Date(a).getTime() - new Date(b).getTime();
      }
    });
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="flex h-[85vh] w-full items-center justify-center overflow-hidden">
        <div
          className={`hide-scrollbar flex h-full w-full flex-col border-r border-[#ECECEC] bg-white pt-6 sm:w-1/3 lg:w-1/4 ${
            activeChat ? "hidden sm:block" : "block"
          }`}
        >
          <div className="custom-scrollbar h-full overflow-y-auto">
            <div className="mx-4 mb-1 flex rounded-full border border-gray-300 bg-white px-3 py-2">
              <CiSearch className="text-3xl text-gray-500" />
              <input
                type="text"
                placeholder="Search People"
                className="w-full bg-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="px-4 py-3">
              <div className="mb-3 flex items-center gap-2">
                <p className="cursor-pointer rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-4 py-1 font-semibold whitespace-nowrap text-white">
                  All
                </p>
                <p className="rounded-full bg-[#F5F5F5] px-3 py-2.5 text-xs text-gray-700">
                  Unread Messages{" "}
                  <span className="ml-1 cursor-pointer rounded-full bg-gradient-to-r from-[#F5AF48] to-[#E32379] px-2 py-1 font-semibold whitespace-nowrap text-white">
                    {conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Image alt="tick" src="/twist-images/Frame (5).svg" width={18} height={18} className="object-contain" />
                <h2 className="text-sm text-[#7D7C7E]">
                  All Messages <span className="text-base text-black">({conversations.length})</span>
                </h2>
              </div>
            </div>

            <ul>
              {loading ? (
                <li className="p-4 text-center">Loading conversations...</li>
              ) : filteredConversations.length === 0 ? (
                <li className="p-4 text-center">No conversations found</li>
              ) : (
                filteredConversations.map((conversation) => {
                  const otherUser = getOtherParticipant(conversation);
                  const lastMsg = conversation.lastMessage;

                  return (
                    <li
                      key={conversation._id}
                      className={`mb-2 flex w-full cursor-pointer items-center justify-between bg-white p-2 hover:bg-[#E8F0FE] ${
                        activeConversation && activeConversation._id === conversation._id ? "bg-[#E8F0FE]" : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex w-full items-center">
                        <div className="relative mx-2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                          <Image
                            alt="avatar"
                            src={conversation.receiver?.profilePicture || "/fallback-avatar.png"}
                            fill
                            className="rounded-full object-cover"
                          />
                          <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-md sm:h-4 sm:w-4">
                            <Image
                              alt="tick"
                              src="/images/tickLoginIcon.png"
                              width={12}
                              height={12}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-base">
                            {otherUser && otherUser.name
                              ? otherUser.name.length > 20
                                ? otherUser.name.substring(0, 17) + "..."
                                : otherUser.name
                              : otherUser && otherUser.email
                                ? otherUser.email.length > 20
                                  ? otherUser.email.substring(0, 17) + "..."
                                  : otherUser.email
                                : "Unknown User"}
                          </p>
                          <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-sm">
                            {lastMsg && lastMsg.text
                              ? lastMsg.text.length > 25
                                ? lastMsg.text.substring(0, 22) + "..."
                                : lastMsg.text
                              : "No messages yet"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end px-2">
                          <p className="text-xs text-gray-500 sm:text-sm">
                            {lastMsg && lastMsg.createdAt ? formatMessageTime(lastMsg.createdAt) : ""}
                          </p>
                          {lastMsg && (
                            <BsCheck2All
                              className={`mt-1 text-xs sm:text-sm ${
                                lastMsg.isRead ? "text-blue-500" : "text-gray-400"
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>

        <div
          className={`flex h-full w-full flex-col overflow-hidden bg-white sm:w-2/3 ${
            activeChat ? "block" : "hidden sm:block"
          }`}
        >
          {activeConversation ? (
            <>
              <div className="border-b px-4 py-2">
                <button className="mb-2 text-blue-500 sm:hidden" onClick={() => setActiveChat(false)}>
                  <IoIosArrowBack />
                </button>
                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-center">
                    <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                      <Image
                        alt="avatar"
                        src={activeConversation.receiver?.profilePicture || "/fallback-avatar.png"}
                        fill
                        className="rounded-full object-cover"
                      />
                      <div className="absolute right-0 bottom-0 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-md sm:h-4 sm:w-4">
                        <Image
                          alt="tick"
                          src="/images/tickLoginIcon.png"
                          width={12}
                          height={12}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="ml-3 flex flex-col">
                      <p className="truncate text-sm font-semibold text-black sm:text-sm md:text-base lg:text-base">
                        {getOtherParticipant(activeConversation)?.name ||
                          getOtherParticipant(activeConversation)?.email ||
                          "Unknown User"}
                      </p>
                      <p className="truncate text-xs text-gray-500 sm:text-xs md:text-sm lg:text-sm">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded bg-gray-100 p-2">
                      <BsThreeDotsVertical className="text-lg text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hide-scrollbar relative flex-1 overflow-y-auto p-4">
                {getSortedDateKeys().map((dateKey) => (
                  <div key={dateKey}>
                    <div className="border-b py-2 text-center text-sm text-gray-400">{dateKey}</div>
                    <div className="flex flex-col space-y-3 py-2">
                      {messagesByDate[dateKey].map((msg) => (
                        <div
                          key={msg._id}
                          className={`flex items-start ${
                            msg.sender === currentUser._id ? "justify-end" : "justify-start"
                          }`}
                        >
                          {msg.sender !== currentUser._id && (
                            <Image
                              src={activeConversation.receiver?.profilePicture || "/fallback-avatar.png"}
                              width={32}
                              height={32}
                              alt="Avatar"
                              className="mr-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                            />
                          )}
                          <div
                            className={`max-w-xs rounded-lg px-3 py-2 shadow sm:max-w-sm md:max-w-md ${
                              msg.sender === currentUser._id
                                ? "rounded-br-none bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                                : "rounded-bl-none bg-[#F3F3F3] text-gray-800"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="mt-1 text-right text-xs text-gray-500">{formatMessageTime(msg.createdAt)}</p>
                          </div>
                          {msg.sender === currentUser._id && (
                            <Image
                              src={currentUser.profilePicture || "/fallback-avatar.png"}
                              width={32}
                              height={32}
                              alt="Avatar"
                              className="ml-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {activeConversation?.contractDetails && (
                  <div className="mx-auto w-full max-w-md rounded-lg bg-[#F7F7F8] px-4 py-3 shadow-md">
                    <p className="text-sm font-semibold text-gray-900">
                      {getOtherParticipant(activeConversation)?.name || "User"} do you want to be hired?
                    </p>
                    <p className="text-xs text-gray-500">
                      The term of this contract is for one year, commencing on 23 Sep, 2023 and ending on 23 Sep, 2024.
                    </p>
                    <p className="pt-2 text-sm text-gray-900">Your offer Included:</p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        <LuCircleDollarSign className="h-3 w-3 text-gray-900" />
                        <p className="text-xs font-bold text-gray-600">
                          Amount:{" "}
                          <span className="font-semibold text-gray-900">
                            ${activeConversation.contractDetails.amount}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-gray-600">
                          Duration:{" "}
                          <span className="font-semibold text-gray-900">
                            {activeConversation.contractDetails.duration}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-gray-600">
                          Service:{" "}
                          <span className="font-semibold text-gray-900">
                            {activeConversation.contractDetails.service}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 w-full border-b border-gray-200"></div>
                    <div className="flex w-full items-center justify-end gap-2 py-2">
                      <p className="text-left text-xs whitespace-nowrap text-black underline">View Contract Detail</p>
                      <div className="rounded-lg bg-[#D1FAE5] px-2 py-1 text-xs text-green-700">
                        {activeConversation.contractDetails.isAccepted ? "Contract Accepted" : "Pending"}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div>
                <MessageInputBox
                  messageText={messageText}
                  setMessageText={setMessageText}
                  handleSendMessage={handleSendMessage}
                />
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
