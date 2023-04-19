import { Backdrop } from "./Backdrop";
import { ModalContent } from "./ModalContent";
import React, { HTMLAttributes, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalAnimation from "./modules/ModalAnimation.module.css";
import BackdropAnimation from "./modules/BackdropAnimation.module.css";

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
const overlayRoot = document.getElementById("overlay-root");

if (!overlayRoot) {
  throw new Error("Root element found");
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
        classNames={BackdropAnimation}
        in={visible}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Backdrop onClose={onClose}></Backdrop>
      </CSSTransition>
      <CSSTransition
        onExited={onExited}
        classNames={ModalAnimation}
        in={visible}
        mountOnEnter
        unmountOnExit
        timeout={300}
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
    overlayRoot
  );
};
