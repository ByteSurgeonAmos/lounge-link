"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/general/Header";
import Description from "@/components/general/Description";
import Details from "@/components/general/Details";
import { ChainLoader } from "@/components/ChainLoader";

const DiscoverPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/profile");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ChainLoader />
      </div>
    );
  if (!userData) return <div>No user data found</div>;

  const userDisplayData = {
    name: `${userData.firstName} ${userData.lastName}`,
    jobTitle: userData.designation,
    location: `${userData.city}, ${userData.country}`,
    profileImage: userData.avatar || "/api/placeholder/150/150",
    backgroundImage: userData.backgroundImage || "/api/placeholder/600/200",
    aboutMe: userData.bio,
    somethingILiveBy: userData.quote,
    personalInterests: userData.personalInterests,
    currentProjects: userData.currentProjects.map((project: string) => ({
      title: project,
      link: project.startsWith("http") ? project : `#${project}`,
    })),
    collaborators: userData.collaborations.map((collab: any) => ({
      name: collab.name,
      avatar: collab.avatar || "/api/placeholder/50/50",
    })),
    badges: userData.badges.map((badge: any) => badge.name),
    topSkills: userData.topSkills,
    lookingFor: userData.lookingFor,
    linkPreferences: userData.linkPreferences,
    endorsements: userData.endorsements.map((endorsement: any) => ({
      name: `${endorsement.giver.firstName} ${endorsement.giver.lastName}`,
      avatar: endorsement.giver.avatar || "/api/placeholder/50/50",
      description: endorsement.description,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header
        name={userDisplayData.name}
        jobTitle={userDisplayData.jobTitle}
        location={userDisplayData.location}
        profileImage={userDisplayData.profileImage}
        backgroundImage={userDisplayData.backgroundImage}
      />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <Description
            aboutMe={userDisplayData.aboutMe}
            somethingILiveBy={userDisplayData.somethingILiveBy}
            personalInterests={userDisplayData.personalInterests}
            currentProjects={userDisplayData.currentProjects}
            collaborators={userDisplayData.collaborators}
          />
        </div>
        <div className="col-span-4">
          <Details
            badges={userDisplayData.badges}
            topSkills={userDisplayData.topSkills}
            lookingFor={userDisplayData.lookingFor}
            linkPreferences={userDisplayData.linkPreferences}
            endorsements={userDisplayData.endorsements}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
