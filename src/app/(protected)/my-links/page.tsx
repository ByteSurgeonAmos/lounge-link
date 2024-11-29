// src/app/(protected)/my-links/page.tsx
"use client";

import { useSessionContext } from "@/context/SessionContext";
import NewLinks from "@/components/my-links/NewLinks";
import ExplorePeople from "@/components/my-links/ExplorePeople";
import ManageLinks from "@/components/my-links/ManageLinks";
import PremiumCard from "@/components/dashbboard/PremiumCard";
import Discussions from "@/components/my-links/Discussions";

const MyLinksPage: React.FC = () => {
  const { profile } = useSessionContext();

  // Milestone data
  const milestoneData = {
    discussions: 10,
    badges: 5,
    endorsements: 3,
  };

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
        <NewLinks links={newLinksData} />
        <ExplorePeople people={explorePeopleData} />
      </div>
      <div className="lg:w-80 p-6">
        <ManageLinks links={manageLinksData} />
        {profile?.subscriptionTier === "FREE" ? (
          <Discussions
            discussions={milestoneData.discussions}
            badges={milestoneData.badges}
            endorsements={milestoneData.endorsements}
          />
        ) : (
          <PremiumCard />
        )}
      </div>
    </div>
  );
};

export default MyLinksPage;
