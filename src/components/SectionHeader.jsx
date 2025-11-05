import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "50.1px",
            fontWeight: "bold",
            color: "#0f1724",
            textAlign: "center",
            lineHeight: "1.25",
            margin: 0,
          }}
        >
          {title}
        </h1>

        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "3px",
            background: "linear-gradient(to right, transparent, #1E6FFF 50%, transparent)",
          }}
        ></div>
      </div>

      <p
        style={{
          fontSize: "16.7px",
          color: "#9b9c9d",
          textAlign: "center",
          maxWidth: "742px",
          lineHeight: "25.88px",
          margin: 0,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
