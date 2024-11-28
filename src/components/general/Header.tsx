import React from "react";

interface HeaderProps {
  name: string;
  jobTitle: string;
  location: string;
  profileImage: string;
  backgroundImage: string;
}

const Header: React.FC<HeaderProps> = ({
  name,
  jobTitle,
  location,
  profileImage,
  backgroundImage,
}) => {
  return (
    <div className="relative">
      <img
        src={backgroundImage}
        alt="Background"
        className="w-full h-32 object-cover"
      />
      <div className="flex items-center p-4 bg-white shadow-md">
        <img
          src={profileImage}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-white -mt-12"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-gray-500">{jobTitle}</p>
          <p className="text-gray-500">{location}</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="btn-primary">Link</button>
          <button className="btn-secondary">Let's Collaborate</button>
          <button className="btn-secondary">Message</button>
          <button className="btn-secondary">...</button>
        </div>
      </div>
    </div>
  );
};

export default Header;