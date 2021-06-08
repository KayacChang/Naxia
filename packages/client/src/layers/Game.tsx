import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas, ErrorBoundary } from "components";
import { IApplicationOptions } from "@pixi/app";
import { Provider } from "react-redux";
import { store, useViewport } from "system";
import clsx from "clsx";

type GameProps = {
  children?: ReactNode;
  className?: string;
  options?: IApplicationOptions;
};
export function Game({ children, className, options }: GameProps) {
  const { width, height } = useViewport();

  return createPortal(
    <ErrorBoundary>
      <Canvas
        width={width}
        height={height}
        className={clsx("fixed", className)}
        options={options}
      >
        <Provider store={store}>{children}</Provider>
      </Canvas>
    </ErrorBoundary>,
    document.getElementById("root") as HTMLElement
  );
}
