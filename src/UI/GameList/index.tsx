import React, { ReactNode, FC } from "react";
import Box from "./Box";

import "./styles.css";

interface GridProps {
    children: ReactNode;
    variant: "mobile" | "desktop";
    size?: "sm" | "md" | "lg";
    amount: number[];
}

const Grid: FC<GridProps> = ({
    size = "md",
    variant = "desktop",
    children,
    amount = Array(6).fill(0),
    ...props
}) => {
    return (
        <div className={`grid__container ${variant}`} {...props}>
            {amount.map((elem: number, idx) => (
                <Box className={`grame_tile grid__game__${idx}`}>{elem}</Box>
            ))}
        </div>
    );
};

export default Grid;
