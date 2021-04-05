import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";

type UIProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};
export function UI({ style, className, children }: UIProps) {
  return createPortal(
    <div
      style={style}
      className={clsx("absolute top-0 w-full h-full", className)}
    >
      {children}
    </div>,
    document.getElementById("game") as Element
  );
}
