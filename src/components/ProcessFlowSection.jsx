import React from "react";
import SectionHeader from "./SectionHeader";
import ProcessStage from "./ProcessStage";
import BlurredCircle from "./BlurredCircle";

const ProcessFlowSection = ({ data }) => {
  return (
    <section className="relative min-h-screen overflow-hidden my-10 container mx-auto">
      {/* Decorative blurred circles */}
      <BlurredCircle 
        size={184}
        color="#1e6fff"
        blurAmount={420}
        className="absolute top-[581px] left-0"
      />

      <BlurredCircle 
        size={175}
        color="#1e6fff"
        blurAmount={420}
        className="absolute top-[360px] right-0"
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: '75.22px' }}>
        {/* Header */}
        <SectionHeader 
          title={data.title}
          subtitle={data.subtitle}
        />
        
        {/* Process Flow Diagram */}
        <div className="relative w-full mt-6">
          {/* Flow connector SVG */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img 
              src="/images/flow-connector.svg" 
              alt="" 
              className="w-full h-auto max-w-[1217px]"
            />
          </div>
          
          {/* Stages Grid */}
          <div className="relative z-10 grid grid-cols-4 gap-x-8 gap-y-16">
            {/* Top Row - 4 stages */}
            {data.stages.slice(0, 4).map((stage, index) => (
              <div key={index} className="flex justify-evenly relative right-20 bottom-10">
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
              <div key={index + 4} className="flex justify-center relative left-20 top-12">
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