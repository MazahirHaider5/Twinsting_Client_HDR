"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import bg from "@/assets/auth-bg.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // Check if it's the profile setup page
  const isProfileSetup = pathname.startsWith("/profile-setup");

  if (isProfileSetup) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Logo */}
      <Image
        width={200}
        src={logo}
        alt=""
        className="absolute top-10 left-10 z-10 object-cover"
      />

      {/* Background Image */}
      <Image
        src={bg}
        alt=""
        className="absolute top-0 left-0 z-0 h-screen w-screen object-cover"
      />

      {/* Children Container */}
      <div className="absolute top-1/2 z-20 -translate-y-1/2 rounded-2xl bg-white left-1/2 -translate-x-1/2 lg:left-auto lg:right-32 lg:translate-x-0">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
