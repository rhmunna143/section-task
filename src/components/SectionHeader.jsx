import React from "react";
import "./SectionHeader.css";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <div className="section-header-top">
        <h1 className="section-header-title">{title}</h1>
        <div className="section-header-line"></div>
      </div>
      <p className="section-header-subtitle">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
