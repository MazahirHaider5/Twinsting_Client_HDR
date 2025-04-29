import React from "react";
import Image from "next/image";

const Card = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="">
            {/* You can replace this with an actual user avatar */}
            <Image className="font-bold" src="/twist-images/Rectangle.svg" width={35} height={35} alt="Add Icon" />
          </div>
          <div className="text-sm font-semibold text-gray-700">Domenica</div>
        </div>
        <div className="rounded-full bg-[#FFF9F0] px-4 py-2 text-sm text-gray-600">Closed</div>
      </div>
      <h2 className="text-md mb-1 font-semibold text-gray-800">Providing Multiple Services for Companies - Easy</h2>
      <div className="mb-1 flex gap-2 text-xs text-gray-600">
        <Image className="font-bold" src="/twist-images/Vector.svg" width={15} height={15} alt="Add Icon" />
        Mon, 19 Oct - 4:00PM - 8:00PM
      </div>
      <div className="mb-2 flex items-center text-xs text-gray-600">
        <div className="mr-4">
          <p className="pb-1 font-semibold">Budget:</p>
          <p> $50 - $60</p>
        </div>
        <div>
          <p className="pb-1 font-semibold">Max Distance:</p> <p>3.8 mi</p>
        </div>
      </div>
      <p className="mb-3 text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tempor...{" "}
        <a href="#" className="text-indigo-500">
          read more
        </a>
      </p>
    </div>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4 sm:px-5 lg:px-[2.5rem]">
      <h1 className="pb-3 text-2xl font-bold">Twist</h1>
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default page;
