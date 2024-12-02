import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { MessageCircle, Trash2 } from "lucide-react";
import { ChatWindow } from "../chat/ChatWindow";

interface Connection {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    designation: string;
  };
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
}

interface ActiveChat {
  chatId: string;
  user: Connection["user"];
}

const ManageLinks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
  const queryClient = useQueryClient();

  const { data: connections, isLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const response = await fetch("/api/connections");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const response = await fetch(`/api/connections/${connectionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
  });

  const messageMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId: userId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      // Assuming the API returns { chatId: string }
      if (data.chatId) {
        setActiveChat({
          chatId: data.chatId,
          user: connections.find((c: Connection) => c.user.id === data.userId)
            ?.user!,
        });
      }
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-md bg-teal-100 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">
            Loading connections...
          </div>
        </div>
      </div>
    );
  }

  const filteredConnections = connections?.filter(
    (connection: Connection) =>
      connection.status === "ACCEPTED" &&
      (connection.user.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        connection.user.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-md bg-teal-100 rounded-lg shadow-lg">
      {activeChat ? (
        <>
          <button
            onClick={() => setActiveChat(null)}
            className="mb-4 text-sm text-blue-500 hover:underline"
          >
            ← Back to connections
          </button>
          <ChatWindow chatId={activeChat.chatId} otherUser={activeChat.user} />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Manage Links</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 mb-4"
          />
          {filteredConnections?.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No connections found
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredConnections?.map((connection: Connection) => (
                <li
                  key={connection.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={connection.user.avatar || "/default-avatar.png"}
                        alt={`${connection.user.firstName} ${connection.user.lastName}`}
                        fill
                        className="rounded-full border border-gray-200 object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{`${connection.user.firstName} ${connection.user.lastName}`}</h3>
                      <p className="text-sm text-gray-600">
                        {connection.user.designation}
                      </p>
                      <p className="text-xs text-gray-400">
                        {`Connected ${new Date(
                          connection.createdAt
                        ).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => messageMutation.mutate(connection.user.id)}
                      disabled={messageMutation.isPending}
                      title="Send message"
                    >
                      <MessageCircle size={20} />
                    </button>
                    <button
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => deleteMutation.mutate(connection.id)}
                      disabled={deleteMutation.isPending}
                      title="Remove connection"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ManageLinks;
