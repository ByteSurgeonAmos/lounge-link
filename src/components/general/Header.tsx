import React, { useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  name: string;
  jobTitle: string;
  location: string;
  profileImage: string;
  backgroundImage: string;
  userId?: string;
}

const Header: React.FC<HeaderProps> = ({
  name,
  jobTitle,
  location,
  profileImage,
  backgroundImage,
  userId,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!userId) {
      toast.error("Unable to Link - User ID not found");
      return;
    }

    setIsConnecting(true);
    try {
      await fetch("/api/users/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      toast.success("Successfully Linked!");
    } catch (error) {
      toast.error("Failed to Link. Please try again later.");
      console.error("Failed to Link:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="relative">
      <img
        src={backgroundImage}
        alt="Background"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="flex items-center p-6 bg-white shadow-lg rounded-b-lg">
        <img
          src={profileImage}
          alt={name}
          className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-md hover:scale-105 transition-transform duration-200"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600 font-medium">{jobTitle}</p>
          <p className="text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </p>
        </div>
        <div className="ml-auto flex space-x-3">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Linking...
              </>
            ) : (
              "Link"
            )}
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200">
            Let's Collaborate
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200">
            Message
          </button>
          <button className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
