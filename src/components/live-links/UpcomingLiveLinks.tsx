import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Calendar, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const UpcomingLiveLinks: React.FC = () => {
  const { data: upcomingLinks, isLoading } = useQuery({
    queryKey: ["upcomingLiveLinks"],
    queryFn: async () => {
      const response = await fetch("/api/live-links?upcoming=true&limit=3");
      if (!response.ok) throw new Error("Failed to fetch upcoming live links");
      return response.json();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming LiveLinks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            upcomingLinks?.items.map((link: any) => (
              <div key={link.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 rounded-full p-2">
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{link.title}</h4>
                    <p className="text-gray-500 text-sm">
                      {formatDate(link.startDate)}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { UpcomingLiveLinks };
