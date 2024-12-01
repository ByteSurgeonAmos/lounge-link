import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";
import { Send } from "lucide-react";

interface ChatWindowProps {
  chatId: string;
  otherUser: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
  };
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  otherUser,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, refetch } = useQuery({
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
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
