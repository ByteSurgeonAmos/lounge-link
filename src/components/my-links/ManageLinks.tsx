// src/components/my-links/ManageLinks.tsx
"use client";
import React, { useState } from "react";

interface ManageLinksProps {
  links: {
    id: number;
    name: string;
    role: string;
    linked: string;
  }[];
}

const ManageLinks: React.FC<ManageLinksProps> = ({ links }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md bg-teal-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Manage Links</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 mb-4"
      />
      <ul className="space-y-4">
        {filteredLinks.map((link) => (
          <li
            key={link.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100"
          >
            <div>
              <h3 className="font-bold">{link.name}</h3>
              <p className="text-sm text-gray-600">{link.role}</p>
              <p className="text-xs text-gray-400">{link.linked}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                📧
              </button>
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLinks;
