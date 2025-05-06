"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import TabMenu from "@/components/main/artists/TabMenu";
import AboutMe from "@/components/main/artists/AboutMe";
import WorkPhotos from "@/components/main/artists/WorkPhotos";
import Reviews from "@/components/main/artists/Reviews";
import SkillsExperience from "@/components/main/artists/SkillsExperience";
import { useSearchParams } from "next/navigation";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import apiClient from "@/lib/interceptor";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
interface Artist {
  _id: string;
  fullname: string;
  profileImage: string;
  username: string;
  aboutArtist: string;
  artistLocation: string;
  skills: string[];
  user: { profilePicture: string , _id: string};
}

const ArtistProfileDetails = () => {
  const searchParams = useSearchParams();
  const artistId = searchParams?.get("artistId");
  console.log("This is userId from params", artistId);
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const handleMessageClick = async () => {
    if (!user?._id || !artistId) return;
    console.log("This is sender and reciever IDs",user?._id , artist?.user._id) ;
    

    try {
      const response = await apiClient.post("/conversation/createOrGetExisConv", {
        senderId: user._id,
        receiverId: artist?.user._id
      });

      const { success, data } = response.data;

      if (success && data._id) {
        router.push(`/chat?conversationId=${data._id}&senderId=${user._id}`);
      } else {
        console.error("Failed to get or create conversation.");
      }
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Skills & Experience");

  useEffect(() => {
    if (!artistId) return;
    const fetchArtist = async () => {
      try {
        const res = await apiClient.get(`/artist/getArtistById/${artistId}`);

        const data = res.data;
        console.log("This is response", data);

        if (data.success) {
          setArtist(data.artist);
        }
      } catch (err) {
        console.error("Failed to fetch artist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Artist not found.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-row p-4">
      <div className="mx-auto w-[70%] max-w-6xl">
        <p className="mt-4 px-4 text-sm text-gray-500 sm:px-8">
          Home / Artist Detail / <span className="text-sm text-black">{artist.fullname}</span>
        </p>
        <div className="relative mx-4 mt-2 sm:mx-8">
          <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-40 md:h-48 lg:h-56 xl:h-64">
            <Image
              src="/images/ArtistCoverPhoto.png"
              alt="Cover Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-[-15%] left-4 aspect-square size-16 overflow-hidden rounded-full border-4 border-white sm:size-20 md:size-24 lg:size-28 xl:size-32">
            <Image
              src={artist.profileImage}
              alt="Profile Picture"
              width={200}
              height={200}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col px-4 sm:px-8">
          <div className="flex items-center">
            <p className="text-lg font-semibold sm:text-xl">{artist.fullname}</p>
            <Image alt="verified" src="/images/verifiedbadge.png" width={20} height={20} className="ml-2" />
          </div>
          <p className="mt-1 flex items-center text-gray-600">
            <GoLocation className="mr-1" />
            {artist.artistLocation}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 px-4 py-2 sm:px-8">
          <div className="rounded-full bg-[#FFF0CB] px-4 py-2 text-sm text-[#BD8C11]">Top Rated</div>
          <div className="rounded-full bg-[#D0FFD4] px-4 py-2 text-sm text-[#01AD10]">Top Rated</div>
        </div>

        <TabMenu onTabChange={setActiveTab} />
        <div className="mt-4 px-2 text-sm md:px-4 lg:px-10">
          <div className="mx-auto w-full text-left text-xs sm:text-center sm:text-base md:w-4/5 md:text-left md:text-lg lg:w-3/4 lg:text-xl 2xl:text-2xl">
            {activeTab === "Skills & Experience" && (
              <SkillsExperience
                artist={{
                  name: artist.fullname,
                  profession: "Not provided",
                  location: artist.artistLocation,
                  image: artist.profileImage,
                  skills: artist.skills,
                  about: artist.aboutArtist,
                  media: []
                }}
              />
            )}

            {activeTab === "About me" && <AboutMe about={artist.aboutArtist} />}
            {activeTab === "Work Photos" && <WorkPhotos />}
            {activeTab === "Reviews" && <Reviews />}
          </div>
        </div>
      </div>

      <div className="my-12 flex w-[30%] flex-col items-center">
        <div className="flex w-full max-w-sm items-center justify-between rounded-lg border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12 rounded-full border-2 border-dashed border-pink-500">
              <Image
                src={artist.profileImage || "/images/profile.png"}
                alt="User"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <p className="font-semibold">{artist.username}</p>
                <IoMdCheckmarkCircle className="text-lg text-green-500" />
              </div>
              <p className="text-xs text-gray-500">Last seen recently</p>
            </div>
          </div>
          <button className="text-xl text-gray-500 hover:text-gray-700">❤️</button>
        </div>

        <div className="mt-4 flex w-full max-w-sm justify-between">
          <button
            onClick={handleMessageClick}
            className="flex items-center justify-center gap-2 rounded-full bg-gray-100 px-6 py-2 font-medium text-gray-700 cursor-pointer"
          >
            <Image src="/images/message.png" alt="" width={20} height={20} />
            <p>Message</p>
          </button>

          <button className="ml-3 flex-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-2 font-medium text-white">
            Confirm
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center space-x-3">
          <p className="text-sm text-gray-500">Share:</p>
          <FaFacebookF className="cursor-pointer text-blue-500" />
          <FaInstagram className="cursor-pointer text-pink-500" />
          <FaTwitter className="cursor-pointer text-blue-400" />
        </div>

        <div className="flex justify-center">
          <button className="mt-3 flex items-center space-x-1 text-center text-sm font-bold text-gray-900 hover:text-red-500">
            🚩 Report the account
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtistProfileDetails;
