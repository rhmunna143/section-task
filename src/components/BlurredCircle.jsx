import React from "react";
import "./BlurredCircle.css";

const BlurredCircle = ({ 
  size = 238, 
  color = "#1e6fff", 
  blurAmount = 420,
  className = "" 
}) => {
  return (
    <div
      className={`blurred-circle ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: `blur(${blurAmount}px)`,
      }}
    />
  );
};

export default BlurredCircle;