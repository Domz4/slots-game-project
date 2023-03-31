import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from "./Modal";

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
            <button onClick={() => setVisible(true)}>Open Modal</button>
            <Modal {...args} visible={visible} onClose={handleClose}>
                <p>Modal Content</p>
            </Modal>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    visible: false,
    onClose: () => {
        return;
    },
};
