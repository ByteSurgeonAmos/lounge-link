import React from "react";

interface Project {
  title: string;
  link: string;
}

interface Collaborator {
  name: string;
  avatar: string;
}

interface DescriptionProps {
  aboutMe: string;
  somethingILiveBy: string;
  personalInterests: string;
  currentProjects: Project[];
  collaborators: Collaborator[];
}

const Description: React.FC<DescriptionProps> = ({
  aboutMe,
  somethingILiveBy,
  personalInterests,
  currentProjects,
  collaborators,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg">About Me</h2>
      <p className="mb-4">{aboutMe}</p>
      <h2 className="font-bold text-lg">Something I Live By...</h2>
      <p className="mb-4">{somethingILiveBy}</p>
      <h2 className="font-bold text-lg">Personal Interests</h2>
      <p className="mb-4">{personalInterests}</p>
      <h2 className="font-bold text-lg">Current Projects</h2>
      <ul className="list-disc ml-4 mb-4">
        {currentProjects.map((project, index) => (
          <li key={index}>
            <a href={project.link} className="text-blue-500 hover:underline">
              {project.title}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="font-bold text-lg">Collaborated With</h2>
      <div className="flex space-x-4">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className="p-2 border-2 border-black rounded-lg bg-blue-100 flex items-center space-x-2"
          >
            <img
              src={collaborator.avatar}
              alt={collaborator.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{collaborator.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
