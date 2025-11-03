import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[50.1px] font-bold text-[#0f1724] text-center leading-tight">
          {title}
        </h1>

        <div className="w-full max-w-[800px] h-[3px] bg-linear-to-r from-transparent via-[#1E6FFF] via-50% to-transparent"></div>

      </div>
      
      <p className="text-[16.7px] text-[#9b9c9d] text-center max-w-[742px] leading-[25.88px]">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
