import { StoryObj, Meta } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Default text",
    },
  },
};
export default meta;
export const Default: Story = {
  args: {
    variant: "primary",
    children: "primary",
  },
};
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button variant="primary">primary</Button>,
};
export const Secondary: Story = {
  render: () => <Button variant="secondary">secondary</Button>,
};
export const SecondaryAlt: Story = {
  render: () => <Button variant="secondary-alt">third</Button>,
};
