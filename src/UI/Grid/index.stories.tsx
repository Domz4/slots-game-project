import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Grid from ".";

const meta: Meta<typeof Grid> = {
  title: "UI/Games Tiles",
  component: Grid,
  argTypes: {
    children: {
      defaultValue: "Default text",
    },
  },
};
export default meta;
export const Default: StoryObj = {
  args: {
    size: 150,
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
  },
};
