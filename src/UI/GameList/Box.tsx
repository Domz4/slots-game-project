import React, { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Box.module.css";
interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
const Box: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <div className={styles.Box} {...props}>
            {children}
        </div>
    );
};

export default Box;
