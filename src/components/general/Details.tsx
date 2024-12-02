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
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <section>
        <h2 className="font-bold text-xl text-gray-800 mb-3">Badges</h2>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-sm px-3 py-1.5 rounded-full font-medium transition-colors hover:bg-blue-100"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-xl text-gray-800 mb-3">Top Skills</h2>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-green-50 text-green-600 text-sm px-3 py-1.5 rounded-full font-medium transition-colors hover:bg-green-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-xl text-gray-800 mb-3">
          What I'm Looking For Right Now
        </h2>
        <div className="flex flex-wrap gap-2">
          {lookingFor.map((item, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-600 text-sm px-3 py-1.5 rounded-full font-medium transition-colors hover:bg-purple-100"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-xl text-gray-800 mb-3">
          Link Preferences
        </h2>
        <div className="flex flex-wrap gap-2">
          {linkPreferences.map((preference, index) => (
            <span
              key={index}
              className="bg-amber-50 text-amber-600 text-sm px-3 py-1.5 rounded-full font-medium transition-colors hover:bg-amber-100"
            >
              {preference}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-xl text-gray-800 mb-3">Endorsements</h2>
        <div className="space-y-3">
          {endorsements.map((endorsement, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-start space-x-3"
            >
              <img
                src={endorsement.avatar}
                alt={endorsement.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-semibold text-gray-800 block mb-1">
                  {endorsement.name}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {endorsement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Details;
