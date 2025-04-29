"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const steps = [
  { id: 1, label: "Profile Completion", path: "/profile/profile-complition" },
  { id: 2, label: "My Skills", path: "/profile/my-skills" },
  { id: 3, label: "Availability", path: "/profile/Availability" },
  { id: 4, label: "Upload Media", path: "/profile/upload-media" }
];

const ProfileCompletion: React.FC = () => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const newActiveStep = steps.findIndex((step) => step.path === pathname) + 1;
    setActiveStep(newActiveStep);
  }, [pathname]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <section className="bg-gray-100 px-4 py-8 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-5xl flex-wrap items-center justify-between rounded-lg px-4 py-4 sm:px-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${activeStep >= step.id ? "bg-gray-800" : "bg-gray-300"}`}
              >
                {step.id}
              </div>
              <p
                className={`hidden text-sm font-medium lg:block ${activeStep >= step.id ? "text-black" : "text-gray-400"}`}
              >
                {step.label}
              </p>
              {index < steps.length - 1 && (
                <div className={`h-1 w-8 sm:w-16 md:w-24 ${activeStep > step.id ? "bg-gray-800" : "bg-gray-300"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* Information-section */}
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className='flex flex-col items-center'>
          <h2 className="text-lg font-medium text-[#6E6E70]">Profile Completion</h2>
          <h1 className="text-2xl font-bold mt-1">Basic Information</h1>
        </div>

        {/* Main Form Container */}
        <div className="p-6 md:p-8 w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name..."
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-medium">Username</label>
                  <input
                    type="text"
                    placeholder="Enter Username..."
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="font-medium">Location</label>
                <input
                  type="text"
                  placeholder="Enter Your Location..."
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center">
              <label className="font-medium">Upload Profile Image</label>
              <div className="w-full h-44 border-2 border-dashed border-purple-300 flex items-center justify-center rounded-lg cursor-pointer mt-2">
                <label className="flex flex-col items-center">
                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      width={96}
                      height={96}
                      className="bg-gray-200 w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/images/imageupload.png"
                      alt="Upload"
                      width={36}
                      height={36}
                      className="bg-gray-200 w-9 h-9 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-500 font-bold mt-1">
                    Upload Image
                  </span>
                </label>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="text-xl font-semibold text-[#6E6E70]">
              Tell Us About Yourself
            </label>
            <textarea
              placeholder="Describe Yourself.."
              className="w-full mt-2 p-3 bg-gray-100 rounded-lg h-32 md:h-48 focus:ring focus:ring-pink-300 resize-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 mb-6 md:mt-12 md:py-4 md:px-6">
        <div className="w-full max-w-lg mx-auto flex justify-center gap-5">
          <button className="px-6 py-2 bg-gray-200  text-gray-700">
            Preview
          </button>
          <button className="px-4 py-2 bg-gradient-to-r rounded-lg from-[#F5AF48] via-[#E32379] to-[#E32379] text-white">
            Save and Continue →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileCompletion;
