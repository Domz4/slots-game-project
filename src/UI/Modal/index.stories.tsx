import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

const DefaultWithHooks = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal visible={visible} onClose={handleClose} className="modal" title="modal">
        <p>Modal Content</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultWithHooks />,
};
