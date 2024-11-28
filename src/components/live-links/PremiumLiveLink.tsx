import React from "react";

const PremiumLiveLink: React.FC = () => {
  return (
    <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Looks Like You Want to Create a LiveLink</h2>
      <p className="mb-4">
        LiveLinks is a Premium Feature! Upgrade now to create and manage your own LiveLinks. Over
        10,000 Premium members are already using LiveLinks. Don’t miss out!
      </p>
      <button className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600">
        Upgrade to Premium
      </button>
    </div>
  );
};

export default PremiumLiveLink;
