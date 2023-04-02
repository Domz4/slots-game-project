import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from ".";

export default {
    title: "UI/Header",
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;
export const Default = Template.bind({});
