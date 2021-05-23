import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "components";
import { getViewPort } from "utils";
import { IApplicationOptions } from "@pixi/app";
import { Provider } from "react-redux";
import { store } from "system";

const { width, height } = getViewPort();

type GameProps = {
  children?: ReactNode;
  className?: string;
  options?: IApplicationOptions;
};
export function Game({ children, className, options }: GameProps) {
  return createPortal(
    <Canvas
      width={width}
      height={height}
      className={className}
      options={options}
    >
      <Provider store={store}>{children}</Provider>
    </Canvas>,
    document.getElementById("root") as HTMLElement
  );
}
