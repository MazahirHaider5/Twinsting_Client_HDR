"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Define a type for the availability object
type Availability = {
  from: string;
  to: string;
};

const AvailabilityForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const formik = useFormik({
    initialValues: {
      availability: days.reduce(
        (acc, day) => {
          acc[day.toLowerCase()] = { from: "", to: "" };
          return acc;
        },
        {} as Record<string, { from: string; to: string }>
      )
    },
    validationSchema: Yup.object({
      availability: Yup.object(
        days.reduce((acc, day) => {
          acc[day.toLowerCase()] = Yup.object({
            from: Yup.string()
              .required("Required")
              .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
            to: Yup.string()
              .required("Required")
              .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
          }) as Yup.ObjectSchema<Availability>;
          return acc;
        }, {} as Record<string, Yup.ObjectSchema<Availability>>)
      )
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await apiClient.post("/artist/artistAvailability", values);
        if (res.status === 200 || res.status === 201) {
          toast.success("Availability saved!");
          router.push("/artist-side/profile-setup/subscription");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex min-h-screen flex-col items-center justify-center bg-[#FFFFFF] px-4"
    >
      <h2 className="text-center font-semibold text-gray-700">Profile Completion</h2>
      <h1 className="mb-4 text-center text-2xl font-bold">Availability</h1>

      <div className="w-full max-w-lg rounded-lg bg-gray-100 p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 md:grid-cols-4">
          <div className="col-span-2 font-semibold md:col-span-2">Days</div>
          <div className="font-semibold">Start Time</div>
          <div className="font-semibold">End Time</div>

          {days.map((day, index) => {
            const dayKey = day.toLowerCase();
            return (
              <React.Fragment key={index}>
                <div className="col-span-2 rounded-lg bg-[#FFFFFF] p-3 py-4 font-bold">{day}</div>
                <input
                  type="text"
                  name={`availability.${dayKey}.from`}
                  placeholder="HH:MM"
                  className="w-full rounded bg-[#FFFFFF] px-2 py-1 text-center"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.availability[dayKey].from}
                />
                <input
                  type="text"
                  name={`availability.${dayKey}.to`}
                  placeholder="HH:MM"
                  className="w-full rounded bg-[#FFFFFF] px-2 py-1 text-center"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.availability[dayKey].to}
                />
                {(formik.touched.availability?.[dayKey]?.from && formik.errors.availability?.[dayKey]?.from) ||
                (formik.touched.availability?.[dayKey]?.to && formik.errors.availability?.[dayKey]?.to) ? (
                  <div className="col-span-4 text-left text-xs text-red-500">
                    {formik.errors.availability?.[dayKey]?.from || formik.errors.availability?.[dayKey]?.to}
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex w-full max-w-lg flex-wrap justify-around rounded-lg bg-white p-4 shadow-lg">
        {/* <button type="button" className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">
          Preview
        </button> */}
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-2 text-white"
        >
          {loading ? "Saving..." : "Save and Continue →"}
        </button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
