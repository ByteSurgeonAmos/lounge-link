import React from "react";
import { Edit2, ExternalLink } from "lucide-react";

const ProfileSettingsPage = () => {
  const skills = ["Design", "Coding", "Management"];
  const preferences = ["Local Events", "Virtual Meetups", "Coffee Chats"];
  const lookingFor = ["Mentorship", "Collaboration", "Teams"];
  const interests = ["Tech", "Design", "Marketing"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Profile</h2>
      </div>

      {/* Profile Header */}
      <div className="bg-gray-50  rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex sm:flex-col items-center gap-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">Jane Doe</h3>
              <p className="text-gray-600">Product Designer</p>
              <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
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
          <button className="flex items-center gap-2 text-custom-blue hover:text-blue-600">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-1">First Name</p>
            <p className="font-medium">Jane</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Last Name</p>
            <p className="font-medium">Doe</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-medium break-all">janedoe@example.com</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone Number</p>
            <p className="font-medium">+254********</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Country</p>
            <p className="font-medium">Example</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">City</p>
            <p className="font-medium">City Example</p>
          </div>
        </div>
      </div>

      {/* About Me & Skills */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>
          <button className="flex items-center gap-2 text-custom-blue hover:text-blue-600">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">About Me</h4>
          <p className="text-gray-600">
            I'm a product designer who loves solving design challenges and
            understanding how people interact with technology. When I'm not
            designing better experiences for groups and outside of work, you'll
            find me hiking, trying new recipes, or volunteering with local youth
            programs.
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">A quote I live by...</h4>
          <p className="text-gray-600 italic">
            "The secret of getting ahead is getting started. Successful
            entrepreneurs always find the best way to predict the future is to
            create it."
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Personal Interests</h4>
          <p className="text-gray-600">
            Pro Tennis player. By pro I mean, I took one class and it went
            great! I love hiking, exploring new places, and getting lost in
            books while learning about AI and other emerging technologies.
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Current Projects</h4>
          <div className="text-gray-600">
            <p>Redesigning Onboarding Experience for a Health App</p>
            <a
              href="http://healthapp.com"
              className="text-custom-blue flex items-center gap-1 hover:text-blue-600"
            >
              www.healthapp.com
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Top Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Link Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {preferences.map((pref) => (
            <span
              key={pref}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {pref}
            </span>
          ))}
        </div>
      </div>

      {/* Looking For */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          What I'm looking for right now
        </h3>
        <div className="flex flex-wrap gap-2">
          {lookingFor.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Top Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-custom-blue text-white rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
