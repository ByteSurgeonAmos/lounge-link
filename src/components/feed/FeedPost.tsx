"use client";
import React, { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Comment } from "@prisma/client";
import { ChainLoader } from "../ChainLoader";

interface CommentWithAuthor extends Comment {
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

interface FeedPostProps {
  post: FeedPostType;
}

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [reposts, setReposts] = useState(post.reposts);
  const [isInteracting, setIsInteracting] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments);

  const toggleCommentModal = () => setShowCommentModal(!showCommentModal);

  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments((prev) => [comment, ...prev]);
        setNewComment("");
        setCommentCount((prev) => prev + 1); // Increment comment count
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (showCommentModal) {
      fetchComments();
    }
  }, [showCommentModal]);

  // Add effect to fetch initial interaction states
  useEffect(() => {
    const fetchInteractionStates = async () => {
      try {
        const response = await fetch(
          `/api/posts/${post.id}/interactions/status`
        );
        if (response.ok) {
          const data = await response.json();
          setLiked(data.isLiked);
          setReposted(data.isReposted);
        }
      } catch (error) {
        console.error("Failed to fetch interaction states:", error);
      }
    };

    fetchInteractionStates();
  }, [post.id]);

  const handleInteraction = async (action: "like" | "repost") => {
    if (isInteracting) return;

    setIsInteracting(true);
    try {
      const currentState = action === "like" ? liked : reposted;

      if (action === "like") {
        setLiked(!currentState);
        setLikes((prev) => prev + (currentState ? -1 : 1));
      } else {
        setReposted(!currentState);
        setReposts((prev) => prev + (currentState ? -1 : 1));
      }

      const response = await fetch(`/api/posts/${post.id}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (action === "like") {
          setLiked(currentState);
          setLikes((prev) => prev + (currentState ? 1 : -1));
        } else {
          setReposted(currentState);
          setReposts((prev) => prev + (currentState ? 1 : -1));
        }
        console.error("Interaction failed:", data.error);
        return;
      }

      setLikes(data.likes);
      setReposts(data.reposts);
      if (action === "like") {
        setLiked(data.isLiked);
      } else {
        setReposted(data.isReposted);
      }
    } catch (error) {
      console.error(`Failed to ${action} post:`, error);
    } finally {
      setIsInteracting(false);
    }
  };

  const handleLike = () => handleInteraction("like");
  const handleRepost = () => handleInteraction("repost");

  const mentionLink = (mention: string) =>
    `/profile/${mention.replace("@", "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 space-y-4"
    >
      {/* Header Section */}
      <div className="flex items-start space-x-4">
        <div className="relative w-12 h-12">
          <Image
            src={post.blogProfile.profilePic}
            alt={post.blogProfile.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">
            {post.blogProfile.name}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            {post.blogProfile.jobTitle && (
              <div className="flex items-center space-x-2">
                <Briefcase className="text-blue-500" size={14} />
                <span>{post.blogProfile.jobTitle}</span>
              </div>
            )}
            {post.blogProfile.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-500" size={14} />
                <span>{post.blogProfile.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Mail className="text-blue-500" size={14} />
              <span>{post.blogProfile.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl text-gray-900">{post.title}</h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        {post.image && (
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt="Post visual content"
              fill
              className="object-cover"
            />
          </div>
        )}
        {post.mentions && post.mentions.length > 0 && (
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <Star className="text-yellow-500" size={16} />
            <span className="font-medium">Mentions:</span>
            <div className="flex flex-wrap gap-2">
              {post.mentions.map((mention, idx) => (
                <a
                  key={idx}
                  href={`/profile/${mention.replace("@", "")}`}
                  className="text-blue-500 hover:text-blue-600 hover:underline"
                >
                  {mention}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="relative w-8 h-8">
          <Image
            src={post.user.avatar}
            alt="User avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex items-center space-x-6">
          <motion.button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            onClick={toggleCommentModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} />
            <span className="text-sm">{commentCount}</span>
          </motion.button>

          <motion.button
            className={`flex items-center space-x-2 ${
              liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            } transition-colors`}
            onClick={handleLike}
            disabled={isInteracting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
            <span className="text-sm">{likes}</span>
          </motion.button>

          <motion.button
            className={`flex items-center space-x-2 ${
              reposted ? "text-green-500" : "text-gray-600 hover:text-green-500"
            } transition-colors`}
            onClick={handleRepost}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Repeat size={18} />
            <span className="text-sm">{reposts}</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share size={18} />
            <span className="text-sm">{post.shares}</span>
          </motion.button>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-gray-50 rounded-lg p-4"
        >
          <h3 className="font-medium text-lg mb-4">Comments</h3>
          <div className="space-y-4">
            {isLoadingComments ? (
              <div className="text-center py-4">
                <ChainLoader />
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg p-3 shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="relative w-8 h-8">
                      <Image
                        src={comment.author.avatar || "/default-avatar.png"}
                        alt="Commenter"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {comment.author.firstName} {comment.author.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <ReactMarkdown className="prose prose-sm">
                    {comment.content}
                  </ReactMarkdown>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No comments yet.</p>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a comment... (Markdown supported)"
              rows={3}
              disabled={isPostingComment}
            />
            <motion.button
              onClick={handleCommentSubmit}
              className={`w-full py-2 bg-blue-500 text-white rounded-lg transition-colors ${
                isPostingComment
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
              whileHover={{ scale: isPostingComment ? 1 : 1.02 }}
              whileTap={{ scale: isPostingComment ? 1 : 0.98 }}
              disabled={isPostingComment}
            >
              {isPostingComment ? "Posting..." : "Post Comment"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeedPost;
