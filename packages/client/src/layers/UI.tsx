import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { useViewport } from "core";
import { createPortal } from "react-dom";

type UIProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};
export function UI({ style, className, children }: UIProps) {
  const { width, height } = useViewport();

  return createPortal(
    <div
      style={{ width: `${width}px`, height: `${height}px`, ...style }}
      className={clsx("absolute top-0 overflow-hidden", className)}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
