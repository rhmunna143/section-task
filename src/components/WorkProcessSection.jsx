import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "./SectionHeader";

const ProcessCard = ({ icon, title, description, isActive }) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Timeline Point - sitting ON the timeline (intersecting) */}
      <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 z-30">
        <div 
          className="timeline-point-outer relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-1000"
          style={{
            background: isActive ? '#1e6fff' : 'rgba(30, 111, 255, 0.2)',
            boxShadow: isActive ? '0 0 0 4px rgba(30, 111, 255, 0.2)' : 'none',
          }}
        >
          <span 
            className="timeline-point-inner block w-2 h-2 rounded-full transition-all duration-1000"
            style={{
              background: isActive ? '#ffffff' : 'transparent',
              transform: isActive ? 'scale(1)' : 'scale(0.5)',
            }}
          ></span>
        </div>
      </div>

      {/* Vertical connector line with animated fill effect */}
      <div className="vertical-line-container relative w-1 h-16 bg-[rgba(30,111,255,0.1)]">
        <div 
          className="vertical-line-fill absolute top-0 left-0 w-full transition-all duration-1000 ease-out"
          style={{
            height: isActive ? '100%' : '0%',
            background: '#1e6fff',
          }}
        ></div>
      </div>

      {/* Card with glassmorphism effect */}
      <div
        className="card-content relative w-[201px] rounded-3xl p-6 flex flex-col items-center text-center transition-all ease-out"
        style={{
          backgroundColor: "rgba(30, 111, 255, 0.03)",
          border: isActive ? '2px solid #1e6fff' : '2px solid transparent',
          boxShadow:
            "6px 6px 12px rgba(78, 137, 255, 0.50), -6px -6px 12px rgba(249, 252, 255, 0.30)",
          transitionProperty: 'border',
          transitionDuration: '800ms',
          transitionDelay: isActive ? '1000ms' : '0ms',
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

const WorkProcessSection = ({ data }) => {
  const timelineRef = useRef(null);
  const innerLineRef = useRef(null);
  const cardsRef = useRef([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const animationIndexRef = useRef(0);

  const showTime = useCallback((index) => {
    setActiveCards(prev => {
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
    setActiveCards(prev => prev.filter(i => i !== index));
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
    <section className="py-16 px-16 bg-[#d4e4f7]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Timeline */}
        <div ref={timelineRef} className="relative mt-16 pt-4">
          {/* Timeline Line - positioned at the top */}
          <div className="absolute top-0 left-0 right-0 h-3 max-w[800px] bg-[rgba(30,111,255,0.2)] rounded-full z-10">
            <span
              ref={innerLineRef}
              className="absolute top-0 left-0 h-full bg-[#1e6fff] rounded-full transition-all duration-1000 ease-linear"
              style={{ width: "0%" }}
            ></span>
          </div>

          {/* Process Cards */}
          <div className="relative z-10 grid grid-cols-4 gap-8">
            {data.steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className="process-card-wrapper cursor-pointer"
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
