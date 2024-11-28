import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Calendar, ChevronRight } from "lucide-react";

const UpcomingLiveLinks: React.FC = () => {
  // Sample data for the upcoming live links
  const upcomingLiveLinks = [
    {
      id: 1,
      name: "Industry Trends Hike",
      date: "May 10, 2023",
    },
    {
      id: 2,
      name: "Startup Summit",
      date: "June 15, 2023",
    },
    {
      id: 3,
      name: "International Careers Dinner",
      date: "July 20, 2023",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming LiveLinks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingLiveLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 rounded-full p-2">
                  <Calendar size={16} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">{link.name}</h4>
                  <p className="text-gray-500 text-sm">{link.date}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { UpcomingLiveLinks };