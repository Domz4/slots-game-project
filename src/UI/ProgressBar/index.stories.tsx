import { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from ".";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

const Default: Story = {
  render: () => <ProgressBar progress={50} total={100} />,
};
