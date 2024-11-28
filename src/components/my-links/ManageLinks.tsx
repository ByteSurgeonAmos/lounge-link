// src/components/my-links/ManageLinks.tsx
"use client";
import React, { useState } from "react";

const ManageLinks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const links = [
    {
      id: 1,
      name: "Alfredo Torres",
      role: "Product Designer, NBO",
      linked: "Linked 3 Weeks ago",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Marketing Expert, MSA",
      linked: "Linked a month ago",
    },
    {
      id: 3,
      name: "Janet Doe",
      role: "Digital Consultant, NYC",
      linked: "Linked 2 months ago",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleSendMessage = (name: string) => {
    alert(`Send message to ${name}`);
  };

  const handleDelete = (name: string) => {
    alert(`Delete link for ${name}`);
  };

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md bg-teal-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Manage Links</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleFilter}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <span>⚙️</span>
        </button>
      </div>
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
              <button
                onClick={() => handleSendMessage(link.name)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                📧
              </button>
              <button
                onClick={() => handleDelete(link.name)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Filter Options</h3>
            <button
              onClick={closeFilterModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <p>Filter options would go here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLinks;