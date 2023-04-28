import React from "react";
import { Stage as PixiStage } from "@pixi/react";
import { ReactReduxContext } from "react-redux";
import { ReactReduxContextInstance } from "react-redux/es/components/Context";

interface ContextBridgeProps {
  children: React.ReactNode;
  Context: ReactReduxContextInstance;
  render: (children: React.ReactNode) => React.ReactNode;
}
interface StageProps extends Omit<PixiStage, "children"> {
  children: React.ReactNode;
}
const ContextBridge: React.FC<ContextBridgeProps> = ({ children, Context, render }) => {
  return (
    <Context.Consumer>
      {(value) => render(<Context.Provider value={value}>{children}</Context.Provider>)}
    </Context.Consumer>
  );
};

export const Stage: React.FC<StageProps> = ({ children, ...props }) => {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children: React.ReactNode) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};
