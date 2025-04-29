"use client";
import { useState } from "react";
import Image from "next/image";

export const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div
        onClick={triggerFileInput}
        className="flex w-full cursor-pointer flex-col items-center rounded-lg border border-dashed border-[#F15298] bg-[#FEEDF4] px-6 py-8 text-center hover:bg-[#f8c5da] sm:px-8 sm:py-10 md:px-10 md:py-12"
      >
        {/* Upload Icon */}
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
          <Image src="/images/uploadIcon.png" alt="Upload Icon" width={40} height={40} />
        </div>

        {/* Upload Label */}
        <label className="cursor-pointer text-sm sm:text-base">
          <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          Drag/drop or upload front side of ID card
        </label>

        {/* Add Image Button */}
        <button className="mt-4 flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#ED1E79] bg-white bg-gradient-to-b from-[#F5AF48] to-[#E32379] bg-clip-text px-4 py-2 text-sm text-transparent sm:text-base">
          <i className="fa-solid fa-plus"></i> Add Image
        </button>
      </div>

      {/* Uploaded Image Preview */}
      {image && (
        <div className="mt-4 flex w-full justify-center">
          <Image
            src={image}
            alt="Uploaded preview"
            className="h-auto w-full max-w-xs rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      )}
    </div>
  );
};
