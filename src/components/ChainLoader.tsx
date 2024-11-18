import React from "react";

export const ChainLoader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px]">
      <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
        <g className="animate-chain">
          <path
            d="M10,15 A5,5 0 1,1 20,15 A5,5 0 1,1 10,15"
            className="stroke-custom-blue"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M40,15 A5,5 0 1,1 50,15 A5,5 0 1,1 40,15"
            className="stroke-custom-blue"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M70,15 A5,5 0 1,1 80,15 A5,5 0 1,1 70,15"
            className="stroke-custom-blue"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M100,15 A5,5 0 1,1 110,15 A5,5 0 1,1 100,15"
            className="stroke-custom-blue"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M20,15 L40,15"
            className="stroke-custom-blue"
            strokeWidth="3"
          />
          <path
            d="M50,15 L70,15"
            className="stroke-custom-blue"
            strokeWidth="3"
          />
          <path
            d="M80,15 L100,15"
            className="stroke-custom-blue"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  );
};
