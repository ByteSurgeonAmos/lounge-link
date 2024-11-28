import React from "react";

interface BlogProps {
  title: string;
  description: string;
}

const Blog: React.FC<BlogProps> = ({ title, description }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Blog;
