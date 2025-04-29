"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const Description: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const formik = useFormik({
    initialValues: {
      description: ""
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await apiClient.patch(`/service/description/${id}`, {
          description: values.description
        });

        if (response.status === 200 || response.status === 201) {
          toast.success("Description submitted successfully!");
          router.push(`/artist-side/service-creation/upload-media/${id}`);
        }
      } catch (error) {
        console.error("Error submitting description:", error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <section className="px-4 md:px-0">
      <div className="mx-auto mt-5">
        <h2 className="text-center text-lg font-medium text-[#6E6E70]">Create Service</h2>
        <h1 className="mt-1 text-center text-3xl font-semibold">Description</h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto mt-6 w-full max-w-5xl px-2 md:mt-8 md:px-0">
          <label className="mb-2 block text-sm font-bold text-gray-800 md:text-lg lg:text-xl xl:text-2xl">
            Briefly Describe Your Service
          </label>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 md:p-4">
            <textarea
              className="h-32 w-full resize-none border-none bg-transparent p-3 text-gray-700 placeholder-gray-400 outline-none md:h-44"
              placeholder="Enter Brief Of The Service..."
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.description && formik.errors.description && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 mb-6 flex w-full justify-center gap-5 md:mt-12">
          {/* <button type="button" className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">
            Preview
          </button> */}
          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 text-white"
          >
            {loading ? "Saving..." : "Save and Continue →"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Description;
