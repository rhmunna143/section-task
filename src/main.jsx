import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ProcessFlowSection from "./components/ProcessFlowSection";
import WorkProcessSection from "./components/WorkProcessSection";
import { mockRootProps } from "./components/processFlowMockData";
import { mockWorkProcessData } from "./components/workProcessMockData";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProcessFlowSection data={mockRootProps} />
    <WorkProcessSection data={mockWorkProcessData} />
  </StrictMode>
);
