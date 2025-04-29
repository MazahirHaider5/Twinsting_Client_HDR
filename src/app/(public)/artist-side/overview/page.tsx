import React from "react";

const CreateService: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl max-h-full bg-white p-8 rounded-lg">
        <h2 className="text-center text-sm font-medium text-gray-500">Create Service</h2>
        <h1 className="text-center text-2xl font-semibold text-gray-900">Overview</h1>

        <div className="mt-6 space-y-10">
          {/* Service Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Service Title</label>
            <input
              type="text"
              placeholder="Enter Service Title..."
              className="mt-3 w-full px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">Select Category</label>
              <select
                className="mt-3 w-full px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              >
                <option className="text-gray-500">Select A Category...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Select A Subcategory</label>
              <select
                className="mt-3 w-full px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              >
                <option className="text-gray-500">Select A Subcategory...</option>
              </select>
            </div>
          </div>

          {/* Search Tags */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Search Tags</label>
            <p className="text-gray-500">
              Enter search terms you feel companies will use when looking for your service.
            </p>
            <input
              type="text"
              placeholder="Enter Keywords..."
              className="mt-3 w-full px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
        </div>

        {/*  Buttons */}
        <div className="fixed bottom-2 mb-44 sm:mb-28 w-full max-w-md flex justify-around py-4 px-1">
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 rounded-full text-gray-700"
        >
          Preview
        </button>
        <button
          type="button"
          className="px-3 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-md mr-10 sm:mr-0"
        >
          Save and Continue →
        </button>
      </div>
      </div>
    </div>
  );
};

export default CreateService;
//