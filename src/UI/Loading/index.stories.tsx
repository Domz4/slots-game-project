import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoadingOverlay from ".";

export default {
    title: "UI/LoadingOverlay",
    component: LoadingOverlay,
    argTypes: {
        borderColor: { control: "color" },
    },
} as ComponentMeta<typeof LoadingOverlay>;

const Template: ComponentStory<typeof LoadingOverlay> = (args) => (
    <LoadingOverlay {...args} />
);

export const Default = Template.bind({});
Default.args = {
    isLoading: true,
};
