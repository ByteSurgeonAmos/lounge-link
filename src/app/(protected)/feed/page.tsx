"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import FeedPost from "@/components/feed/FeedPost";
import FeedSidebar from "@/components/feed/FeedSidebar";
import { FeedPost as FeedPostType } from "../../../../types/feed";
import { ChainLoader } from "@/components/ChainLoader";

const POSTS_PER_PAGE = 20;

const FeedPage = () => {
  const [feedPosts, setFeedPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPosts = async (cursor?: string) => {
    try {
      const url = `/api/feed?limit=${POSTS_PER_PAGE}${
        cursor ? `&cursor=${cursor}` : ""
      }`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (cursor) {
          setFeedPosts((prev) => [...prev, ...data.items]);
        } else {
          setFeedPosts(data.items);
        }
        setNextCursor(data.nextCursor || null);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !loadingMore) {
          setLoadingMore(true);
          fetchPosts(nextCursor);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [nextCursor, loadingMore]);

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
          <div ref={observerTarget} className="h-10">
            {loadingMore && <ChainLoader />}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <FeedSidebar />
      </div>
    </main>
  );
};

export default FeedPage;
