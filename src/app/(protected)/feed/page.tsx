"use client";
import React, { useEffect, useState } from "react";
import FeedPost from "@/components/feed/FeedPost";
import FeedSidebar from "@/components/feed/FeedSidebar";
import { FeedPost as FeedPostType } from "../../../../types/feed";
import { ChainLoader } from "@/components/ChainLoader";

const FeedPage = () => {
  const [feedPosts, setFeedPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/feed");
        if (response.ok) {
          const data = await response.json();
          setFeedPosts(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ChainLoader />
      </div>
    );
  }

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
