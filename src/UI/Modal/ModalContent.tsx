import classes from "./modules/ModalContent.module.css";
import { ModalHeader } from "./ModalHeader";
import { useEffect } from "react";

interface ModalContentProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
  header?: React.ReactNode;
  contentClassName?: string;
}

export const ModalContent = ({
  children,
  title,
  onClose,
  className,
  header,
  contentClassName,
}: ModalContentProps) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
  const headerContent = header ? header : <>{title}</>;

  return (
    <div className={`${classes.root} ${className ? className : ""}`}>
      <ModalHeader onClose={onClose}>{headerContent}</ModalHeader>
      <main className={`${classes.content} ${contentClassName ? contentClassName : ""}`}>
        {children}
      </main>
    </div>
  );
};
