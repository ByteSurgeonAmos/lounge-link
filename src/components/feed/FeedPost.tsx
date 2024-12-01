// File: components/feed/FeedPost.tsx
"use client";
import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Briefcase,
  MessageCircle,
  Heart,
  Repeat,
  Share,
  Star,
} from "lucide-react";
import { FeedPost as FeedPostType } from "../../../types/feed";

interface FeedPostProps {
  post: FeedPostType;
}

import { motion } from "framer-motion";

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState<string[]>([]); // Dynamic comments
  const [newComment, setNewComment] = useState(""); // New comment input
  const [liked, setLiked] = useState(false); // Like state
  const [reposted, setReposted] = useState(false); // Repost state

  const toggleCommentModal = () => setShowCommentModal(!showCommentModal);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleLike = () => setLiked(!liked);

  const handleRepost = () => setReposted(!reposted);

  // Generate mention links (can be customized for user profiles)
  const mentionLink = (mention: string) =>
    `/profile/${mention.replace("@", "")}`;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Header Section */}
      <div className="flex items-start space-x-4">
        <img
          src={post.blogProfile.profilePic}
          alt={post.blogProfile.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg">{post.blogProfile.name}</h3>
          <div className="text-gray-600 space-y-1">
            <div className="flex items-center space-x-1">
              <Briefcase className="text-blue-500" size={16} />
              <span>{post.blogProfile.jobTitle}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="text-blue-500" size={16} />
              <span>{post.blogProfile.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="text-blue-500" size={16} />
              <span>{post.blogProfile.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div>
        <h2 className="font-bold text-xl mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post visual content"
            className="w-full h-auto rounded-lg"
          />
        )}
        {post.mentions && (
          <div className="mt-4 flex items-center space-x-2 text-gray-600">
            <p className="flex items-center space-x-2">
              <strong>Mentions: </strong>
              {post.mentions.map((mention, idx) => (
                <a
                  key={idx}
                  href={mentionLink(mention)}
                  className="text-blue-500 hover:underline"
                >
                  {mention}
                </a>
              ))}
            </p>
            <Star className="text-yellow-500" size={16} />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between border-t pt-4">
        {/* User Avatar */}
        <img
          src={post.user.avatar}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        {/* Interaction Icons */}
        <div className="flex items-center space-x-6 text-gray-600">
          {/* Comment */}
          <button
            className="flex items-center space-x-1 hover:text-blue-500"
            onClick={toggleCommentModal}
          >
            <MessageCircle size={16} />
            <span>{post.comments}</span>
          </button>

          {/* Like */}
          <motion.button
            className={`flex items-center space-x-1 ${
              liked ? "text-red-500" : "hover:text-blue-500"
            }`}
            onClick={handleLike}
            whileTap={{ scale: 1.3 }}
          >
            <Heart size={16} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </motion.button>

          {/* Repost */}
          <motion.button
            className={`flex items-center space-x-1 ${
              reposted ? "text-green-500" : "hover:text-blue-500"
            }`}
            onClick={handleRepost}
            whileTap={{ rotate: 15, scale: 1.2 }}
          >
            <Repeat size={16} />
            <span>{post.reposts + (reposted ? 1 : 0)}</span>
          </motion.button>

          {/* Share */}
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <Share size={16} />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="bg-gray-100 rounded-lg p-4 mt-4 transition duration-300 ease-in-out transform opacity-100 scale-100">
          <h3 className="font-medium text-lg mb-2">Comments</h3>
          <ul className="space-y-2 mb-4">
            {comments.length > 0 ? (
              comments.map((comment, idx) => (
                <li key={idx} className="bg-gray-200 rounded p-2">
                  {comment}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No comments yet.</li>
            )}
          </ul>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedPost;
