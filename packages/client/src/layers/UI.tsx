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
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  return createPortal(
    <div
      ref={ref}
      style={{ width: `${width}px`, height: isiPad ? '100%' : `${height}px`, ...style }}
      className={clsx("fixed overflow-hidden", className)}
      onClick={onClick}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
