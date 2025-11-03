import React from "react";

const ProcessCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Timeline Point - sitting ON the timeline (intersecting) */}
      <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 z-30">
        <div
          className="timeline-point-outer relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-1000"
          style={{
            background: "rgba(30, 111, 255, 0.2)",
          }}
        >
          <span
            className="timeline-point-inner block w-2 h-2 rounded-full transition-all duration-1000"
            style={{
              background: "transparent",
            }}
          ></span>
        </div>
      </div>

      {/* Vertical connector line with animated fill effect */}
      <div className="vertical-line-container relative w-1 h-16 bg-[rgba(30,111,255,0.1)]">
        <div
          className="vertical-line-fill absolute top-0 left-0 w-full transition-all duration-1000 ease-out"
          style={{
            height: "0%",
            background: "#1e6fff",
          }}
        ></div>
      </div>

      {/* Card with glassmorphism effect */}
      <div
        className="card-content relative w-[201px] rounded-3xl p-6 flex flex-col items-center text-center"
        style={{
          backgroundColor: "rgba(30, 111, 255, 0.03)",
          border: "none",
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
        <h3 className="text-2xl font-medium mb-1 text-black">{title}</h3>

        {/* Description */}
        <p className="text-sm text-[#333333] leading-[23.8px]">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
