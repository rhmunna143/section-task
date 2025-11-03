import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";

const ProcessStage = ({
  label,
  icon,
  className = "",
  toolTip,
  top = true,
  isActive = false,
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
        className="relative w-[148px] h-[131px] flex items-center justify-center"
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

        {/* SVG Background with animated border */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 148 131"
          fill="none"
        >
          <defs>
            <filter
              id={`filter_${label}`}
              x="-7.15256e-07"
              y="0"
              width="147.419"
              height="130.042"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="3.71082" />
              <feGaussianBlur stdDeviation="1.85541" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <clipPath id={`clip_${label}`}>
              <rect
                x="0"
                y="0"
                width="148"
                height={isActive ? "131" : "0"}
                style={{
                  transition: "height 800ms ease-out 1200ms",
                }}
              />
            </clipPath>
          </defs>
          <g filter={`url(#filter_${label})`}>
            {/* Background fill */}
            <path
              d="M3.71128 63.523C3.71325 67.1628 5.36704 70.6049 8.20733 72.8809L66.9893 119.985C71.4178 123.533 77.7268 123.495 82.1114 119.892L139.326 72.8809C142.1 70.6015 143.708 67.1997 143.708 63.6093V62.5622C143.708 59.1223 142.232 55.8478 139.654 53.57L82.4348 3.00777C77.9391 -0.964912 71.2002 -1.0069 66.6554 2.90948L7.87738 53.5593C5.23026 55.8403 3.70891 59.162 3.71081 62.6563L3.71128 63.523Z"
              fill="#8DB6FF"
            />
            {/* Animated border stroke */}
            <path
              d="M3.71128 63.523C3.71325 67.1628 5.36704 70.6049 8.20733 72.8809L66.9893 119.985C71.4178 123.533 77.7268 123.495 82.1114 119.892L139.326 72.8809C142.1 70.6015 143.708 67.1997 143.708 63.6093V62.5622C143.708 59.1223 142.232 55.8478 139.654 53.57L82.4348 3.00777C77.9391 -0.964912 71.2002 -1.0069 66.6554 2.90948L7.87738 53.5593C5.23026 55.8403 3.70891 59.162 3.71081 62.6563L3.71128 63.523Z"
              stroke="#1e6fff"
              strokeWidth="2"
              fill="none"
              clipPath={`url(#clip_${label})`}
            />
          </g>
        </svg>

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
  const flowRef = useRef(null);
  const connectorRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [activeStages, setActiveStages] = useState([]);
  const animationIndexRef = useRef(0);

  const showStage = useCallback((index) => {
    setActiveStages((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  }, []);

  const animateConnector = useCallback((progress) => {
    if (connectorRef.current) {
      connectorRef.current.style.clipPath = `inset(0% ${
        100 - progress
      }% 0% 0%)`;
    }
  }, []);

  const slowLoop = useCallback(() => {
    const index = animationIndexRef.current;
    if (index < data.stages.length) {
      setTimeout(() => {
        showStage(index);
        const progress = ((index + 1) / data.stages.length) * 100;
        animateConnector(progress);
        animationIndexRef.current++;
        slowLoop();
      }, 1200);
    }
  }, [data.stages.length, showStage, animateConnector]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.5 && !animationStarted) {
            setAnimationStarted(true);
            slowLoop();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );

    const currentFlow = flowRef.current;
    if (currentFlow) {
      observer.observe(currentFlow);
    }

    return () => {
      if (currentFlow) {
        observer.unobserve(currentFlow);
      }
    };
  }, [animationStarted, slowLoop]);

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
        <div ref={flowRef} className="relative w-full mt-6">
          {/* Flow connector SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              ref={connectorRef}
              src="/images/flow-connector.svg"
              alt=""
              className="w-full h-auto max-w-304.25 transition-all duration-1000 ease-linear"
              style={{
                clipPath: "inset(0% 100% 0% 0%)",
              }}
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
                  toolTip={stage.toolTip}
                  top={true}
                  isActive={activeStages.includes(index)}
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
                  toolTip={stage.toolTip}
                  top={false}
                  isActive={activeStages.includes(index + 4)}
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
