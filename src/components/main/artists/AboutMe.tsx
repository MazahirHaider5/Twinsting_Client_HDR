interface AboutMeProps {
  about: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ about }) => {
  return (
    <div className="w-full max-w-full overflow-hidden p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md">
      {/* About Me Section */}
      <div className="mt-6 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          About me
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base md:text-lg break-words whitespace-pre-wrap">
          {about}
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
