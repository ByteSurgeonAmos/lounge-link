import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Globe, ChevronRight } from "lucide-react";

interface PublicLiveLinksProps {
  liveLinks: Array<{
    id: string;
    title: string;
    date: Date;
    author: {
      firstName: string;
      lastName: string;
      avatar?: string;
    };
    isPublic: boolean;
  }>;
}

export const PublicLiveLinks: React.FC<PublicLiveLinksProps> = ({
  liveLinks,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Public LiveLinks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {liveLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {link.author.avatar && (
                  <img
                    src={link.author.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-medium">{link.title}</h4>
                  <p className="text-gray-500 text-sm">
                    by {link.author.firstName} {link.author.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(link.date).toLocaleDateString()}
                  </p>
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
