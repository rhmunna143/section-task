import React from "react";
import "./Heading.css";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="heading-container">
      <h1 className="heading-title">{title}</h1>
      <p className="heading-subtitle">{subtitle}</p>
    </div>
  );
};

export default Heading;
