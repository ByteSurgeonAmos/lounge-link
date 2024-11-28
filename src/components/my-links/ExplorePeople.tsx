// src/components/my-links/ExplorePeople.tsx
import React from "react";
import { X } from "lucide-react"; // For the close icon

const ExplorePeople: React.FC = () => {
  const people = [
    {
      name: "Alfredo Torres",
      role: "Founder at GripCo, NBO Kenya",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-alfredo-torres-image.jpg",
    },
    {
      name: "Jane Torres",
      role: "Managing Director Eagle Blaze, Cairo Egypt",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-jane-torres-image.jpg",
    },
    {
      name: "Alfredo Torres",
      role: "Founder at GripCo, NBO Kenya",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-alfredo-torres-image.jpg",
    },
    {
      name: "Jane Torres",
      role: "Managing Director Eagle Blaze, Cairo Egypt",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-jane-torres-image.jpg",
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Explore People based on your Profile</h2>
        <button className="text-blue-500 hover:underline text-sm">Show All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {people.map((person, index) => (
          <div
            key={index}
            className="relative bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            {/* Close Button */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>

            {/* Profile Image */}
            <img
              src={person.image}
              alt={person.name}
              className="w-16 h-16 rounded-full border border-gray-200 mb-3"
            />

            {/* User Details */}
            <h4 className="text-sm font-medium">{person.name}</h4>
            <p className="text-xs text-gray-600">{person.role}</p>
            <p className="text-xs text-blue-500">{person.connections}</p>

            {/* Link Button */}
            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm flex items-center space-x-2">
              <span>Link</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 010 5.656M10.172 13.828a4 4 0 010-5.656m5.656 5.656l4.243-4.243m-4.243 0l-4.243 4.243M10.828 9.172a4 4 0 010 5.656m3.344-5.656l4.243 4.243m-4.243 0L9.172 9.172"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePeople;
