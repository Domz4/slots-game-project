import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Sidebar } from ".";

export default {
    title: "UI/Sidebar",
    component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;
export const Default = Template.bind({});
