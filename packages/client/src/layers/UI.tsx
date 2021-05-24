import { CSSProperties, ReactNode } from "react";
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

  return createPortal(
    <div
      style={{ width: `${width}px`, height: `${height}px`, ...style }}
      className={clsx("absolute top-0 overflow-hidden", className)}
      onClick={onClick}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
