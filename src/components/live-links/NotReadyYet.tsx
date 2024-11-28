import React from "react";

const NotReadyYet: React.FC = () => {
  return (
    <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Not Ready Yet?</h2>
      <p className="mb-4">
        We will remind you again to join Premium. Keep exploring upcoming Public LiveLinks and see
        what’s going on in the Community.
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
        Keep Exploring
      </button>
    </div>
  );
};

export default NotReadyYet;
