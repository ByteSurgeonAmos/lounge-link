"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import BlogSection from "@/components/dashbboard/BlogSection";
import CompleteProfile from "@/components/dashbboard/CompleteProfile";
import PremiumCard from "@/components/dashbboard/PremiumCard";
import QuickLinks from "@/components/dashbboard/QuickLinks";
import UpcomingEvents from "@/components/dashbboard/UpcomingEvents";

export default function DashboardClient() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile(data);
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
          <h1 className="text-xl font-medium text-black">
            Welcome {session?.user?.name || "User"}! Ready to make some new
            links?
          </h1>
          <button className="flex bg-custom-blue w-fit justify-center items-center p-3 rounded-xl text-white font-semibold h-[3rem]">
            Explore new links{" "}
            <img src="/logo-white.png" className="w-[70px]" alt="" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 max-w-full">
          <div className="flex flex-col w-full lg:w-auto gap-4">
            {!profile?.isProfileComplete && <CompleteProfile />}
            <BlogSection />
            <UpcomingEvents />
          </div>
          <div className="flex flex-col w-full lg:w-auto gap-4">
            <div className="border shadow-lg">
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
