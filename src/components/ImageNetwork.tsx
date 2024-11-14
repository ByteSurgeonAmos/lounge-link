"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const imageList = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
];

const ImageNetwork = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const networkContainer: any =
        document.querySelector(".network-container");
      const rect = networkContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const index = Math.floor((x / rect.width) * imageList.length);
      setHoverIndex(index);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="network-container relative w-full h-full">
      <svg
        className="svg-lines absolute inset-0 w-full h-full"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Draw lines between the bubbles using <line> or <path> elements */}
        <line
          x1="50"
          y1="50"
          x2="150"
          y2="150"
          stroke="#ccc"
          strokeDasharray="5,5"
        />
        <line
          x1="150"
          y1="150"
          x2="250"
          y2="50"
          stroke="#ccc"
          strokeDasharray="5,5"
        />
        <line
          x1="150"
          y1="150"
          x2="50"
          y2="250"
          stroke="#ccc"
          strokeDasharray="5,5"
        />
        <line
          x1="150"
          y1="150"
          x2="250"
          y2="250"
          stroke="#ccc"
          strokeDasharray="5,5"
        />
        {/* Add more lines as needed to create the network effect */}
      </svg>

      <div className="bubble-grid absolute inset-0 w-full h-full flex justify-center items-center">
        {imageList.map((src, index) => (
          <div
            key={index}
            className={`bubble relative w-20 h-20 mx-4 my-4 transition-transform duration-300 ${
              hoverIndex === index ? "scale-125" : ""
            }`}
          >
            <Image
              src={src}
              alt={`Bubble ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="circle-image bg-white rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageNetwork;
