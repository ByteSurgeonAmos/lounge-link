// src/components/my-links/NewLinks.tsx
import React from "react";

const NewLinks: React.FC = () => {
  const links = [
    {
      name: "Alfredo Torres",
      role: "Founder at GripCo, NBO Kenya",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-alfredo-torres-image.jpg",
    },
    {
      name: "John Doe",
      role: "Marketing Strategist at Event Findr, Accra Ghana",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-john-doe-image.jpg",
    },
    {
      name: "Jane Doe",
      role: "Managing Director Eagle Blaze, Cairo Egypt",
      connections: "John Doe, Jane Doe & Claudia Alvis",
      image: "/path-to-jane-doe-image.jpg",
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">New Links</h2>
        <button className="text-blue-500 hover:underline text-sm">Show All</button>
      </div>
      <div className="space-y-4">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {/* Profile Image */}
              <img
                src={link.image}
                alt={link.name}
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              {/* Details */}
              <div>
                <h4 className="text-sm font-medium">{link.name}</h4>
                <p className="text-xs text-gray-600">{link.role}</p>
                <p className="text-xs text-blue-500">{link.connections}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                Accept
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm">
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewLinks;
