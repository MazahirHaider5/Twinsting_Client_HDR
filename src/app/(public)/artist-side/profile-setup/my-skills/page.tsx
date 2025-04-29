"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor"; // assuming you're using a central axios instance
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function SkillsForm() {
  const [loading, setLoading] = useState(false);
  const skills: string[] = [
    "Dancing",
    "Acting",
    "Singing",
    "Hosting",
    "Modeling",
    "DJ",
    "Live Band",
    "Instrumentalist",
    "Comedian",
    "Magician",
    "Anchor",
    "Voice Over Artist",
    "Mimicry Artist",
    "Beatboxer",
    "Rapper",
    "Choreographer",
    "Stunt Performer",
    "Background Dancer",
    "Street Performer"
  ];

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user?._id && !user?.email) {
      router.push("/signin");
    }
  }, [user, router]);
  const formik = useFormik({
    initialValues: {
      skills: [] as string[]
    },
    validationSchema: Yup.object({
      skills: Yup.array().min(1, "Please select at least one skill")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await apiClient.post("/artist/artistSkills", values);
        if (response.status === 200 || response.status === 201) {
          toast.success("Skills saved!");
          router.push("/artist-side/profile-setup/availability");
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  });

  const toggleSkill = (skill: string) => {
    let updatedSkills: string[];
    if (selectedSkills.includes(skill)) {
      updatedSkills = selectedSkills.filter((s) => s !== skill);
    } else {
      updatedSkills = [...selectedSkills, skill];
    }

    setSelectedSkills(updatedSkills);
    formik.setFieldValue("skills", updatedSkills);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <h2 className="text-[16px] text-[#6E6E70]">Profile Completion</h2>
      <h1 className="my-2 text-2xl font-bold text-gray-800">My Skills</h1>

      <div className="mt-10 w-full max-w-xl bg-white p-6 text-center">
        {/* <div className="flex w-full max-w-sm items-center bg-white">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search to add a skill"
              className="w-full border-none bg-transparent p-2 px-4 text-sm font-semibold text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <button type="button" className="rounded-md bg-gradient-to-r from-pink-500 to-orange-400 p-2 text-white">
              <FiSearch className="h-8 w-8" />
            </button>
          </div>
        </div> */}

        <div className="mt-8 w-full justify-items-start font-semibold">
          <p className="m-4 text-sm text-gray-600">Suggested Skills</p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, index: number) => (
              <button
                type="button"
                key={index}
                onClick={() => toggleSkill(skill)}
                className={`mt-2 cursor-pointer rounded-full px-4 py-2 ${
                  selectedSkills.includes(skill)
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {formik.errors.skills && formik.touched.skills && (
            <div className="mt-2 text-sm text-red-500">{formik.errors.skills}</div>
          )}
        </div>
      </div>

      <div className="fixed bottom-2 mb-44 flex w-full max-w-md justify-around p-4 sm:mb-28">
        {/* <button type="button" className="rounded-full bg-gray-200 px-6 py-2 text-gray-700">
          Preview
        </button> */}
        <button
          disabled={loading}
          type="submit"
          className="cursor-pointer rounded-md bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-2 text-white"
        >
          {loading ? "Saving..." : "Save and Continue →"}
        </button>
      </div>
    </form>
  );
}
