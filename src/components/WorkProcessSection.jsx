import React from "react";
import ProcessCard from "./ProcessCard";
import SectionHeader from "./SectionHeader";

const WorkProcessSection = ({ data }) => {
  return (
    <section className="py-16 px-16 bg-[#d4e4f7]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <SectionHeader title={data.title} subtitle={data.subtitle} />

        {/* Process Timeline */}
        <div className="relative mt-8">
          {/* Timeline connector SVG */}
          <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
            <img
              src="/images/timeline-connector.svg"
              alt=""
              className="w-full max-w-[1291px] h-auto"
            />
          </div>

          {/* Process Cards */}
          <div className="relative z-10 grid grid-cols-4 gap-8 pt-4">
            {data.steps.map((step, index) => (
              <ProcessCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
