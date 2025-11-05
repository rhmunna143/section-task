import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "56px",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "48px",
          color: "#0F1724",
          marginTop: "16px",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          width: "50%",
          textAlign: "center",
          margin: "0 auto",
          color: "#9B9C9D",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default Heading;
