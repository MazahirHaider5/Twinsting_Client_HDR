import TopHeader from "@/components/main/TopHeader";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopHeader />
      <Navbar />
      <div className="min-h-[calc(100vh-15rem)]">{children}</div>
      <Footer />
    </>
  );
};

export default HomeLayout;
