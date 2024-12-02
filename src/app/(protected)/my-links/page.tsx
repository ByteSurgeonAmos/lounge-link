"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import NewLinks from "@/components/my-links/NewLinks";
import ExplorePeople from "@/components/my-links/ExplorePeople";
import ManageLinks from "@/components/my-links/ManageLinks";
import PremiumCard from "@/components/dashbboard/PremiumCard";

const MyLinksPage = () => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch user data");
      return response.json();
    },
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 p-6">
        <NewLinks />
        <ExplorePeople />
      </div>
      <div className="lg:w-80 p-6">
        <ManageLinks />
        <div className="mt-4">
          {userData?.subscriptionTier === "FREE" && <PremiumCard />}
        </div>
      </div>
    </div>
  );
};

export default MyLinksPage;
