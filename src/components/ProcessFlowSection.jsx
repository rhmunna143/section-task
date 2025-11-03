import React from "react";
import SectionHeader from "./SectionHeader";

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

const ProcessFlowSection = ({ data }) => {
  return (
    <section className="relative overflow-hidden py-28 px-16 flow-section">
      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ gap: "75.22px" }}
      >
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Flow Diagram */}
        <div className="relative w-full mt-6">
          {/* Flow connector SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/images/flow-connector.svg"
              alt=""
              className="w-full h-auto max-w-304.25"
            />
          </div>

          {/* Stages Grid */}
          <div className="relative z-10 grid grid-cols-4 gap-x-8 gap-y-16">
            {/* Top Row - 4 stages */}
            {data.stages.slice(0, 4).map((stage, index) => (
              <div
                key={index}
                className="flex justify-evenly relative right-23 bottom-12"
              >
                <ProcessStage
                  label={stage.label}
                  icon={stage.icon}
                  bgImage={stage.bgImage}
                  toolTip={stage.toolTip}
                  top={true}
                />
              </div>
            ))}

            {/* Bottom Row - 4 stages */}
            {data.stages.slice(4, 8).map((stage, index) => (
              <div
                key={index + 4}
                className="flex justify-center relative left-22 top-14"
              >
                <ProcessStage
                  label={stage.label}
                  icon={stage.icon}
                  bgImage={stage.bgImage}
                  toolTip={stage.toolTip}
                  top={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlowSection;
