import { CSSTransition } from "react-transition-group";
import React, { HTMLAttributes, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modules/Modal.module.css";
import ModalAnimation from "./modules/ModalAnimation.module.css";
import { ModalContent } from "./ModalContent";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    visible: boolean;
    title: string;
    onClose: () => void;
    children?: ReactNode;
    header?: React.ReactNode;
    onExited?: () => void;
    contentClassName?: string;
    className?: string;
}

export const Modal = ({
    title,
    children,
    visible,
    onClose,
    onExited,
    header,
    contentClassName,
    className,
}: ModalProps) => {
    return ReactDOM.createPortal(
        <>
            <CSSTransition
                classNames={styles}
                in={visible}
                mountOnEnter
                unmountOnExit
                timeout={200}
            >
                <div className={styles.backdrop} onClick={onClose} />
            </CSSTransition>
            <CSSTransition
                onExited={onExited}
                classNames={ModalAnimation}
                in={visible}
                mountOnEnter
                unmountOnExit
                timeout={200}
            >
                <ModalContent
                    header={header}
                    className={className}
                    title={title}
                    onClose={onClose}
                    contentClassName={contentClassName}
                >
                    {children}
                </ModalContent>
            </CSSTransition>
        </>,
        document.body
    );
};