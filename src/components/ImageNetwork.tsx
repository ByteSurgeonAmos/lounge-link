import React from "react";
import Image from "next/image";

const imageList = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image6.jpg",
  "/image7.jpg",
  "/image8.jpg",
];

const ImageNetwork = () => {
  return (
    <div className="network-container">
      <svg
        className="svg-lines"
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

      <div className="bubble-grid">
        {imageList.map((src, index) => (
          <div key={index} className="bubble">
            <Image
              src={src}
              alt={`Bubble ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="circle-image bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageNetwork;
