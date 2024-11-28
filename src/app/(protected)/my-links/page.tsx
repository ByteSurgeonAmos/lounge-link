// src/app/(protected)/my-links/page.tsx
import React from "react";
import NewLinks from "@/components/my-links/NewLinks";
import ExplorePeople from "@/components/my-links/ExplorePeople";
import ManageLinks from "@/components/my-links/ManageLinks";
import PremiumCard from "@/components/dashbboard/PremiumCard";

const MyLinksPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-6">
        {/* New Links Section */}
        <NewLinks />

        {/* Explore People Section */}
        <ExplorePeople />
      </div>
      <div className="lg:w-80 p-6">
        {/* Manage Links Section */}
        <ManageLinks />
        <PremiumCard />
      </div>
    </div>
  );
};

export default MyLinksPage;