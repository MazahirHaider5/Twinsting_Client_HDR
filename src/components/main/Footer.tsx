import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="space-y-4 bg-gray-900 px-6 sm:px-10 lg:px-20 py-6 text-gray-200">
      {/* Top Section */}
      <section className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 pb-4 space-y-4 sm:space-y-0">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
          <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">Home</p>
          <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">About Us</p>
          <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">Blog</p>
          <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">FAQs</p>
          <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">Contact Us</p>
        </div>
        {/* Social Media */}
        <div className="flex gap-4 sm:gap-6">
          <FaInstagram className="size-6 cursor-pointer underline-offset-4 hover:text-white hover:underline" />
          <FaFacebook className="size-6 cursor-pointer underline-offset-4 hover:text-white hover:underline" />
        </div>
      </section>
      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm sm:text-base text-center sm:text-left space-y-4 sm:space-y-0">
        <p>Copyright &copy; 2024 All Rights Reserved</p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
        <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">Privacy Policy</p>
        <span className="hidden sm:inline">&bull;</span>
        <p className="cursor-pointer underline-offset-4 hover:text-white hover:underline">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
