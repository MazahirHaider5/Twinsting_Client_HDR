import Image from "next/image";

const Ratings = () => {
  return (
    <div className="flex w-fit items-center rounded-full border border-gray-500 bg-white/30 p-2 sm:p-3">
      <Image alt="img" src="/images/TrustUsers1.png" width={30} height={30} className="rounded-full sm:h-7 sm:w-7" />
      <Image
        alt="img"
        src="/images/TrustUsers2.png"
        width={30}
        height={30}
        className="-ml-2 rounded-full sm:h-7 sm:w-7"
      />
      <Image
        alt="img"
        src="/images/TrustUsers3.png"
        width={30}
        height={30}
        className="-ml-2 rounded-full sm:h-7 sm:w-7"
      />
      <Image
        alt="img"
        src="/images/TrustUsers4.png"
        width={30}
        height={30}
        className="-ml-2 rounded-full sm:h-7 sm:w-7"
      />
      <Image
        alt="img"
        src="/images/TrustUsers5.png"
        width={30}
        height={30}
        className="-ml-2 rounded-full sm:h-7 sm:w-7"
      />
      <p className="px-2 text-xs font-bold text-gray-200 sm:text-sm md:text-base">Trused by over 2M+ users</p>
    </div>
  );
};

export default Ratings;
