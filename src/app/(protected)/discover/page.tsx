"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/general/Header";
import Description from "@/components/general/Description";
import Details from "@/components/general/Details";
import { ChainLoader } from "@/components/ChainLoader";

const DiscoverPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/discover?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ChainLoader />
      </div>
    );

  if (!users.length) return <div>No users found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {users.map((userData, index) => {
        const userDisplayData = {
          name: `${userData.firstName} ${userData.lastName}`,
          jobTitle: userData.designation,
          location: `${userData.city}, ${userData.country}`,
          profileImage: userData.avatar || "https://via.placeholder.com/150",
          backgroundImage:
            userData.backgroundImage || "https://via.placeholder.com/600x200",
          aboutMe: userData.bio,
          somethingILiveBy: userData.quote,
          personalInterests: userData.personalInterests,
          currentProjects: userData.currentProjects.map((project: string) => ({
            title: project,
            link: project.startsWith("http") ? project : `#${project}`,
          })),
          collaborators: userData.collaborations.map((collab: any) => ({
            name: collab.name,
            avatar: collab.avatar || "https://via.placeholder.com/50",
          })),
          badges: userData.badges.map((badge: any) => badge.name),
          topSkills: userData.topSkills,
          lookingFor: userData.lookingFor,
          linkPreferences: userData.linkPreferences,
          endorsements: userData.endorsements.map((endorsement: any) => ({
            name: `${endorsement.giver.firstName} ${endorsement.giver.lastName}`,
            avatar:
              endorsement.giver.avatar || "https://via.placeholder.com/50",
            description: endorsement.description,
          })),
          userId: userData.id, // Add this line
        };

        return (
          <div key={index} className="mb-8">
            <Header
              name={userDisplayData.name}
              jobTitle={userDisplayData.jobTitle}
              location={userDisplayData.location}
              profileImage={userDisplayData.profileImage}
              backgroundImage={userDisplayData.backgroundImage}
              userId={userDisplayData.userId}
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
      })}

      <div className="flex justify-center gap-2 mt-8 mb-4">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
