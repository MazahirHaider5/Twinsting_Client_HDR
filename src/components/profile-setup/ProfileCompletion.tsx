"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import apiClient from "@/lib/interceptor";

const BasicInformation = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      artistLocation: "",
      aboutArtist: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9\s\-_.]*$/, "Full Name must start with a letter and contain valid characters")
        .required("Full Name is required"),
      username: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9\s\-_.]*$/, "Username must start with a letter and contain valid characters")
        .required("Username is required"),
      artistLocation: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9\s\-_.]*$/, "Location must start with a letter and contain valid characters")
        .required("Location is required"),
      aboutArtist: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9\s\-_.]*$/, "Description must start with a letter and contain valid characters")
        .required("Description is required")
    }),

    onSubmit: async (values) => {
      // router.push("/profile-setup/corporate-subscriptions");
      if (!selectedImage) {
        setImageError("Profile image is required");
        return;
      } else {
        setImageError(null);
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.fullname);
        formData.append("username", values.username);
        formData.append("location", values.artistLocation);
        formData.append("profileDescription", values.aboutArtist);
        formData.append("profilePicture", selectedImage);

        const response = await apiClient.patch("/user/basic-info", formData);
        if (response?.status === 201 || response?.status === 200) {
          toast.success(response?.data?.message);
          router.push("/profile-setup/corporate-subscriptions");
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
                    <label className="font-medium">Company Name</label>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter Name..."
                      className="mt-3 h-12 w-full rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2 placeholder-gray-600"
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
                      className="mt-3 h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 placeholder-gray-600"
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
                    className="mt-3 h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 placeholder-gray-600"
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
              <div className="flex w-full flex-col md:w-1/3">
                <label className="mb-1 font-medium">Upload Profile Image</label>
                <div className="relative mt-2 flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#F478AF] bg-[#FEF6FA]">
                  {imagePreview ? (
                    <div className="relative h-40 w-40">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setSelectedImage(null);
                      }}
                      className="absolute -top-2 -right-2 z-20 rounded-full bg-white text-red-500 hover:text-red-700"
                    >
                      <AiOutlineCloseCircle size={24} />
                    </button>
                  </div>
                  
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center">
                      <div className="rounded-full">
                        <svg width="61" height="60" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20.5" cy="20" r="20" fill="#F2EBFB" />
                          <g clip-path="url(#clip0_157_17470)">
                            <path
                              d="M22.1667 12.5V15.8333C22.1667 16.0543 22.2545 16.2663 22.4108 16.4226C22.5671 16.5789 22.7791 16.6667 23.0001 16.6667H26.3334"
                              stroke="url(#paint0_linear_157_17470)"
                              stroke-width="1.375"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M24.6667 27.5H16.3334C15.8914 27.5 15.4675 27.3244 15.1549 27.0118C14.8423 26.6993 14.6667 26.2754 14.6667 25.8333V14.1667C14.6667 13.7246 14.8423 13.3007 15.1549 12.9882C15.4675 12.6756 15.8914 12.5 16.3334 12.5H22.1667L26.3334 16.6667V25.8333C26.3334 26.2754 26.1578 26.6993 25.8453 27.0118C25.5327 27.3244 25.1088 27.5 24.6667 27.5Z"
                              stroke="url(#paint1_linear_157_17470)"
                              stroke-width="1.375"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M20.5 19.1667V24.1667"
                              stroke="url(#paint2_linear_157_17470)"
                              stroke-width="1.375"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M18.4167 21.2501L20.5001 19.1667L22.5834 21.2501"
                              stroke="url(#paint3_linear_157_17470)"
                              stroke-width="1.375"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_157_17470"
                              x1="22.1667"
                              y1="12.5"
                              x2="26.3334"
                              y2="16.6667"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#F5AF48" />
                              <stop offset="0.0021" stop-color="#F5AF48" />
                              <stop offset="1" stop-color="#E32379" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_157_17470"
                              x1="14.6667"
                              y1="12.5"
                              x2="29.2052"
                              y2="23.8077"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#F5AF48" />
                              <stop offset="0.0021" stop-color="#F5AF48" />
                              <stop offset="1" stop-color="#E32379" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_157_17470"
                              x1="20.5"
                              y1="19.1667"
                              x2="22.4231"
                              y2="19.5514"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#F5AF48" />
                              <stop offset="0.0021" stop-color="#F5AF48" />
                              <stop offset="1" stop-color="#E32379" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_157_17470"
                              x1="18.4167"
                              y1="19.1667"
                              x2="20.0834"
                              y2="22.5001"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#F5AF48" />
                              <stop offset="0.0021" stop-color="#F5AF48" />
                              <stop offset="1" stop-color="#E32379" />
                            </linearGradient>
                            <clipPath id="clip0_157_17470">
                              <rect width="20" height="20" fill="white" transform="translate(10.5 10)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className="mt-3 text-sm font-bold text-black">Upload Image</span>
                    </label>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    onChange={handleImageChange}
                  />
                </div>
                {imageError && <p className="mt-2 text-sm text-red-500">{imageError}</p>}
              </div>
            </div>

            {/* Text Area */}
            <div className="mt-10 w-full">
              <label className="mb-4 font-semibold text-black">Tell Us About Yourself?</label>
              <textarea
                name="aboutArtist"
                placeholder="Describe Yourself.."
                className="mt-2 h-32 w-full resize-none rounded-lg border-2 border-gray-200 bg-gray-100 p-3 placeholder-gray-600 md:h-48"
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
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-bg flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-white"
                >
                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      Save and Continue
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.8333 10L4.16658 10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8333 15L15.8333 10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8333 5L15.8333 10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
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
