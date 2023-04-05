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
    height: 180,
    width: 180,
    children: [
        <div key={Math.random()}>
            <img src="" alt="" />
            <span>box 1</span>
        </div>,
        <div key={Math.random()}>
            <img src="" alt="" />
            <span>box 2</span>
        </div>,
        <div key={Math.random()}>
            <img src="" alt="" />
            <span>box 3</span>
        </div>,
        <div key={Math.random()}>
            <img src="" alt="" />
            <span>box 4</span>
        </div>,
        <div key={Math.random()}>
            <img src="" alt="" />
            <span>box 5</span>
        </div>,
    ],
};
