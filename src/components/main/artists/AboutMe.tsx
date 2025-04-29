


const AboutMe = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md">
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
        {["Cleaning tasks (314)", "Repairing (14)", "Plumber (14)", "Repairing (14)"].map((task, index) => (
          <div
            key={index}
            className="rounded-full bg-gray-200 px-3 py-1 text-xs sm:text-sm md:text-base text-gray-900 font-semibold"
          >
            {task}
          </div>
        ))}
      </div>

      {/* About Me Section */}
      <div className="mt-6 text-center sm:text-left">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">About me</h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
