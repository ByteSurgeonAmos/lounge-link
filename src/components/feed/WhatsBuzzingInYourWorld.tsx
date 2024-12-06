import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

const WhatsBuzzingInYourWorld = () => {
  // Data for the dynamic items
  const items = [
    {
      id: 1,
      title: "Career Switchers",
      description: "Support and tips for transitioning into new industries or roles.",
      imageUrl: "/path-to-career-switchers-image.jpg",
    },
    {
      id: 2,
      title: "UI/UX Designers Hub",
      description: "A group for UI/UX designers to discuss trends, tools, and career growth.",
      imageUrl: "/path-to-ui-ux-image.jpg",
    },
    {
      id: 3,
      title: "Pitch Perfect Circle",
      description: "Share and refine pitch ideas for startups.",
      imageUrl: "/path-to-pitch-perfect-image.jpg",
    },
  ];

  return (
    <Card className="bg-custom-blue p-4 rounded-lg">
      <CardHeader>
        <CardTitle>What's Buzzing in Your World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-black">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { WhatsBuzzingInYourWorld };
