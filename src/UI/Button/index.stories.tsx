import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from ".";

export default {
    title: "UI/Button",
    component: Button,
    argTypes: {
        children: {
            defaultValue: "Default text",
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const SecondaryAlt = Template.bind({});

Primary.args = {
    variant: "primary",
    children: "primary!",
};
Secondary.args = {
    variant: "secondary",
    children: "secondary!",
};
SecondaryAlt.args = {
    variant: "secondary-alt",
    children: "secondary-alt!",
};
