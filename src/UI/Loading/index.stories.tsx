import { Meta, StoryObj } from "@storybook/react";
import LoadingOverlay from ".";

const meta: Meta<typeof LoadingOverlay> = {
  title: "UI/LoadingOverlay",
  component: LoadingOverlay,
};
export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {
  render: () => <LoadingOverlay isLoading={true} />,
};
