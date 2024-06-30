import React from "react";

const AnimatedLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:"60vh"
      }}
    >
      <svg
        version="1.1"
        id="L2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100" // Adjusted viewBox to resize
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
        width="50px" // Adjusted width
        height="50px" // Adjusted height
      >
        <circle
          fill="none"
          stroke="white"
          strokeWidth="3" // Adjusted strokeWidth for smaller size
          strokeLinecap="round"
          strokeMiterlimit="10"
          cx="50"
          cy="50"
          r="48"
        />
        <line
          fill="none"
          strokeLinecap="round"
          stroke="white"
          strokeWidth="2" // Adjusted strokeWidth for smaller size
          strokeMiterlimit="10"
          x1="50"
          y1="50"
          x2="85"
          y2="50.5"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          strokeLinecap="round"
          stroke="white"
          strokeWidth="2" // Adjusted strokeWidth for smaller size
          strokeMiterlimit="10"
          x1="50"
          y1="50"
          x2="49.5"
          y2="74"
        >
          <animateTransform
            attributeName="transform"
            dur="15s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </div>
  );
};

export default AnimatedLoader;
