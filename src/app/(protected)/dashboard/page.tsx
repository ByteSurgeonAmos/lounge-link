"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import BlogSection from "@/components/dashbboard/BlogSection";
import CompleteProfile from "@/components/dashbboard/CompleteProfile";
import PremiumCard from "@/components/dashbboard/PremiumCard";
import QuickLinks from "@/components/dashbboard/QuickLinks";
import UpcomingEvents from "@/components/dashbboard/UpcomingEvents";
import CreateFirstPost from "@/components/dashbboard/CreateFirstPost";

export default function DashboardClient() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [hasFirstPost, setHasFirstPost] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile(data);

      // Check if user has any posts
      // const postsResponse = await fetch("/api/posts");
      // const postsData = await postsResponse.json();
      setHasFirstPost(false);
    };
    fetchProfile();
  }, []);

  const handleUpgrade = () => {
    console.log("Redirecting to upgrade page");
  };

  return (
    <main className="p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl font-medium text-black sm:w-1/2 lg:w-auto">
            Welcome {session?.user?.name || "User"}! Ready to make some new
            links?
          </h1>
          <button className="flex items-center justify-center bg-custom-blue text-white font-semibold px-4 py-2 rounded-xl h-[3rem] w-auto overflow-hidden whitespace-nowrap box-border">
  <span>Explore new links</span>
  <img src="/logo-white.png" className="ml-2 w-[70px]" alt="Logo" />
</button>


        </div>
        <div className="flex flex-col lg:flex-row gap-4 max-w-full">
          <div className="flex flex-col w-full lg:w-3/4 gap-4">
            {!profile?.isProfileComplete ? (
              <CompleteProfile />
            ) : !hasFirstPost ? (
              <CreateFirstPost />
            ) : null}
            <BlogSection />
            <UpcomingEvents />
          </div>
          <div className="flex flex-col w-full lg:w-1/4 gap-4">
            <div className="shadow-lg">
              <QuickLinks />
            </div>
            {profile?.subscriptionTier === "FREE" && (
              <div className="">
                <PremiumCard onUpgradeClick={handleUpgrade} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
