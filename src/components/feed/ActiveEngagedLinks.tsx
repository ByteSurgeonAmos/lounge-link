// ActiveEngagedLinks.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { motion } from "framer-motion";

const ActiveEngagedLinks = () => {
  const links = [
    {
      id: 1,
      name: "Alfredo Torres",
      role: "Product Designer, NBO",
      avatar: "https://via.placeholder.com/40", // Replace with real avatar URL
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Marketing Expert, MSA",
      avatar: "https://via.placeholder.com/40", // Replace with real avatar URL
    },
    {
      id: 3,
      name: "Janet Doe",
      role: "Digital Consultant, NYC",
      avatar: "https://via.placeholder.com/40", // Replace with real avatar URL
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % links.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [links.length]);

  return (
    <Card className="w-86 bg-teal-500 text-white">
      <CardHeader>
        <CardTitle>Active Engaged Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={link.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={link.avatar}
                  alt={link.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{link.name}</h4>
                  <p className="text-sm">{link.role}</p>
                </div>
              </div>
              <motion.div
                animate={
                  activeIndex === index
                    ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1, 1] }
                    : {}
                }
                transition={{ duration: 0.5, repeat: activeIndex === index ? Infinity : 0 }}
                className="text-yellow-300 text-2xl"
              >
                👋
              </motion.div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ActiveEngagedLinks };
