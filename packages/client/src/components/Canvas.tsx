import { ReactNode, useEffect, useRef } from "react";
import {
  settings,
  ENV,
  Application,
  UPDATE_PRIORITY,
  IApplicationOptions,
} from "pixi.js";
import { render, AppProvider } from "@inlet/react-pixi";

// force using WEBGL2
// because when start at using mobile emulator and then switch to desktop,
// create renderer will throw error
settings.PREFER_ENV = ENV.WEBGL2;

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

    // react pixi fiber render
    render(<AppProvider value={app}>{children}</AppProvider>, app.stage);

    // ticker render
    const update = () => app.renderer.render(app.stage);

    // mount
    app.ticker.add(update, null, UPDATE_PRIORITY.LOW);

    // unmount
    return () => {
      app.ticker.remove(update, null);

      app.destroy();
    };
  }, [ref, width, height, children, options]);

  return (
    <canvas width={width} height={height} ref={ref} className={className} />
  );
}
