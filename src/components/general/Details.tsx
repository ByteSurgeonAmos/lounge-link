import React from "react";

interface Endorsement {
  name: string;
  avatar: string;
  description: string;
}

interface DetailsProps {
  badges: string[];
  topSkills: string[];
  lookingFor: string[];
  linkPreferences: string[];
  endorsements: Endorsement[];
}

const Details: React.FC<DetailsProps> = ({
  badges,
  topSkills,
  lookingFor,
  linkPreferences,
  endorsements,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg">Badges</h2>
      <div className="flex flex-wrap mb-4">
        {badges.map((badge, index) => (
          <span
            key={index}
            className="bg-blue-100 text-sm p-2 m-1 rounded-lg"
          >
            {badge}
          </span>
        ))}
      </div>
      <h2 className="font-bold text-lg">Top Skills</h2>
      <div className="flex flex-wrap mb-4">
        {topSkills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-sm p-2 m-1 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>
      <h2 className="font-bold text-lg">What I'm Looking For Right Now</h2>
      <div className="flex flex-wrap mb-4">
        {lookingFor.map((item, index) => (
          <span
            key={index}
            className="bg-blue-100 text-sm p-2 m-1 rounded-lg"
          >
            {item}
          </span>
        ))}
      </div>
      <h2 className="font-bold text-lg">Link Preferences</h2>
      <div className="flex flex-wrap mb-4">
        {linkPreferences.map((preference, index) => (
          <span
            key={index}
            className="bg-blue-100 text-sm p-2 m-1 rounded-lg"
          >
            {preference}
          </span>
        ))}
      </div>
      <h2 className="font-bold text-lg">Endorsements</h2>
      {endorsements.map((endorsement, index) => (
        <div
          key={index}
          className="p-2 border-2 border-black rounded-lg bg-blue-100 flex items-center space-x-2 mb-2"
        >
          <img
            src={endorsement.avatar}
            alt={endorsement.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-bold">{endorsement.name}</span>
            <p className="text-sm">{endorsement.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;
