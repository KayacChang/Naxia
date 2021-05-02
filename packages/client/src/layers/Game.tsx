import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "components";
import { useViewport } from "utils";
import { IApplicationOptions } from "@pixi/app";

type GameProps = {
  children?: ReactNode;
  className?: string;
  options?: IApplicationOptions;
};
export function Game({ children, className, options }: GameProps) {
  const { width, height } = useViewport();

  return createPortal(
    <Canvas
      width={width}
      height={height}
      className={className}
      options={options}
    >
      {children}
    </Canvas>,
    document.getElementById("root") as HTMLElement
  );
}
