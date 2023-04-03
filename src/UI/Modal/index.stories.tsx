import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

export default {
    title: "UI/Modal",
    component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Open Modal
            </Button>
            <Modal
                {...args}
                visible={visible}
                onClose={handleClose}
                className="modal"
            >
                <p>Modal Content</p>
            </Modal>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    onClose: () => {
        return;
    },
};
