import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

const WhatsBuzzingInYourWorld = () => {
  return (
    <Card className="bg-teal-500 p-6 rounded-lg">
      <CardHeader>
        <CardTitle>What's Buzzing in Your World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Career Switchers */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <img
                src="/path-to-career-switchers-image.jpg"
                alt="Career Switchers"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-black">Career Switchers</h4>
                <p className="text-gray-600 text-sm">
                  Support and tips for transitioning into new industries or roles.
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* UI/UX Designers Hub */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <img
                src="/path-to-ui-ux-image.jpg"
                alt="UI/UX Designers Hub"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-black">UI/UX Designers Hub</h4>
                <p className="text-gray-600 text-sm">
                  A group for data analysts to discuss trends, tools, and career growth.
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Pitch Perfect Circle */}
          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <img
                src="/path-to-pitch-perfect-image.jpg"
                alt="Pitch Perfect Circle"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-black">Pitch Perfect Circle</h4>
                <p className="text-gray-600 text-sm">
                  Share and refine pitch ideas for startups.
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { WhatsBuzzingInYourWorld };
