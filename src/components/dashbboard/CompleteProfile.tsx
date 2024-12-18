import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

interface CompleteProfileProps {}

const CompleteProfile: React.FC<CompleteProfileProps> = () => {
  return (
    <div className="bg-custom-blue text-white w-full rounded-lg p-4 md:p-6 shadow-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Complete Your Profile
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="bg-white/10 p-4 rounded-full">
          <FaUser className="text-white text-xl md:text-2xl" />
        </div>
        <div className="flex-1 text-sm md:text-base text-center md:text-left leading-relaxed">
          Stand Out and attract meaningful connections by fully completing your
          profile. Let people know What You are about.
        </div>
        <Link href="/settings">
          <button
            className="bg-white text-custom-blue px-6 py-3 rounded-xl font-medium 
            transition-all duration-300 hover:bg-opacity-90 hover:scale-105 
            whitespace-nowrap shadow-md"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompleteProfile;
