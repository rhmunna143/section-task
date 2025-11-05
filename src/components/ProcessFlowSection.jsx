import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";
import "./ProcessFlowSection.css";

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
    <div className={`process-stage ${className}`}>
      {/* Label */}
      {top && (
        <div className="stage-label stage-label-top">
          <span className="stage-label-text">{label}</span>
        </div>
      )}

      {/* Stage background with icon */}
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        tabIndex={0}
        className="stage-icon-container"
        aria-describedby={toolTip ? `${label}-tooltip` : undefined}
      >
        {/* Tooltip (shows on hover / focus) */}
        {toolTip && showTooltip && (
          <>
            <div
              id={`${label}-tooltip`}
              role="tooltip"
              className="stage-tooltip"
            >
              {toolTip}
            </div>
            <div className="stage-tooltip-arrow" />
          </>
        )}

        {/* SVG Background with animated border */}
        <svg
          className="stage-svg"
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

        <img src={icon} alt={label} className="stage-icon" />
      </div>

      {/* Label */}
      {!top && (
        <div className="stage-label stage-label-bottom">
          <span className="stage-label-text">{label}</span>
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
        // Animate one by one in zigzag pattern:
        // 0 (top-left), 4 (bottom-left), 1 (top-2nd), 5 (bottom-2nd),
        // 2 (top-3rd), 6 (bottom-3rd), 3 (top-right), 7 (bottom-right)
        let stageIndex;
        if (index % 2 === 0) {
          // Even indices: top row (0, 1, 2, 3)
          stageIndex = index / 2;
        } else {
          // Odd indices: bottom row (4, 5, 6, 7)
          stageIndex = 4 + Math.floor(index / 2);
        }
        showStage(stageIndex);
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
    <section className="flow-section">
      {/* Content */}
      <div className="flow-section-content">
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Flow Diagram */}
        <div ref={flowRef} className="flow-diagram-container">
          {/* Flow connector SVG */}
          <div className="flow-connector-wrapper">
            <img
              ref={connectorRef}
              src="/images/flow-connector.svg"
              alt=""
              className="flow-connector-image"
            />
          </div>

          {/* Stages Grid */}
          <div className="stages-grid">
            {/* Top Row - 4 stages */}
            {data.stages.slice(0, 4).map((stage, index) => (
              <div key={index} className="stage-wrapper-top">
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
              <div key={index + 4} className="stage-wrapper-bottom">
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
