import { ReactNode } from "react";
import { Canvas, useViewport } from "core";
import { createPortal } from "react-dom";

type GameProps = {
  children?: ReactNode;
  className?: string;
};
export function Game({ children, className }: GameProps) {
  const { width, height } = useViewport();

  return createPortal(
    <Canvas width={width} height={height} className={className}>
      {children}
    </Canvas>,
    document.getElementById("root") as HTMLElement
  );
}
