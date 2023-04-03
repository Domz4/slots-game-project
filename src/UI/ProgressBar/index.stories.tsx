import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProgressBar } from ".";

export default {
    title: "UI/ProgressBar",
    component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
    <ProgressBar {...args} />
);
export const Default = Template.bind({});

Default.args = {
  progress: 50,
}
