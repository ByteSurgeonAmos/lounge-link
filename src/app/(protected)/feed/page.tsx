// File: pages/feed/FeedPage.tsx

import React from "react";
import FeedPost from "@/components/feed/FeedPost";
import FeedSidebar from "@/components/feed/FeedSidebar";

const FeedPage = () => {
  const feedPosts = [
    {
      id: 1,
      blogProfile: {
        profilePic: "/api/placeholder/48/48",
        name: "Jane Doe",
        jobTitle: "Product Designer at Door Drum",
        location: "Nairobi, Kenya",
        email: "jane.doe@doordrum.com",
      },
      user: {
        avatar: "/api/placeholder/24/24",
      },
      title: "The power of collaboration!",
      content:
        "This week, I had the privilege of connecting with three amazing founders, and we brainstormed ideas to amplify their startup brands. Here's one insight I'd love to share.",
      mentions: ["@Chinedu", "@Amina B.", "@Yusuf"],
      timestamp: "2023-11-28T10:00:00Z",
      likes: 56,
      comments: 18,
      reposts: 9,
      shares: 4,
    },
    {
      id: 2,
      blogProfile: {
        profilePic: "/api/placeholder/48/48",
        name: "John Doe",
        jobTitle: "Founder at GripCo",
        location: "Accra, Ghana",
        email: "john.doe@gripco.com",
      },
      user: {
        avatar: "/api/placeholder/24/24",
      },
      title: "Big news for GripCo!",
      content:
        "After months of late nights and countless brainstorming sessions, we're finally rolling out beta testing for Gripco—a payment solution built to empower African SMEs.",
      image: "/api/placeholder/640/360",
      timestamp: "2023-11-28T10:00:00Z",
      likes: 124,
      comments: 36,
      reposts: 15,
      shares: 8,
    },
  ];

  return (
    <main className="min-h-screen grid grid-cols-12 gap-6 p-6 bg-gray-100">
      <div className="col-span-8">
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="col-span-4">
        <FeedSidebar />
      </div>
    </main>
  );
};

export default FeedPage;
