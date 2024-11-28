import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Globe, ChevronRight } from "lucide-react";

const PublicLiveLinks: React.FC = () => {
  // Sample data for the public live links
  const publicLiveLinks = [
    {
      id: 1,
      user: {
        name: "Founders Saturday",
        username: "@founderssaturday",
        profilePic: "/api/placeholder/48/48",
      },
      description: "Networking event for founders and investors.",
    },
    {
      id: 2,
      user: {
        name: "Startup Grind",
        username: "@startupgrind",
        profilePic: "/api/placeholder/48/48",
      },
      description: "Global startup community hosting local events.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public LiveLinks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {publicLiveLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={link.user.profilePic}
                  alt={link.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{link.user.name}</h4>
                  <p className="text-gray-500 text-sm">@{link.user.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Globe size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { PublicLiveLinks };