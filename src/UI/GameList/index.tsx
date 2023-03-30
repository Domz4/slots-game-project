import React, { FC } from "react";
import Box from "./Box";
import "./styles.css";

interface GridProps {
    children: React.ReactNode;
    width: number;
    height: number;
}

const Grid: FC<GridProps> = ({ children, width, height, ...props }) => {
    const childArray = React.Children.toArray(children);
    const boxSize = { height: `${height}px`, width: `${width}px ` };
    return (
        <div className="grid__container" {...props}>
            {childArray.map((child, idx) => (
                <Box
                    style={boxSize}
                    className={`game__tile grid__game__${idx}`}
                    key={idx}
                >
                    {child}
                </Box>
            ))}
        </div>
    );
};

export default Grid;
