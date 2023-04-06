import React from "react";
import "./styles.css";
import { createPortal } from "react-dom";

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    const overlay = (
        <div className="loader-overlay">
            <span className="loader" />
        </div>
    );

    return isLoading ? createPortal(overlay, document.body) : null;
};
export default LoadingOverlay;
