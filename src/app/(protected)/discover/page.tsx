"use client";

import React from "react";
import Header from "@/components/general/Header";
import Description from "@/components/general/Description";
import Details from "@/components/general/Details";

const DiscoverPage: React.FC = () => {
  const userData = {
    name: "Jane Doe",
    jobTitle: "Product Designer",
    location: "Nairobi, Kenya",
    profileImage: "/api/placeholder/150/150", // Replace with actual profile image link
    backgroundImage: "/api/placeholder/600/200", // Replace with actual background image link
    aboutMe:
      "I’m a product designer who loves solving design challenges and understanding how people interact with technology. I’m big on intuitive, people-centered design, and outside of work, you’ll find me hiking, trying new recipes, or volunteering with local youth programs.",
    somethingILiveBy:
      "The secret of getting ahead is getting started. Successful entrepreneurs know that the best way to predict the future is to create it.",
    personalInterests:
      "Pro Tennis player. By pro I mean, I took one class and it went great! I love hiking, exploring new passions, and going out for brunch. I love learning about AI and other emerging technologies.",
    currentProjects: [
      {
        title: "Redesigning Onboarding Experience for a Health App",
        link: "https://www.healthapp.com",
      },
    ],
    collaborators: [
      { name: "Alfredo Torres", avatar: "/api/placeholder/50/50" },
      { name: "Linda Martin", avatar: "/api/placeholder/50/50" },
    ],
    badges: ["5 Coffee Chats", "2 New Collabs", "Insight Giver"],
    topSkills: ["Design", "Coding", "Management"],
    lookingFor: ["Mentorship", "Collaboration", "Marketing Expert"],
    linkPreferences: ["Local Events", "Virtual Meetups", "Coffee Chats"],
    endorsements: [
      {
        name: "Alex Jr Mikes",
        avatar: "/api/placeholder/50/50",
        description:
          "Alex is an empathetic designer with a knack for translating user needs into practical solutions.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header
        name={userData.name}
        jobTitle={userData.jobTitle}
        location={userData.location}
        profileImage={userData.profileImage}
        backgroundImage={userData.backgroundImage}
      />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <Description
            aboutMe={userData.aboutMe}
            somethingILiveBy={userData.somethingILiveBy}
            personalInterests={userData.personalInterests}
            currentProjects={userData.currentProjects}
            collaborators={userData.collaborators}
          />
        </div>
        <div className="col-span-4">
          <Details
            badges={userData.badges}
            topSkills={userData.topSkills}
            lookingFor={userData.lookingFor}
            linkPreferences={userData.linkPreferences}
            endorsements={userData.endorsements}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
