"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor";
import Select from "react-select";
import { categories } from "../../../../../data/categories";

interface OptionType {
  value: string;
  label: string;
}



const CreateService: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<OptionType | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<OptionType | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      subcategory: "",
      description: "",
      searchTags: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Service title is required"),
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Subcategory is required"),
      searchTags: Yup.string().required("At least one tag is required")
    }),
    onSubmit: async (values) => {
      const payload = {
        title: values.title,
        category: values.category,
        subcategory: values.subcategory,
        description: "Professional logo design for your business.",
        searchTags: values.searchTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      };

      try {
        setLoading(true);
        const response = await apiClient.post("/service/createService", payload);
        if (response.status === 200 || response.status === 201) {
          toast.success("Service created!");
          router.push(`/artist-side/service-creation/pricing-form/${response?.data?.data?._id}`);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to create service.");
      } finally {
        setLoading(false);
      }
    }
  });

  const handleMainCategoryChange = (option: OptionType | null) => {
    setSelectedMainCategory(option);
    formik.setFieldValue("category", option?.value || "");
    setSelectedSubCategory(null);
    formik.setFieldValue("subcategory", "");
  };

  const handleSubCategoryChange = (option: OptionType | null) => {
    setSelectedSubCategory(option);
    formik.setFieldValue("subcategory", option?.value || "");
  };

  const getSubCategories = (): OptionType[] => {
    if (!selectedMainCategory) return [];
    const category = categories.find((cat) => cat.name === selectedMainCategory.value);
    return category?.subcategories.map((sub) => ({ value: sub, label: sub })) || [];
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-sm font-medium text-gray-500">Create Service</h2>
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">Overview</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Service Title</label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="Enter Service Title..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-gray-700">Select Category</label>
              <Select
                options={categories.map((cat) => ({
                  value: cat.name,
                  label: cat.name
                }))}
                onChange={handleMainCategoryChange}
                value={selectedMainCategory}
                placeholder="Select Main Category"
              />
              {formik.touched.category && formik.errors.category && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Select Subcategory</label>
              <Select
                options={getSubCategories()}
                isDisabled={!selectedMainCategory}
                onChange={handleSubCategoryChange}
                value={selectedSubCategory}
                placeholder="Select Subcategory"
              />
              {formik.touched.subcategory && formik.errors.subcategory && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.subcategory}</p>
              )}
            </div>
          </div>

          {/* Search Tags */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Search Tags</label>
            <p className="text-sm text-gray-500">Enter comma-separated keywords to help people find your service.</p>
            <input
              type="text"
              name="searchTags"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.searchTags}
              placeholder="e.g. logo, branding, creative"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            {formik.touched.searchTags && formik.errors.searchTags && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.searchTags}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-6 py-2 text-white shadow-md hover:opacity-90 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save and Continue →"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateService;
