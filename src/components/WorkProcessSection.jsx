import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";
import "./WorkProcessSection.css";

const ProcessCard = ({ icon, title, description, isActive }) => {
  return (
    <div className="process-card">
      {/* Timeline Point - sitting ON the timeline (intersecting) */}
      <div className="timeline-point-wrapper">
        <div
          className={`timeline-point ${isActive ? "active" : "inactive"}`}
        ></div>
      </div>

      {/* Vertical connector line with animated fill effect */}
      <div className="vertical-line-container">
        <div
          className="vertical-line-fill"
          style={{
            height: isActive ? "100%" : "0%",
          }}
        ></div>
      </div>

      {/* Card with glassmorphism effect */}
      <div className="card-content">
        {/* Animated border overlay */}
        <div
          className={`card-border-overlay ${isActive ? "active" : "inactive"}`}
        ></div>

        {/* Icon */}
        <div className="card-icon-wrapper">
          <div className="icon-container">
            <img src="./images/process-bg.svg" alt="" />
          </div>

          <img src={icon} alt={title} className="card-icon" />
        </div>

        {/* Title */}
        <h3 className="card-title">{title}</h3>

        {/* Description */}
        <p className="card-description">{description}</p>
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
    <section className="work-process-section">
      <div className="work-process-container">
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Timeline */}
        <div ref={timelineRef} className="timeline-container">
          {/* Timeline Line - positioned at the top */}
          <div className="timeline-line">
            <span ref={innerLineRef} className="timeline-line-fill"></span>
          </div>

          {/* Process Cards */}
          <div className="process-cards-grid">
            {data.steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className="process-card-wrapper"
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
