import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProcessFlowSection from "./components/ProcessFlowSection";
import { mockRootProps } from "./components/processFlowMockData";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProcessFlowSection data={mockRootProps} />
  </StrictMode>
);
