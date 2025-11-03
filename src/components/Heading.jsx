import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center mt-14">
      <h1 className="font-bold text-5xl text-[#0F1724] mt-4">{title}</h1>
      <div className="w-"></div>
      <p className="w-1/2 text-center mx-auto text-White-Mode-For-Design-Paragraph text-[#9B9C9D]">
        {subtitle}
      </p>
    </div>
  );
};

export default Heading;
