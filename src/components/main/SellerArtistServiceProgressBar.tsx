"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const steps = [
  { id: 1, label: "Overview", path: "/artist-side/service-creation/overview"},
  { id: 2, label: "Pricing", path: "/artist-side/service-creation/pricing-form"},
  { id: 3, label: "Description", path: "/artist-side/service-creation/description"},
  { id: 4, label: "Upload Media", path: "/artist-side/service-creation/upload-media"},

];

const SellerArtistServicesProgressBar = () => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const newActiveStep = steps.findIndex((step) => step.path === pathname) + 1;
    setActiveStep(newActiveStep);
  }, [pathname]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-between rounded-lg px-4 py-4 sm:px-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-2">
            {/* Step Number */}
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${activeStep >= step.id ? "bg-gray-800" : "bg-gray-300"} `}
            >
              {step.id}
            </div>

            {/* Step Label (Hidden on Small Screens) */}
            <p
              className={`hidden text-sm font-medium lg:block ${activeStep >= step.id ? "text-black" : "text-gray-400"}`}
            >
              {step.label}
            </p>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`h-1 w-8 sm:w-16 md:w-24 ${activeStep > step.id ? "bg-gray-800" : "bg-gray-300"}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerArtistServicesProgressBar;
