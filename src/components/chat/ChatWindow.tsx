import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";
import { Send } from "lucide-react";
import { ChainLoader } from "../ChainLoader";

interface ChatWindowProps {
  chatId: string;
  otherUser: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
  });
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  otherUser,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: messages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/messages/${chatId}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      return response.json();
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, chatId }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      return response.json();
    },
    onSuccess: () => {
      setMessage("");
    },
  });

  const markAsRead = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/messages/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      });
      if (!response.ok) throw new Error("Failed to mark messages as read");
      return response.json();
    },
  });

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat_${chatId}`);
    channel.bind("new-message", () => {
      refetch();
    });

    return () => {
      pusherClient.unsubscribe(`chat_${chatId}`);
    };
  }, [chatId, refetch]);

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (!messagesContainer) return;

    const isNearBottom =
      messagesContainer.scrollHeight - messagesContainer.scrollTop <=
      messagesContainer.clientHeight + 100;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Remove the useEffect that automatically marks messages as read
  // This was causing the issue:
  // useEffect(() => {
  //   markAsRead.mutate();
  // }, [chatId]);

  // Add new intersection observer logic
  const observerRef = useRef<IntersectionObserver | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messagesContainerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          markAsRead.mutate();
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(messagesContainerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [chatId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        {" "}
        <ChainLoader />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src={otherUser.avatar || "/default-avatar.png"}
              alt={`${otherUser.firstName} ${otherUser.lastName}`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{`${otherUser.firstName} ${otherUser.lastName}`}</h3>
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages?.map((msg: any) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === otherUser.id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === otherUser.id
                  ? "bg-gray-100"
                  : "bg-blue-500 text-white"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
                {msg.senderId !== otherUser.id && msg.read && (
                  <p className="text-xs opacity-70">
                    Read {msg.readAt ? formatDateTime(msg.readAt) : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim()) {
              sendMessage.mutate(message);
            }
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim() || sendMessage.isPending}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
