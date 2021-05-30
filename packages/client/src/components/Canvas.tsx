import React, { Component }  from 'react';
import { ReactNode, useEffect, useRef } from "react";
import { Application, UPDATE_PRIORITY, IApplicationOptions } from "pixi.js";
import { render } from "@inlet/react-pixi";

type CanvasProps = {
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
  options?: IApplicationOptions;
};
export function Canvas({
  width = 800,
  height = 600,
  children,
  className,
  options,
}: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !children) return;

    const app = new Application({
      width,
      height,
      view: ref.current,
      autoDensity: true,
      backgroundAlpha: 0,
      ...options,
    });

    // disable accessibility
    app.renderer.plugins.accessibility.destroy();

    // react pixi fiber render
    render(<>{children}</>, app.stage);

    // ticker render
    const update = () => app.renderer.render(app.stage);

    // mount
    app.ticker.add(update, null, UPDATE_PRIORITY.LOW);

    // unmount
    return () => {
      app.ticker.remove(update, null);
    };
  }, [ref, width, height, children, options]);

  return (
    <canvas width={width} height={height} ref={ref} className={className} />
  );
}
