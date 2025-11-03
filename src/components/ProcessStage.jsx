import React from "react";

const ProcessStage = ({
  label,
  icon,
  bgImage,
  className = "",
  toolTip,
  top = true,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Label */}
      {top && (
        <div className="bg-[#1e6fff] px-2 py-2 rounded-lg -mt-[9px] relative top-1 z-10">
          <span className="text-white text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        </div>
      )}

      {/* Stage background with icon */}
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        tabIndex={0}
        className="relative w-[140px] h-[123px] flex items-center justify-center"
        aria-describedby={toolTip ? `${label}-tooltip` : undefined}
      >
        {/* Tooltip (shows on hover / focus) */}
        {toolTip && showTooltip && (
          <>
            <div
              id={`${label}-tooltip`}
              role="tooltip"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-black bg-white text-[12px] px-2 py-1 rounded whitespace-nowrap z-20 shadow"
            >
              {toolTip}
            </div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rotate-45 z-20" />
          </>
        )}

        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0px 3.71px 3.71px rgba(0, 0, 0, 0.25))",
          }}
        />

        <img
          src={icon}
          alt={label}
          className="relative z-10 w-[60px] h-[60px] object-contain"
          style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
        />
      </div>

      {/* Label */}
      {!top && (
        <div className="bg-[#1e6fff] px-2 py-2 rounded-lg -mt-[9px] relative bottom-0">
          <span className="text-white text-[14px] font-medium whitespace-nowrap">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProcessStage;
