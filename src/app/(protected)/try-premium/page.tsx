"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { PaystackButton } from "react-paystack";

const TryPremiumPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); // Track selected plan

  const handlePlanClick = (plan: string) => {
    setSelectedPlan(plan); // Set the selected plan
    handleSubscribe(plan); // Call the subscription handler
  };

  const handlePaystackSuccess = async (
    reference: string,
    amount: number,
    plan: string
  ) => {
    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference,
          amount,
          plan,
          userId: session?.user?.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Payment successful!");
        router.push("/dashboard");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubscribe = (plan: string) => {
    const monthlyPrice = 20;
    const annualDiscount = 0.8; // 20% discount
    const amountUSD =
      plan === "monthly" ? monthlyPrice : monthlyPrice * 12 * annualDiscount;

    const amountKES = Math.round(amountUSD * 135); // Convert to KES (1 USD ≈ 135 KES)

    const config = {
      email: session?.user?.email!,
      amount: amountKES, // Changed from undefined to amountKES
      currency: "KES",
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        userId: session?.user?.id,
        plan,
        amountUSD,
        custom_fields: [
          {
            display_name: "Plan Type",
            variable_name: "plan_type",
            value: plan,
          },
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: session?.user?.id || "",
          },
        ],
      },
      plan:
        plan === "monthly"
          ? process.env.NEXT_PUBLIC_PAYSTACK_MONTHLY_PLAN
          : process.env.NEXT_PUBLIC_PAYSTACK_ANNUAL_PLAN,
      text: "Pay Now",
      onSuccess: (response: any) => {
        console.log(response);
        handlePaystackSuccess(response.reference, amountUSD, plan);
      },
      onClose: () => toast.error("Payment cancelled"),
    };

    return <PaystackButton {...config} />;
  };

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
      description:
        "Plan exclusive meetups, build a trusted circle, and strengthen your professional network.",
      image: "/path/to/meetups.jpg",
    },
    {
      title: "Build Authentic Relationships",
      description:
        "Turn online connections into meaningful real-life experiences. Your network, your way.",
      image: "/path/to/relationships.jpg",
    },
    {
      title: "Stand Out in the Community",
      description:
        "Keep exclusive or relevant connections front and center, making networking simpler.",
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

  const monthlyPrice = 20;
  const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
  const monthlySavings = monthlyPrice * 12 - annualPrice;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Header */}
      <header className="text-center max-w-2xl mb-6">
        <div className="flex items-center space-x-2 justify-center">
          {renderUsers()}
          <p className="text-gray-600">
            Join <strong>Jane Doe</strong> and millions of other members using
            Premium
          </p>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Discover the Right Connections, Build Trusted Relationships
        </h1>
      </header>

      {/* Offer Section */}
      <section className="bg-gray-100 rounded-lg p-6 text-center shadow-md max-w-xl w-full">
      <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Plan */}
        <div
          onClick={() => handlePlanClick("monthly")}
          className={`bg-white p-6 rounded-lg shadow cursor-pointer 
            ${
              selectedPlan === "monthly"
                ? "border-2 border-blue-500"
                : "border border-transparent"
            } 
            hover:border-blue-500`}
        >
          <h3 className="text-xl font-semibold mb-2">Monthly</h3>
          <p className="text-3xl font-bold text-blue-600">${monthlyPrice}</p>
          <p className="text-gray-600 mb-4">per month</p>
        </div>

        {/* Annual Plan */}
        <div
          onClick={() => handlePlanClick("annual")}
          className={`bg-white p-6 rounded-lg shadow cursor-pointer 
            ${
              selectedPlan === "annual"
                ? "border-2 border-blue-500"
                : "border border-transparent"
            } 
            hover:border-blue-500`}
        >
          <h3 className="text-xl font-semibold mb-2">Annual</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${(annualPrice / 12).toFixed(2)}
          </p>
          <p className="text-gray-600 mb-2">per month</p>
          <p className="text-sm text-green-600 mb-4">
            Save ${monthlySavings.toFixed(2)} per year
          </p>
          <div className="mt-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Best Value
            </span>
          </div>
        </div>
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
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 text-center"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {feature.description}
              </p>
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
