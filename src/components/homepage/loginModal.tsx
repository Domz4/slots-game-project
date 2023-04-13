import { Modal } from "../../UI/Modal/Modal";
interface loginProps {
  isVisible: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isVisible, onClose }: loginProps) => {
  return <Modal visible={isVisible} onClose={onClose} title="Login" />;
};
