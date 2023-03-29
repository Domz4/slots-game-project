import React, { HTMLAttributes, ReactNode } from "react";
import "./styles.css";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "spin";
    children: ReactNode;
}

export function Button({ variant, children, ...props }: ButtonProps) {
    return (
        <button className={`btn btn__${variant}`} {...props}>
            {variant === "spin" ? (
                <>
                    <span className={`btn__shadow__${variant}`}></span>
                    <span className={`btn__edge__${variant}`}></span>
                    <span className={`btn__front__${variant}`}>{children}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}
 