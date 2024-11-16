import React from "react";
import { FaUser, FaUserAstronaut } from "react-icons/fa";

interface CompleteProfileProps {
  // Add your props here
}

const CompleteProfile: React.FC<CompleteProfileProps> = () => {
  return (
    <div className="bg-custom-blue text-white w-full  p-3">
      <h1 className="font-bold">Complete Your Profile</h1>
      <div className="flex w-full mt-2 justify-center items-center">
        <div className="p-2  rounded-full">
          <FaUser className="text-white" />
        </div>
        <div className="w-full flex  text-wrap">
          Stand Out and attract meaningful connections by fully completing your
          profile. Let people know What You are about.
        </div>
        <button className="bg-white text-custom-blue rounded-xl w-[10rem] h-[3rem] font-medium">
          Get Started
        </button>
      </div>
      {/* Add your component content here */}
    </div>
  );
};

export default CompleteProfile;
