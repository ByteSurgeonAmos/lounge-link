// src/app/(protected)/my-links/page.tsx
import React from "react";
import NewLinks from "@/components/my-links/NewLinks";
import ExplorePeople from "@/components/my-links/ExplorePeople";
import ManageLinks from "@/components/my-links/ManageLinks";
import PremiumCard from "@/components/dashbboard/PremiumCard";

const MyLinksPage: React.FC = () => {
  // Centralized data
  const newLinksData = [
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

  const explorePeopleData = [
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

  const manageLinksData = [
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

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-6">
        {/* Pass data to NewLinks */}
        <NewLinks links={newLinksData} />

        {/* Pass data to ExplorePeople */}
        <ExplorePeople people={explorePeopleData} />
      </div>
      <div className="lg:w-80 p-6">
        {/* Pass data to ManageLinks */}
        <ManageLinks links={manageLinksData} />
        <PremiumCard />
      </div>
    </div>
  );
};

export default MyLinksPage;
