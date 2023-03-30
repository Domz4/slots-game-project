import React, { FC, HTMLAttributes, ReactNode } from "react";
import "./Box";
interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
const Box: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <div className="Box" {...props}>
            {children}
        </div>
    );
};

export default Box;
