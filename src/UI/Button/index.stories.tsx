import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from ".";

export default {
    title: "Button",
    component: Button,
    argTypes: {
        children: {
            defaultValue: "Default text",
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Spin = Template.bind({});
export const Primary = Template.bind({});
export const Secondary = Template.bind({});

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
