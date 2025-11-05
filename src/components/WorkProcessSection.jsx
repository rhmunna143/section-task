import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";

const ProcessCard = ({ icon, title, description, isActive }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Timeline Point - sitting ON the timeline (intersecting) */}
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <div
          className="timeline-point"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            transition: "all 1000ms",
            background: isActive ? "#1e6fff" : "rgba(30, 111, 255, 0.2)",
          }}
        ></div>
      </div>

      {/* Vertical connector line with animated fill effect */}
      <div
        className="vertical-line-container"
        style={{
          position: "relative",
          width: "4px",
          height: "64px",
          background: "rgba(30,111,255,0.1)",
        }}
      >
        <div
          className="vertical-line-fill"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: isActive ? "100%" : "0%",
            background: "#1e6fff",
            transition: "all 1000ms ease-out",
          }}
        ></div>
      </div>

      {/* Card with glassmorphism effect */}
      <div
        className="card-content"
        style={{
          position: "relative",
          width: "200px",
          height: "250px",
          borderRadius: "24px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          backgroundColor: "rgba(30, 111, 255, 0.03)",
          boxShadow:
            "6px 6px 12px rgba(78, 137, 255, 0.50), -6px -6px 12px rgba(249, 252, 255, 0.30)",
        }}
      >
        {/* Animated border overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            pointerEvents: "none",
            background: "#1e6fff",
            clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
            transition: "clip-path 800ms ease-out 1000ms",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            padding: "1px",
          }}
        ></div>

        {/* Icon */}
        <div style={{ width: "50px", height: "50px", marginBottom: "24px", marginTop: "-8px" }}>
          <div
            className="icon-container"
            style={{
              width: "46px",
              position: "absolute",
              top: 0,
              left: 10,
              // right: 50,
              bottom: 0,
              margin: "auto",
              zIndex: -300,
            }}
          >
            <img src="./images/process-bg.svg" alt="" />
          </div>

          <img
            src={icon}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "relative",
              right: "2px",
            }}
          />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginBottom: "4px",
            color: "black",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "#333333",
            lineHeight: "23.8px",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const WorkProcessSection = ({ data }) => {
  const timelineRef = useRef(null);
  const innerLineRef = useRef(null);
  const cardsRef = useRef([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const animationIndexRef = useRef(0);

  const showTime = useCallback((index) => {
    setActiveCards((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
    const card = cardsRef.current[index];
    if (card) {
      card.setAttribute("data-done", "true");
    }
  }, []);

  const hideTime = useCallback((index) => {
    setActiveCards((prev) => prev.filter((i) => i !== index));
    const card = cardsRef.current[index];
    if (card) {
      card.removeAttribute("data-done");
    }
  }, []);

  const timelineProgress = useCallback(
    (value) => {
      const progress = (value / data.steps.length) * 100;
      if (innerLineRef.current) {
        innerLineRef.current.style.width = `${progress}%`;
      }
    },
    [data.steps.length]
  );

  const slowLoop = useCallback(() => {
    const index = animationIndexRef.current;
    if (index < data.steps.length) {
      setTimeout(() => {
        showTime(index);
        timelineProgress(index + 1);
        animationIndexRef.current++;
        slowLoop();
      }, 1200);
    }
  }, [data.steps.length, showTime, timelineProgress]);

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

    const currentTimeline = timelineRef.current;
    if (currentTimeline) {
      observer.observe(currentTimeline);
    }

    return () => {
      if (currentTimeline) {
        observer.unobserve(currentTimeline);
      }
    };
  }, [animationStarted, slowLoop]);

  const handleCardClick = (index) => {
    const card = cardsRef.current[index];
    if (card && card.getAttribute("data-done")) {
      // Hide all cards from this index onwards
      timelineProgress(index);
      for (let i = index; i < data.steps.length; i++) {
        hideTime(i);
      }
      animationIndexRef.current = index;
    } else {
      // Show all cards up to this index
      timelineProgress(index + 1);
      for (let i = 0; i <= index; i++) {
        showTime(i);
      }
      animationIndexRef.current = index + 1;
    }
  };

  return (
    <section
      style={{
        paddingTop: "64px",
        paddingBottom: "64px",
        paddingLeft: "64px",
        paddingRight: "64px",
        backgroundColor: "#d4e4f7",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            marginTop: "64px",
            paddingTop: "16px",
          }}
        >
          {/* Timeline Line - positioned at the top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "12px",
              maxWidth: "1400px",
              backgroundColor: "rgba(30,111,255,0.2)",
              borderRadius: "9999px",
              zIndex: 10,
            }}
          >
            <span
              ref={innerLineRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "0%",
                backgroundColor: "#1e6fff",
                borderRadius: "9999px",
                transition: "all 1000ms linear",
              }}
            ></span>
          </div>

          {/* Process Cards */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
          >
            {data.steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className="process-card-wrapper"
                style={{
                  cursor: "pointer",
                }}
              >
                <ProcessCard
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isActive={activeCards.includes(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
