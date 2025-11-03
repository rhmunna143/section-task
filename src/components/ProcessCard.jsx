import React from "react";

const ProcessCard = ({ icon, title, description, isFirst = false }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Vertical connector line */}
      <div
        className={`w-1 h-16 ${
          isFirst ? "bg-[#1e6fff]" : "bg-[rgba(30,111,255,0.2)]"
        }`}
      />

      {/* Card with glassmorphism effect */}
      <div
        className="relative w-[201px] rounded-3xl p-6 flex flex-col items-center text-center"
        style={{
          backgroundColor: isFirst
            ? "rgba(30, 111, 255, 0.06)"
            : "rgba(30, 111, 255, 0.03)",
          border: isFirst ? "1px solid rgba(30, 111, 255, 0.1)" : "none",
          boxShadow:
            "6px 6px 12px rgba(78, 137, 255, 0.50), -6px -6px 12px rgba(249, 252, 255, 0.30)",
        }}
      >
        {/* Icon */}
        <div className="w-[50px] h-[50px] mb-6 -mt-2">
          <div className="icon-container w-46 absolute top-0 left-0 right-0 bottom-0 m-auto z-[-300]">
            <img src="./images/process-bg.svg" alt="" />
          </div>
          
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain relative right-1"
          />
        </div>

        {/* Title */}
        <h3
          className={`text-2xl font-medium mb-1 ${
            isFirst ? "text-[#2a2a2a]" : "text-black"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#333333] leading-[23.8px]">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
