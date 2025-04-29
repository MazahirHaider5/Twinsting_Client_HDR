"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import apiClient from "@/lib/interceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const BasicInformation = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      artistLocation: "",
      aboutArtist: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full Name is required"),
      username: Yup.string().required("Username is required"),
      artistLocation: Yup.string().required("Location is required"),
      aboutArtist: Yup.string().required("Description is required")
    }),
    onSubmit: async (values) => {
      if (!selectedImage) {
        toast.error("Profile image is required");
        return;
      }
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("fullname", values.fullname);
        formData.append("username", values.username);
        formData.append("artistLocation", values.artistLocation);
        formData.append("aboutArtist", values.aboutArtist);
        formData.append("profileImage", selectedImage);

        const response = await apiClient.post("/artist/artistBasicInfo", formData);
        if (response?.status === 201 || response?.status === 200) {
          toast.success(response?.data?.message);
          router.push("/artist-side/profile-setup/my-skills");
        }
      } catch (error) {
        console.error("Submit error:", error);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center p-4">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-medium text-[#6E6E70]">Profile Completion</h2>
            <h1 className="mt-1 text-2xl font-bold">Basic Information</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="w-full p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Form Fields */}
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-medium">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter Name..."
                      className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullname}
                    />
                    {formik.touched.fullname && formik.errors.fullname && (
                      <p className="text-sm text-red-500">{formik.errors.fullname}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-medium">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username..."
                      className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <p className="text-sm text-red-500">{formik.errors.username}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="font-medium">Location</label>
                  <input
                    type="text"
                    name="artistLocation"
                    placeholder="Enter Your Location..."
                    className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.artistLocation}
                  />
                  {formik.touched.artistLocation && formik.errors.artistLocation && (
                    <p className="text-sm text-red-500">{formik.errors.artistLocation}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="flex w-full flex-col items-center md:w-1/3">
                <label className="font-medium">Upload Profile Image</label>
                <div className="relative mt-2 flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-purple-300">
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={160}
                        height={160}
                        className="rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                        }}
                        className="absolute -top-2 -right-2 rounded-full bg-white text-red-500 hover:text-red-700"
                      >
                        <AiOutlineCloseCircle size={24} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center">
                      <div className="rounded-full">
                        <Image
                          src="/images/UploadImage.png"
                          alt="Upload"
                          width={0}
                          height={0}
                          className="h-9 w-9 rounded-full bg-gray-200"
                        />
                      </div>
                      <span className="mt-1 text-sm font-bold text-gray-500">Upload Image</span>
                    </label>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div className="mt-6 w-full">
              <label className="text-xl font-semibold text-[#6E6E70]">Tell Us About Yourself</label>
              <textarea
                name="aboutArtist"
                placeholder="Describe Yourself.."
                className="mt-2 h-32 w-full resize-none rounded-lg bg-gray-100 p-3 focus:ring focus:ring-pink-300 md:h-48"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.aboutArtist}
              />
              {formik.touched.aboutArtist && formik.errors.aboutArtist && (
                <p className="text-sm text-red-500">{formik.errors.aboutArtist}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 mb-6 w-full md:mt-36 md:px-6 md:py-4">
              <div className="mx-auto flex w-full max-w-lg justify-center gap-5">
                {/* <button type="button" className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">
                  Preview
                </button> */}
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 text-white"
                >
                  {loading ? "Saving..." : "Save and Continue →"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BasicInformation;
