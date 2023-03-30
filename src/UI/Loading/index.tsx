import React from "react";
import { createPortal } from "react-dom";
import "./styles.css";

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    const overlay = (
        <div className="loader-overlay">
            <span className="loader" />
        </div>
    );

    return isLoading ? createPortal(overlay, document.body!) : null;
};
export default LoadingOverlay;
