import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./index";

const meta: Meta = { 
    title: "Button",
    component: Button,
};
export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Spin = () => Template.bind({});
export const Primary = () => Template.bind({});
export const Secondary = () => Template.bind({});

Spin.args = {
    variant: "spin",
    children: "Spin!",
};
Primary.args = {
    variant: "primary",
    children: "primary!",
};
Secondary.args = {
    variant: "secondary",
    children: "secondary!",
};
