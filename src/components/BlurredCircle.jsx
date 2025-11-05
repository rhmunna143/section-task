import React from "react";

const BlurredCircle = ({ 
  size = 238, 
  color = "#1e6fff", 
  blurAmount = 420,
  className = "" 
}) => {
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: `blur(${blurAmount}px)`,
        borderRadius: "50%",
      }}
    />
  );
};

export default BlurredCircle;