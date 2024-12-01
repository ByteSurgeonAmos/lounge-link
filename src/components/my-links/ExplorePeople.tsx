// src/components/my-links/ExplorePeople.tsx
import React from "react";
import { X } from "lucide-react";

interface ExplorePeopleProps {
  people: {
    name: string;
    role: string;
    connections: string;
    image: string;
  }[];
}

const ExplorePeople: React.FC<ExplorePeopleProps> = ({ people }) => {
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
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" title="cancel">
              <X size={18} />
            </button>
            <img
              src={person.image}
              alt={person.name}
              className="w-16 h-16 rounded-full border border-gray-200 mb-3"
            />
            <h4 className="text-sm font-medium">{person.name}</h4>
            <p className="text-xs text-gray-600">{person.role}</p>
            <p className="text-xs text-blue-500">{person.connections}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePeople;
