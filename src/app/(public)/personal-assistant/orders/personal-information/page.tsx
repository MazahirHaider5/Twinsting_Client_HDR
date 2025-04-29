"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleRight } from "react-icons/fa6";


interface InfoItem {
    id: string;
    icon: string;
    label: string;
    value: string;
}

const profileData: InfoItem[] = [
    { id: 'profile-name', icon: '/images/user.png', label: 'Name', value: 'Nico Robin' },
    { id: 'profile-address', icon: '/images/location.png', label: 'Address', value: 'PK' },
    { id: 'profile-phone', icon: '/images/call.png', label: 'Phone Number', value: '+92' },
    { id: 'profile-company', icon: '/images/company.png', label: 'Company', value: 'Not Provided' },
    { id: 'profile-details', icon: '/images/details.png', label: 'Additional Details', value: 'Not Provided' }
];

const accountData: InfoItem[] = [
    { id: 'account-email', icon: '/images/user.png', label: 'Email Address', value: 'domenica646@gmail.com' },
    { id: 'account-password', icon: '/images/lock.png', label: 'Add password', value: 'Not Provided' },
    { id: 'account-2fa', icon: '/images/key.png', label: 'Manage two-factor authentication', value: 'Disabled' }
];

interface InfoSectionProps {
    title: string;
    data: InfoItem[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, data }) => {
    return (
        <div className="bg-white rounded-lg mb-6">
            <div className="p-6">
                <h2 className="text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-500 text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-base  mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <div className="space-y-4">
                    {data.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="p-3 bg-[#FEEDF4] rounded-lg">
                                    <Image 
                                        src={item.icon} 
                                        alt={item.label} 
                                        width={20} 
                                        height={20} 
                                    />
                                </span>
                                <div>
                                    <p className="text-gray-500 text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-base  mb-1">{item.label}</p>
                                    <p className="text-sm sm:text-sm md:text-sm lg:text-base 2xl:text-base">{item.value}</p>
                                </div>
                            </div>
                            <FaAngleRight/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PersonalInfo = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center gap-2 text-sm py-4 mb-4">
                <Link href="/company/home" className="text-gray-500">Home</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900">Account Information</span>
            </div>
            <InfoSection title="Personal Information" data={profileData} />
            <InfoSection title="Account Settings" data={accountData} />
        </div>
    );
};

export default PersonalInfo;
