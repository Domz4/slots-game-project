import React, { HTMLAttributes, ReactNode } from "react";
import "./styles.css";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "spin";
    children: ReactNode;
    size?: "sm" | "md" | "lg";
    backgroundColor?: string;
}

export function Button({
    size = "md",
    variant,
    children,
    ...props
}: ButtonProps) {
    return variant === "spin" ? (
        <button type="button" className={`btn btn__${variant}`} {...props}>
            <span className={`btn__shadow__${variant}`}></span>
            <span className={`btn__edge__${variant}`}></span>
            <span className={`btn__front__${variant} btn__${size}`}>
                {children}
            </span>
        </button>
    ) : (
        <button
            type="button"
            className={`btn btn__${variant} btn__${size}`}
            {...props}
        >
            {children}
        </button>
    );
}
