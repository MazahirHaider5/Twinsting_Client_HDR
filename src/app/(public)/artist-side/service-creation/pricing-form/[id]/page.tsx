"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface PackageData {
  name: string;
  description: string;
  price: string;
}

const PricingForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      Starter: { name: "", description: "", price: "" },
      Standard: { name: "", description: "", price: "" },
      Advanced: { name: "", description: "", price: "" }
    },
    validationSchema: Yup.object({
      Starter: Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().typeError("Must be a number").required("Price is required")
      }),
      Standard: Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().typeError("Must be a number").required("Price is required")
      }),
      Advanced: Yup.object({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().typeError("Must be a number").required("Price is required")
      })
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await apiClient.patch(`/service/pricing/${id}`, values);
        if (response.status === 200 || response.status === 201) {
          toast.success("Pricing submitted successfully!");
          router.push(`/artist-side/service-creation/description/${id}`);
        }
      } catch (error) {
        console.error("Error submitting pricing data:", error);
      } finally {
        setLoading(false);
      }
    }
  });
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const renderInput = (tier: keyof typeof formik.values, field: keyof PackageData, mobile?: boolean) => {
    const error = formik.touched?.[tier]?.[field] && formik.errors?.[tier]?.[field];
    return (
      <div className={mobile ? "mb-2" : ""}>
        <input
          type={field === "price" ? "number" : "text"}
          placeholder={`Enter ${field}...`}
          className="w-full rounded border p-2"
          value={formik.values[tier][field]}
          onChange={(e) => formik.setFieldValue(`${tier}.${field}`, e.target.value)}
          onBlur={formik.handleBlur}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <section className="px-4 md:px-0">
      <div className="mx-auto mt-5">
        <h2 className="text-center text-lg font-medium text-[#6E6E70]">Create Service</h2>
        <h1 className="mt-1 text-center text-2xl font-bold">Pricing</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col bg-gray-50 p-4 md:p-6">
        <div className="w-full max-w-7xl rounded-xl bg-white p-4 shadow-lg md:p-6">
          <h3 className="text-2xl font-semibold">Packages</h3>

          {/* Desktop View */}
          <div className="mt-4 hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  {Object.keys(formik.values).map((tier) => (
                    <th key={tier} className="p-3">
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["name", "description", "price"].map((field) => (
                  <tr key={field}>
                    {Object.keys(formik.values).map((tier) => (
                      <td key={tier} className="p-3">
                        {renderInput(tier as keyof typeof formik.values, field as keyof PackageData)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="mt-4 space-y-4 md:hidden">
            {Object.keys(formik.values).map((tier) => (
              <div key={tier} className="rounded-lg bg-gray-100 p-4 shadow-sm">
                <h4 className="mb-2 text-lg font-semibold">{tier}</h4>
                {["name", "description", "price"].map((field) =>
                  renderInput(tier as keyof typeof formik.values, field as keyof PackageData, true)
                )}
              </div>
            ))}
          </div>
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

export default PricingForm;
