"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const steps = [
  { id: 1, label: "Profile Completion", path: "/profile-setup/profile-completion" },
  { id: 2, label: "Corporate Subscriptions", path: "/profile-setup/corporate-subscriptions" },
  { id: 3, label: "Interest", path: "/profile-setup/interest" }
];

const ProgressBarProfileSetup = () => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState(1);
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const newActiveStep = steps.findIndex((step) => pathname.includes(step.path)) + 1;
    setActiveStep(newActiveStep > 0 ? newActiveStep : 1);
  }, [pathname]);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-4xl items-center justify-between rounded-lg px-2 py-4 sm:px-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step indicator with number and label */}
            <div className="flex items-center gap-x-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold sm:h-8 sm:w-8 sm:text-base ${
                  activeStep >= step.id ? "gradient-bg text-white" : "bg-gray-200/70"
                }`}
              >
                {step.id}
              </div>

              {/* Step Label (Small on mobile, normal on larger screens) */}
              <p
                className={`mt-1 hidden text-center text-xs font-medium sm:text-sm lg:block text-black`}
              >
                {screenWidth <= 1024 ? step.label.split(" ")[0] : step.label}
              </p>
            </div>

            {/* Connector Lines */}
            {index < steps.length - 1 && (
              <div className="mx-1 flex flex-1 justify-center sm:mx-3 md:mx-4 lg:mx-6">
                {/* Special rendering between Step 2 and 3 */}
                {step.id === 2 ? (
                  <div className="hidden w-full items-center justify-center lg:block">
                    {activeStep > 1 ? (
                      <div className="flex w-full max-w-24 justify-center space-x-1 sm:max-w-40">
                        <div className="gradient-bg h-1 w-5 rounded-full sm:w-12 md:w-20"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-5 md:w-8"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-5 md:w-8"></div>
                      </div>
                    ) : (
                      <div className="flex w-full max-w-24 justify-center space-x-1 sm:max-w-40">
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-4 md:w-6"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-4 md:w-6"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-4 md:w-6"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-4 md:w-6"></div>
                        <div className="h-1 w-2 rounded-full bg-gray-300 sm:w-4 md:w-6"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Default line rendering between other steps
                  <div className="hidden w-full items-center justify-center lg:block">
                    <div className="flex w-full max-w-24 justify-center space-x-1 sm:max-w-40">
                      <div
                        className={`h-1 w-5 rounded-full sm:w-10 md:w-14 ${
                          activeStep === step.id ? "gradient-bg" : "bg-gray-300"
                        }`}
                      ></div>
                      <div className="h-1 w-3 rounded-full bg-gray-300 sm:w-7 md:w-10"></div>
                      <div className="h-1 w-3 rounded-full bg-gray-300 sm:w-7 md:w-10"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarProfileSetup;
