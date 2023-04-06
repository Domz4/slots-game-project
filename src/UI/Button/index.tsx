import React, { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: "secondary" | "secondary-alt" | "primary" | "empty";
    children: ReactNode;
    size?: "mini" | "sm" | "md" | "lg";
    backgroundColor?: string;
}

export const Button: FC<ButtonProps> = ({
    size = "md",
    variant,
    children,
    ...props
}: ButtonProps) => {
    return variant === "primary" ? (
        <button
            type="button"
            className={`${styles.btn} ${styles[`btn__${variant}`]}`}
            {...props}
        >
            <span className={`${styles[`btn__shadow__${variant}`]}`}></span>
            <span className={`${styles[`btn__edge__${variant}`]}`}></span>
            <span
                className={`${styles[`btn__front__${variant}`]} ${
                    styles[`btn__${size}`]
                }`}
            >
                {children}
            </span>
        </button>
    ) : (
        <button
            type="button"
            className={`${styles.btn} ${styles[`btn__${variant}`]} ${
                styles[`btn__${size}`]
            }`}
            {...props}
        >
            {children}
        </button>
    );
};
