import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { MessageCircle, Trash2 } from "lucide-react";
import { ChatWindow } from "../chat/ChatWindow";
import { ChainLoader } from "../ChainLoader";

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
  const [error, setError] = useState<string | null>(null);
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
      const data = await response.json();
      console.log("Chat creation response:", data);
      return data;
    },
    onSuccess: (data) => {
      if (!data.chatId) {
        setError("No chat ID received from server");
        return;
      }

      const userConnection = connections?.find(
        (c: Connection) => c.user.id === data.recipientId
      );

      if (!userConnection) {
        setError("Could not find user information");
        return;
      }

      setActiveChat({
        chatId: data.chatId,
        user: userConnection.user,
      });
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      console.error("Chat creation error:", error);
    },
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    }[status];

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses}`}>
        {status.toLowerCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-md bg-teal-100 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">
            <ChainLoader />
          </div>
        </div>
      </div>
    );
  }

  const filteredConnections = connections?.filter(
    (connection: Connection) =>
      connection.user.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      connection.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 w-full max-w-full sm:max-w-md bg-custom-blue rounded-lg shadow-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {activeChat ? (
        <div className="h-[500px] flex flex-col">
          <button
            onClick={() => setActiveChat(null)}
            className="mb-4 text-sm text-blue-500 hover:underline"
          >
            ← Back to connections
          </button>
          <div className="flex-1 bg-white rounded-lg overflow-hidden">
            <ChatWindow
              chatId={activeChat.chatId}
              otherUser={activeChat.user}
            />
          </div>
        </div>
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
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{`${connection.user.firstName} ${connection.user.lastName}`}</h3>
                        {getStatusBadge(connection.status)}
                      </div>
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
                    {connection.status === "ACCEPTED" && (
                      <button
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() =>
                          messageMutation.mutate(connection.user.id)
                        }
                        disabled={messageMutation.isPending}
                        title="Send message"
                      >
                        <MessageCircle size={20} />
                      </button>
                    )}
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
