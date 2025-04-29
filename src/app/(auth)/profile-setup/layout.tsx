import ProgressBarProfileSetup from "@/components/profile-setup/ProgessBarProfileSetup";
import Image from "next/image";

const ProfileSetupLayout  = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <div className="p-10 bg-gray-50 flex flex-col sm:flex-col md:flex-col lg:flex-row 2xl:flex-row justify-between items-center"> 
    <Image
        width={200}
        height={100}
        src="/images/logo2.png"
        alt=""
        // className="absolute top-10 left-10 z-10 object-cover text-black"
      />
        <ProgressBarProfileSetup/>
    </div>
        <div className="mt-6">{children}</div>
        </>
  )
}

export default ProfileSetupLayout;
