import React, { FC, HTMLAttributes } from "react";
import Box from "./Box";
import styles from "./styles.module.css";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    width: number;
    height: number;
}

const Grid: FC<GridProps> = ({ children, width, height, ...props }) => {
    const childArray = React.Children.toArray(children);
    const boxSize = { height: `${height}px`, width: `${width}px ` };
    return (
        <div className={styles.container} {...props}>
            {childArray.map((child) => (
                <Box
                    style={boxSize}
                    className={styles.tile}
                    key={Math.random()}
                >
                    {child}
                </Box>
            ))}
        </div>
    );
};

export default Grid;
