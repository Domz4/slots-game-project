import React, { FC, HTMLAttributes } from "react";
import Box from "./Box";
import styles from "./styles.module.css";
import clsx from "clsx";
interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size: number;
}

const Grid: FC<GridProps> = ({ children, className, size, ...props }) => {
  const childArray = React.Children.toArray(children);
  const boxSize = { height: `${size}px`, width: `${size}px ` };
  return (
    <div className={clsx(styles.container, className)} {...props}>
      {childArray.map((child) => (
        <Box style={boxSize} className={styles.box} key={Math.random()}>
          {child}
        </Box>
      ))}
    </div>
  );
};

export default Grid;
