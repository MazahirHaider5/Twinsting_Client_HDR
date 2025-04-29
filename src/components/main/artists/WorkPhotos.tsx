import Image from "next/image";



const WorkPhotos = () => {
  const photos: string[] = [
    "/images/artistMedia1.png",
    "/images/artistMedia2.png",
    "/images/artistMedia3.png",
    "/images/artistMedia4.png",
    "/images/artistMedia5.png",
  ];

  return (
    <div className="flex flex-col px-14 space-y-2 pt-4">
      <p className="text-3xl font-bold text-gray-900 pt-2">Media</p>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {photos.map((src) => (
          <div key={src} className="relative w-full h-40">
            <Image
              src={src}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkPhotos;
