import React from "react";
import { Link } from "lucide-react";

const SuggestedLinks = () => {
  const suggestions = [
    {
      id: 1,
      name: "Alfredo Torres",
      role: "Product Designers",
      avatarUrl: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Product Designers",
      avatarUrl: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Janet Doe",
      role: "Product Designers",
      avatarUrl: "https://via.placeholder.com/32",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-custom-blue to-custom-blue/90 p-6 rounded-xl w-full border border-white/10 shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">Suggested Links</h2>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between group hover:bg-white/5 p-2 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={suggestion.avatarUrl}
                alt={`${suggestion.name}'s avatar`}
                className="w-10 h-10 rounded-full border-2 border-white/10"
              />
              <div>
                <p className="text-white font-semibold text-sm">
                  {suggestion.name}
                </p>
                <p className="text-white/60 text-xs">{suggestion.role}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Link size={18} className="text-white/80 hover:text-white" />
            </button>
          </div>
        ))}
      </div>

      <button className="flex items-center text-white/80 hover:text-white mt-6 text-sm font-medium transition-colors duration-200 group">
        View all Suggestions
        <span className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200">
          →
        </span>
      </button>
    </div>
  );
};

export default SuggestedLinks;
