import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { X } from "lucide-react";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  designation: string;
  country: string;
  city: string;
}

const ExplorePeople: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: people,
    isLoading,
    error,
  } = useQuery<Person[]>({
    queryKey: ["explorePeople"],
    queryFn: async () => {
      const response = await fetch("/api/explore");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectedId: userId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to connect: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explorePeople"] });
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-pulse text-gray-500">
            Loading suggestions...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-40">
          <div className="text-red-500">
            {error instanceof Error
              ? error.message
              : "Error fetching suggestions"}
          </div>
        </div>
      </div>
    );
  }

  if (!people?.length) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-40">
          <div className="text-gray-500">No suggestions available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          Explore People based on your Profile
        </h2>
        <button className="text-blue-500 hover:underline text-sm">
          Show All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="relative bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              title="Remove from suggestions"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <X size={18} />
            </button>
            <div className="relative w-16 h-16 mb-3">
              <Image
                src={person.avatar || "/default-avatar.png"}
                alt={`${person.firstName} ${person.lastName}`}
                fill
                className="rounded-full border border-gray-200 object-cover"
                sizes="64px"
              />
            </div>
            <h4 className="text-sm font-medium">{`${person.firstName} ${person.lastName}`}</h4>
            <p className="text-xs text-gray-600">{person.designation}</p>
            <p className="text-xs text-gray-500">{`${person.city}, ${person.country}`}</p>
            <button
              className={`mt-2 px-3 py-1 rounded-lg text-sm ${
                mutation.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={() => mutation.mutate(person.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Connecting..." : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePeople;
