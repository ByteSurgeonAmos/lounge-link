import React from "react";
import PremiumLiveLink from "@/components/live-links/PremiumLiveLink";
import Blog from "@/components/live-links/Blog";
import PremiumReviews from "@/components/live-links/PremiumReviews";
import NotReadyYet from "@/components/live-links/NotReadyYet";
import {PublicLiveLinks} from "@/components/live-links/PublicLiveLinks";
import {UpcomingLiveLinks} from "@/components/live-links/UpcomingLiveLinks";

const LiveLinksPage: React.FC = () => {
  const blogItems = [
    {
      title: "Create and Host Meetups",
      description:
        "Plan events for yourself or your team. Be a critical voice in the future of remote meetups, or organize the activities you're passionate about for others to discover.",
    },
    {
      title: "Build Authentic Relationships",
      description:
        "Turn online connections into meaningful relationships. Promote inclusivity, diversity, and trust to ensure your LiveLink is perfect for you.",
    },
    {
      title: "Stand Out in the Community",
      description:
        "Create your Community! Keep track of members while Premium members can add their links via LiveLinks.",
    },
  ];

  const reviews = [
    {
      id: 1,
      text: "Awesome tool! Lorem ipsum present ac massa ligula vel est facilisis iaculis.",
      name: "Olivia Wilson",
      role: "Founder at Borcello",
      avatar: "/api/placeholder/48/48",
      stars: 5,
    },
    {
      id: 2,
      text: "Super cool! Lorem ipsum present ac massa ligula vel est facilisis iaculis.",
      name: "Matt Zhang",
      role: "CEO at Borcello",
      avatar: "/api/placeholder/48/48",
      stars: 5,
    },
    {
      id: 3,
      text: "Awesome tool! Lorem ipsum present ac massa ligula vel est facilisis iaculis.",
      name: "Hannah Morales",
      role: "CFO at Borcello",
      avatar: "/api/placeholder/48/48",
      stars: 5,
    },
  ];

  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
      <div className="col-span-8 space-y-6">
        <PremiumLiveLink />
        <div className="grid grid-cols-3 gap-4">
          {blogItems.map((item, index) => (
            <Blog key={index} title={item.title} description={item.description} />
          ))}
        </div>
        <PremiumReviews reviews={reviews} />
        <NotReadyYet />
      </div>
      <div className="col-span-4 space-y-4">
        <PublicLiveLinks />
        <UpcomingLiveLinks />
      </div>
    </div>
  );
};

export default LiveLinksPage;
