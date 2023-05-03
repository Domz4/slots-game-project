import { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => (
    <Header
      onLogin={() => console.log("login")}
      onLogout={() => console.log("logout")}
      onRegister={() => console.log("register")}
    />
  ),
};
