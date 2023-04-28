import React from "react";
import { Button } from "../../../UI/Button";

interface PlayButtonProps {
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="primary">
      SPIN
    </Button>
  );
};
