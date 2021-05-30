import React from "react";
import { CSSProperties, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useViewport } from "system";

type UIProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};
export function UI({ style, className, children, onClick }: UIProps) {
  const { width, height } = useViewport();
  const ref = useRef<HTMLDivElement>(null);

  return createPortal(
    <div
      ref={ref}
      style={{ width: `${width}px`, height: `${height}px`, ...style }}
      className={clsx("fixed top-0 overflow-hidden", className)}
      onClick={onClick}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
