'use client'

import ArtistCard from "@/components/ui/ArtistCard";
import { useEffect, useState } from "react";
import { IArtist } from "../page";
import apiClient from "@/lib/interceptor";

const AllArtistsPage = () => {
  const [artists, setArtists] = useState<IArtist[]>([]);

  useEffect(() => {
    const getArtists = async () => {
        try {
          const response = await apiClient.get("/artist/getAllArtists");
          if (response?.status === 200) {
            setArtists(response.data.artists);
          }
        } catch (error) {
          console.error("Error fetching artists:", error);
        }
      };
      getArtists();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">All Artists</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
          <ArtistCard
            key={artist._id}
            id={artist._id}
            image={
              artist.profileImage ||
              artist?.user?.profilePicture ||
              "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
            }
            name={artist.fullname}
            profession={artist.username}
            location={artist.artistLocation}
            rating={4}
            reviews={120}
            skills={artist.skills || []}
          />
        ))}
      </div>
    </div>
  );
};

export default AllArtistsPage;
