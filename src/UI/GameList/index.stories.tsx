import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Grid from ".";

export default {
    tile: "Games Tiles",
    component: Grid,
    argTypes: {
        children: {
            defaultValue: "Default text",
        },
    },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Desktop = Template.bind({});

Desktop.args = {
    variant: "desktop",
};
