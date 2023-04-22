import React from "react";
import "./styles.css";
import { createPortal } from "react-dom";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const overlayRoot = document.getElementById("overlay-root");

  if (!overlayRoot) {
    throw new Error("Root element found");
  }

  const overlay = (
    <div className="loader-overlay">
      <span className="loader" />
    </div>
  );

  return isLoading ? createPortal(overlay, overlayRoot) : null;
};
export default LoadingOverlay;
