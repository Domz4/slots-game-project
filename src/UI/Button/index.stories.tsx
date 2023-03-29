import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./index";

const meta: Meta = {
    title: "Button",
    component: Button,
};
export default meta;

export const Spin = () => <Button variant="spin">Spin</Button>;

export const Primary = () => <Button variant="primary">primary</Button>;

export const Secondary = () => <Button variant="secondary">secondary</Button>;
