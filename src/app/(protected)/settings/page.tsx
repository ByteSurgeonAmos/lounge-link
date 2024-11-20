"use client";

import React, { useEffect, useState } from "react";
import { Edit2, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { getProfile } from "./actions";
import { toast } from "sonner";
import { EditProfileModal } from "@/components/EditProfileModal";
import { ChainLoader } from "@/components/ChainLoader";

const ProfileSettingsPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editSection, setEditSection] = useState<string | null>(null);

  const calculateProfileCompletion = (profileData: any) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "country",
      "city",
      "bio",
      "quote",
      "designation",
      "avatar",
      "topSkills",
      "currentProjects",
      "personalInterests",
      "topInterests",
      "linkPreferences",
      "lookingFor",
    ];

    const completedFields = requiredFields.filter((field) => {
      const value = profileData[field];
      if (!value) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      const percentage = calculateProfileCompletion(profile);
      setCompletionPercentage(percentage);
    }
  }, [profile]);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      // console.log(data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (section: string, data: any) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          isProfileComplete: completionPercentage === 100,
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleEdit = (section: string) => {
    setEditSection(section);
  };

  const handleSave = async (data: any) => {
    await handleUpdateProfile(editSection!, data);
    setEditSection(null);
  };

  if (loading) {
    return <ChainLoader />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {/* Profile Completion Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Profile Completion</h3>
          <span className="text-sm font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-custom-blue h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        {completionPercentage < 100 && (
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            Complete your profile to increase visibility and connection
            opportunities
          </p>
        )}
        {completionPercentage === 100 && (
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Your profile is complete!
          </p>
        )}
      </div>

      {/* Profile Header */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex sm:flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profile?.avatar || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/100";
                }}
              />
              <button
                onClick={() => handleEdit("personal")}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
              >
                <Edit2 className="w-4 h-4 text-custom-blue" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {profile?.firstName} {profile?.lastName}
              </h3>
              <p className="text-gray-600">{profile?.designation}</p>
              <p className="text-gray-600 text-sm">
                {profile?.city}, {profile?.country}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-custom-blue hover:text-blue-600">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button
            onClick={() => handleEdit("personal")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-1">First Name</p>
            <p className="font-medium">{profile?.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Last Name</p>
            <p className="font-medium">{profile?.lastName}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-medium break-all">{profile?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone Number</p>
            <p className="font-medium">{profile?.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Country</p>
            <p className="font-medium">{profile?.country}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">City</p>
            <p className="font-medium">{profile?.city}</p>
          </div>
        </div>
      </div>

      {/* About Me & Skills */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>
          <button
            onClick={() => handleEdit("additional")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">About Me</h4>
          <p className="text-gray-600">{profile?.bio}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">A quote I live by...</h4>
          <p className="text-gray-600 italic">{profile?.quote}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills & Expertise</h3>
          <button
            onClick={() => handleEdit("skills")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.topSkills?.map((skill: string) => (
            <span
              key={skill}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Current Projects</h3>
          <button
            onClick={() => handleEdit("projects")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.currentProjects?.map((project: string) => (
            <span
              key={project}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {project}
            </span>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Interests</h3>
          <button
            onClick={() => handleEdit("interests")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div>
          <h4 className="font-medium mb-2">Personal Interests</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile?.personalInterests?.map((interest: string) => (
              <span
                key={interest}
                className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
          <h4 className="font-medium mb-2">Top Interests</h4>
          <div className="flex flex-wrap gap-2">
            {profile?.topInterests?.map((interest: string) => (
              <span
                key={interest}
                className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Link Preferences</h3>
          <button
            onClick={() => handleEdit("preferences")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.linkPreferences?.map((pref: string) => (
            <span
              key={pref}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {pref}
            </span>
          ))}
        </div>
      </div>

      {/* Looking For Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            What I'm looking for right now
          </h3>
          <button
            onClick={() => handleEdit("lookingFor")}
            className="flex items-center gap-2 text-custom-blue hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.lookingFor?.map((item: string) => (
            <span
              key={item}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() => handleUpdateProfile("all", profile)}
          className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Profile
        </button>
      </div>

      <EditProfileModal
        isOpen={!!editSection}
        onClose={() => setEditSection(null)}
        onSave={handleSave}
        section={editSection || ""}
        initialData={profile}
      />
    </div>
  );
};

export default ProfileSettingsPage;
