import React, { HTMLAttributes, ReactNode } from "react";
import "./styles.css";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: "secondary" | "secondary-alt" | "primary" | "empty";
    children: ReactNode;
    size?: "mini" | "sm" | "md" | "lg";
    backgroundColor?: string;
}

export function Button({
    size = "md",
    variant,
    children,
    ...props
}: ButtonProps) {
    return variant === "primary" ? (
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
