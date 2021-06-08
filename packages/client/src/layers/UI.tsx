import { CSSProperties, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useViewport } from "system";
import { ErrorBoundary } from "components";

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
    <ErrorBoundary>
      <div
        ref={ref}
        style={{ width: `${width}px`, height: `${height}px`, ...style }}
        className={clsx("fixed overflow-hidden", className)}
        onClick={onClick}
      >
        {children}
      </div>
    </ErrorBoundary>,
    document.getElementById("root") as HTMLElement
  );
}
