import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas, useViewport } from "core";

type GameProps = {
  children?: ReactNode;
};
export function Game({ children }: GameProps) {
  const { width, height } = useViewport();

  return createPortal(
    <Canvas width={width} height={height}>
      {children}
    </Canvas>,
    document.getElementById("game") as Element
  );
}
