import React from "react";
import ImageNetwork from "./ImageNetwork";

const ConnectAndGrowComponent = () => {
  return (
    <div className="flex w-full">
      <div className="bg-[#219abc] text-white p-6 ">
        <h2 className="text-3xl  uppercase font-bold mb-4 text-black">
          Connect, Collaborate and <br /> Grow at Your Own Pace
        </h2>
        <p className="mb-4 text-lg">
          Take the pressure off and Focus on building meaningful connections.
        </p>
        <div className="flex flex-col  items-center justify-between mb-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="bg-[#fbd1a2] placeholder:text-black text-black px-4 py-2 rounded-full w-full md:w-auto"
            />
          </div>
          <div className="mb-4 md:mb-0">
            <input
              type="password"
              placeholder="Password"
              className="bg-[#fbd1a2] placeholder:text-black  text-black px-4 py-2 rounded-full w-full md:w-auto"
            />
          </div>
          <button className="bg-black mt-10 text-white w-[13rem] px-4 py-2 rounded-full hover:bg-gray-800">
            Get Started
          </button>
        </div>
        <div className="flex justify-between">
          <a href="#" className="text-white hover:underline">
            Create Account
          </a>
          <a href="#" className="text-white hover:underline">
            Need Help?
          </a>
        </div>
      </div>
      <div className="bg-[#219abc] w-full">
        <ImageNetwork />
      </div>
    </div>
  );
};

export default ConnectAndGrowComponent;
