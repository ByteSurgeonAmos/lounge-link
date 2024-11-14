import React from "react";
import Image from "next/image";
import { FiGlobe, FiUsers, FiBriefcase } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const NewFeatureSection = () => {
  return (
    <div className="flex-col bg-custom-blue p-8">
      {/* Divider */}
      <div className="flex justify-center">
        <hr className="bg-white w-[90%] mb-8" />
      </div>

      {/* Main Content */}
      <div className="text-white flex flex-col md:flex-row items-center md:items-start gap-6 justify-between space-y-8 md:space-y-0">
        {/* Left section with images */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold text-center mt-4">WHAT’S NEW?</h2>
          <p className="text-center text-sm uppercase pb-8">
            Your Pace, Your Terms
          </p>
          <div className="relative flex justify-center items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/1.png"
                alt="Center Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/2.png"
                alt="Top Left Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/3.png"
                alt="Top Right Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/4.png"
                alt="Bottom Left Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        {/* Right section with text content */}
        <div className="flex-1 max-w-md space-y-6">
          <h3 className="text-xl font-bold leading-snug mb-6">
            BUILD A RICH & MEANINGFUL NETWORK, BOTH PERSONAL AND PROFESSIONAL
          </h3>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <FiGlobe className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-bold">
                  Build Authentic & Meaningful Connections
                </h4>
                <p className="text-sm text-gray-200">
                  Connect with people who share your interests, values, and
                  goals, and build professional relationships that go beyond the
                  surface.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <FaHandshake className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-bold">Collaborative Space</h4>
                <p className="text-sm text-gray-200">
                  From project partners to creative collaborations, find people
                  who are eager to support each other's success. Lounge
                  encourages a culture of mutual benefit and teamwork.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <FiUsers className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-bold">Mentorship & Guidance</h4>
                <p className="text-sm text-gray-200">
                  Looking for a mentor or ready to support others on their
                  journey? We make it easy to connect with people who can guide
                  and inspire you.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <FiBriefcase className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-bold">Investor & Founder Space</h4>
                <p className="text-sm text-gray-200">
                  Investors can easily discover emerging projects, while
                  founders can showcase what they're building. Make the right
                  connections that drive success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button section */}
        <div className="w-full md:w-auto flex justify-center">
          <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-200">
            JOIN FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatureSection;
