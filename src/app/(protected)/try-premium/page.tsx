// src/components/TryPremiumPage.tsx
import React from "react";

const TryPremiumPage: React.FC = () => {
  // Dynamic data for users
  const Users = [
    { name: "Alice", profileImage: "/path/to/alice.jpg" },
    { name: "Bob", profileImage: "/path/to/bob.jpg" },
    { name: "Charlie", profileImage: "/path/to/charlie.jpg" },
    { name: "Diana", profileImage: "/path/to/diana.jpg" },
    { name: "Eve", profileImage: "/path/to/eve.jpg" },
  ];

  // Dynamic data for features
  const Features = [
    {
      title: "Create and Host Meetups",
      description: "Plan exclusive meetups, build a trusted circle, and strengthen your professional network.",
      image: "/path/to/meetups.jpg",
    },
    {
      title: "Build Authentic Relationships",
      description: "Turn online connections into meaningful real-life experiences. Your network, your way.",
      image: "/path/to/relationships.jpg",
    },
    {
      title: "Stand Out in the Community",
      description: "Keep exclusive or relevant connections front and center, making networking simpler.",
      image: "/path/to/community.jpg",
    },
  ];

  // Function to render avatars
  const renderUsers = () => {
    const maxVisible = 4;
    const visibleUsers = Users.slice(0, maxVisible);
    const remainingCount = Users.length - maxVisible;

    return (
      <div className="flex -space-x-2">
        {visibleUsers.map((user, index) => (
          <img
            key={index}
            src={user.profileImage}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-white"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Header */}
      <header className="text-center max-w-2xl mb-6">
        <div className="flex items-center space-x-2 justify-center">
          {renderUsers()}
          <p className="text-gray-600">
            Join <strong>Jane Doe</strong> and millions of other members using Premium
          </p>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Discover the Right Connections, Build Trusted Relationships
        </h1>
      </header>

      {/* Offer Section */}
      <section className="bg-gray-100 rounded-lg p-6 text-center shadow-md max-w-xl w-full">
        <p className="text-gray-700 text-lg">
          Enjoy a <strong>1-month free trial</strong> on us. Cancel anytime. We'll send you a reminder 7 days before your trial ends.
        </p>
        <div className="my-4">
          <span className="line-through text-gray-400">$XXX</span>
          <span className="text-green-600 text-xl font-bold ml-2">$0 One Month Free Trial</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          After your free month, pay as little as <strong>$XXX*/month</strong> (save 20% when billed annually). Cancel anytime. We'll remind you 7 days before your trial ends.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Try One Month for Free
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            Get Annual Plan
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="text-center mt-8">
        <h2 className="text-5xl font-bold text-blue-600">50X</h2>
        <p className="text-gray-600 mt-2">
          Premium subscribers have 50x more connections on average
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 text-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-center gap-4 mt-8">
        <a href="#features" className="text-blue-600 text-sm hover:underline">
          Show all Features
        </a>
        <a href="#faq" className="text-blue-600 text-sm hover:underline">
          FAQ
        </a>
      </footer>
    </div>
  );
};

export default TryPremiumPage;