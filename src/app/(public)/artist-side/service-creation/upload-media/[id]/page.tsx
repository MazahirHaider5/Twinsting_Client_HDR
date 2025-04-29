"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaPhotoVideo } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import apiClient from "@/lib/interceptor";
import toast from "react-hot-toast";

const UploadImage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const [showconfirmationbox, setshowconfirmationbox] = useState(false);

  const [images, setImages] = useState<(string | null)[]>([null, null]); // for preview
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null]); // actual files

  const [videos, setVideos] = useState<(string | null)[]>([null, null]); // for preview
  const [videoFiles, setVideoFiles] = useState<(File | null)[]>([null, null, null, null, null]); // actual files

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = imageUrl;
        return newImages;
      });
      setImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = file;
        return newFiles;
      });
    }
  };

  // Handle Video Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideos((prev) => {
        const newVideos = [...prev];
        newVideos[index] = videoUrl;
        return newVideos;
      });
      setVideoFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = file;
        return newFiles;
      });
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    // setshowconfirmationbox(true);

    // Validation: ensure 2 images and 5 videos are selected
    const selectedImages = imageFiles.filter((file) => file !== null);
    const selectedVideos = videoFiles.filter((file) => file !== null);

    if (selectedImages.length !== 2) {
      toast.error("Please select exactly 2 images.");
      return;
    }

    if (selectedVideos.length !== 2) {
      toast.error("Please select exactly 2 videos.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      selectedImages.forEach((file) => {
        if (file) formData.append("media", file);
      });

      selectedVideos.forEach((file) => {
        if (file) formData.append("media", file);
      });

      const response = await apiClient.patch(`/service/media/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("pakistn", response);
      if (response.status === 200 || response.status === 201) {
        setshowconfirmationbox(true);
        toast.success("Media submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting description:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-0">
      <div className="mx-auto mt-5">
        <h2 className="text-center text-lg font-medium text-[#6E6E70]">Create Service</h2>
        <h1 className="mt-1 text-center text-3xl font-semibold">Upload Media</h1>
      </div>

      <div className="mx-auto mt-8 w-full max-w-4xl px-2 md:px-0">
        <h2 className="text-xl font-semibold text-gray-900">Showcase Your Services In A Media Gallery</h2>
        <p className="text-sm text-gray-500">
          Encourage companies to choose your services by featuring a variety of your work.
        </p>

        {/* Image Upload */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-800">Images (up to 2)</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:gap-5">
            {images.map((img, i) => (
              <label
                key={i}
                className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-pink-400 bg-gray-100 text-center text-sm text-gray-600 sm:w-40"
              >
                {img ? (
                  <Image
                    src={img}
                    alt={`Uploaded ${i}`}
                    width={160}
                    height={144}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <FaPhotoVideo className="text-2xl text-pink-500" />
                    <p>Drag & Drop A Photo</p>
                    <span className="text-xs text-pink-500">Browse</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, i)} />
              </label>
            ))}
          </div>
        </div>

        {/* Video Upload */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-800">Video (up to 2)</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
            {videos.map((vid, i) => (
              <label
                key={i}
                className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-pink-400 bg-gray-100 text-center text-sm text-gray-600 sm:w-40"
              >
                {vid ? (
                  <video src={vid} controls className="h-full w-full object-cover" />
                ) : (
                  <>
                    <MdOutlineVideoLibrary className="text-2xl text-pink-500" />
                    <p>Drag & Drop A Video</p>
                    <span className="text-xs text-pink-500">Browse</span>
                  </>
                )}
                <input type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, i)} />
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-lg bg-white p-4 shadow-lg md:mt-52 md:max-w-5xl md:flex-row">
          {/* <button className="w-full rounded-full bg-gray-200 px-6 py-2 text-gray-700 md:w-auto">Preview</button> */}
          <button
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-2 text-white md:w-auto"
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save and Continue →"}
          </button>
        </div>
      </div>

      {/* Confirmation Box */}
      {showconfirmationbox && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg sm:max-w-lg md:w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setshowconfirmationbox(false)}
            >
              <AiOutlineClose className="text-lg" />
            </button>
            <div className="flex justify-center">
              <BsCheckCircle className="text-4xl text-green-500" />
            </div>
            <h2 className="mt-2 text-lg font-semibold">Great! Your service is now listed</h2>
            <p className="mt-1 text-sm text-gray-500">We&apos;ll review it for quality and activate it soon.</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => router.push(`/`)}
                className="w-full rounded-lg bg-gray-100 py-2 text-gray-700 hover:bg-gray-200"
              >
                Back home
              </button>
              <button
                onClick={() => router.push(`/artist-side/service-creation/overview`)}
                className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 py-2 text-white"
              >
                Add New Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadImage;
