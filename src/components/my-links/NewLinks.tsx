import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { ChainLoader } from "../ChainLoader";

interface NewLink {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    designation: string;
  };
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  type: "sent" | "received";
}

const NewLinks: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: links, isLoading } = useQuery({
    queryKey: ["newConnections"],
    queryFn: async () => {
      const response = await fetch("/api/connections");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: "accept" | "reject";
    }) => {
      const response = await fetch(`/api/connections/${id}/respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${action}: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newConnections"] });
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-40">
          <ChainLoader />
        </div>
      </div>
    );
  }

  const pendingLinks = links?.filter(
    (link: any) => link.status === "PENDING" && link.type === "received"
  );

  if (!pendingLinks?.length) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Links</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">No pending connection requests</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">New Links</h2>
        {pendingLinks.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {pendingLinks.length}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {pendingLinks.map((link: any) => (
          <div
            key={link.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={link.user.avatar || "/default-avatar.png"}
                  alt={`${link.user.firstName} ${link.user.lastName}`}
                  fill
                  className="rounded-full border border-gray-200 object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium">{`${link.user.firstName} ${link.user.lastName}`}</h4>
                <p className="text-xs text-gray-600">{link.user.designation}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() =>
                  mutation.mutate({ id: link.id, action: "accept" })
                }
                disabled={mutation.isPending}
                title="Accept connection"
              >
                <Check size={20} />
              </button>
              <button
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() =>
                  mutation.mutate({ id: link.id, action: "reject" })
                }
                disabled={mutation.isPending}
                title="Ignore connection"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewLinks;
