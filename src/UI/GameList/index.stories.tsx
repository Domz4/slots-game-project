import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Grid from ".";

export default {
    title: "UI/Games Tiles",
    component: Grid,
    argTypes: {
        children: {
            defaultValue: "Default text",
        },
    },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Default = Template.bind({});
Default.args = {
    height: 130,
    width: 130,
    children: [
        <div>
            <img src="" alt="" />
            <span>box 1</span>
        </div>,
        <div>
            <img src="" alt="" />
            <span>box 2</span>
        </div>,
        <div>
            <img src="" alt="" />
            <span>box 3</span>
        </div>,
        <div>
            <img src="" alt="" />
            <span>box 4</span>
        </div>,
    ],
};
