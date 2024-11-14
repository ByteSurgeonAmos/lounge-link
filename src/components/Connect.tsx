import React from "react";
import ImageNetwork from "./ImageNetwork";
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";

const ConnectAndGrowComponent = () => {
  return (
    <div className="flex w-full bg-gradient-to-r from-[#219abc] to-[#51c3da] text-white">
      <div className="p-10 md:p-16 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4 uppercase">
          Connect, Collaborate and Grow at Your Own Pace
        </h2>
        <p className="text-lg mb-8">
          Take the pressure off and focus on building meaningful connections.
        </p>
        <div className="flex flex-col  gap-4 justify-center">
          <div className="flex items-center bg-[#fbd1a2] text-black rounded-full px-4 py-2 w-full md:w-auto">
            <FaUserCircle className="h-6 mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent placeholder:text-gray-600 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center bg-[#fbd1a2] text-black rounded-full px-4 py-2 w-full md:w-auto">
            <TbPasswordUser className="h-6 mr-2 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent placeholder:text-gray-600 focus:outline-none w-full"
            />
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 w-full md:w-auto">
            Get Started
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <a href="#" className="hover:underline">
            Create Account
          </a>
          <a href="#" className="hover:underline">
            Need Help?
          </a>
        </div>
      </div>
      <div className="hidden md:block w-full">
        <ImageNetwork />
      </div>
    </div>
  );
};

export default ConnectAndGrowComponent;
