import { ReactNode } from "react";
import { Canvas, useViewport } from "core";
import { createPortal } from "react-dom";

type GameProps = {
  children?: ReactNode;
};
export function Game({ children }: GameProps) {
  const { width, height } = useViewport();

  return createPortal(
    <Canvas width={width} height={height}>
      {children}
    </Canvas>,
    document.getElementById("root") as HTMLElement
  );
}
