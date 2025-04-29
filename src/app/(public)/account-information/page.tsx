import React from "react";
import Image from "next/image";

// Data for profile information
const profileData = [
  {
    icon: "/account-information/user.svg",
    label: "Name",
    value: "Nico Robin",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/location.svg",
    label: "Address",
    value: "PK",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/call.svg",
    label: "Phone Number",
    value: "+92",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/buildings-2.svg",
    label: "Company",
    value: "Not Provided",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/additional.svg",
    label: "Additional Details",
    value: "Not Provided",
    svgIcon: "/account-information/arrow.svg"
  }
];

// Data for account settings
const accountData = [
  {
    icon: "/account-information/user-2.svg",
    label: "Email Address",
    value: "domenica646@gmail.com",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/lock.svg",
    label: "Add Password",
    value: "Not Provided",
    svgIcon: "/account-information/arrow.svg"
  },
  {
    icon: "/account-information/key.svg",
    label: "Manage Two-Factor Authentication",
    value: "Disabled",
    svgIcon: "/account-information/arrow.svg"
  }
];

interface DataItem {
  icon: string;
  label: string;
  value: string;
  svgIcon: string;
}

interface InfoSectionProps {
  title: string;
  data: DataItem[];
}

// InfoSection component
const InfoSection: React.FC<InfoSectionProps> = ({ title, data }) => {
  return (
    <div className="mx-4 my-8 max-w-lg rounded-2xl bg-white p-4 shadow-md sm:mx-auto md:max-w-[94%] md:p-6">
      <h2 className="text-center text-2xl font-semibold md:text-left">{title}</h2>
      <p className="mb-4 text-center text-sm font-medium text-gray-500 sm:text-base md:text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <div className="space-y-3">
        {data.map((item: DataItem, index: number) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between border-b-1 border-[#F5F5F5] py-4"
          >
            <div className="flex w-full items-center gap-3 md:w-auto">
              <span className="rounded-lg bg-[#F7F3FD] p-4">
                {/* Image tag for custom icons */}
                <Image src={item.icon} alt={item.label} className="h-6 w-6" width={24} height={24} />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6E6E70]">{item.label}</p>
                <p className="font-bold text-black">{item.value}</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              {/* Replaced lock.svg with arrow.svg */}
              <Image src={item.svgIcon} className="w-5 min-w-[20px]" alt="arrow icon" width={20} height={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ProfileInfo component
const ProfileInfo = () => {
  return (
    <>
      <InfoSection title="Personal Information" data={profileData} />
      <InfoSection title="Account Settings" data={accountData} />
    </>
  );
};

export default ProfileInfo;
