import clsx from "clsx";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type UIProps = {
  className?: string;
  children: ReactNode;
};
export function UI({ className, children }: UIProps) {
  return createPortal(
    <div className={clsx("absolute top-0 w-full h-full", className)}>
      {children}
    </div>,
    document.getElementById("ui") as Element
  );
}
