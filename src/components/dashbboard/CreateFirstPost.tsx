import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

interface CreateFirstPostProps {}

const CreateFirstPost: React.FC<CreateFirstPostProps> = () => {
  return (
    <div className="bg-custom-blue text-white w-full rounded-lg p-4 md:p-6 shadow-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Create your first post
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="bg-white/10 p-4 rounded-full">
          {/* <FaUser className="text-white text-xl md:text-2xl" /> */}
          <Image alt="image" src="/10.png" width={50} height={50} />
        </div>
        <div className="flex-1 text-sm md:text-base text-center md:text-left leading-relaxed">
          Ready to take the first step towards building real connections?
          Introduce yourself with a unique fact or update on a recent project.
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

export default CreateFirstPost;
