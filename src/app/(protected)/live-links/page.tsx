"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PremiumLiveLink from "@/components/live-links/PremiumLiveLink";
import Blog from "@/components/live-links/Blog";
import PremiumReviews from "@/components/live-links/PremiumReviews";
import NotReadyYet from "@/components/live-links/NotReadyYet";
import { PublicLiveLinks } from "@/components/live-links/PublicLiveLinks";
import { UpcomingLiveLinks } from "@/components/live-links/UpcomingLiveLinks";
import { ChainLoader } from "@/components/ChainLoader";

interface BlogItem {
  title: string;
  description: string;
}

const LiveLinksPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
  });

  const {
    data: blogItems = [],
    isLoading: blogsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      return response.json();
    },
    staleTime: 2 * 60 * 1000,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await fetch("/api/reviews");
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const {
    data: liveLinksData,
    isLoading: liveLinksLoading,
    error: liveLinksError,
  } = useQuery({
    queryKey: ["liveLinks", page],
    queryFn: async () => {
      const response = await fetch(
        `/api/live-links?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch live links");
      return response.json();
    },
  });

  if (userLoading || blogsLoading || reviewsLoading || liveLinksLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ChainLoader />
      </div>
    );
  }

  if (userError || blogsError || liveLinksError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
      <div className="col-span-8 space-y-6">
        {user?.subscriptionTier == "FREE" ? (
          <PremiumLiveLink />
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800">
              create LiveLinks and host your own events!
            </p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {blogItems.map((item: BlogItem, index: any) => (
            <Blog
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <PremiumReviews reviews={reviews} />
        <NotReadyYet />
      </div>
      <div className="col-span-4 space-y-4">
        <PublicLiveLinks liveLinks={liveLinksData?.items || []} />
        <UpcomingLiveLinks />
      </div>
      <div className="col-span-12 flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {liveLinksData?.totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= (liveLinksData?.totalPages || 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiveLinksPage;
