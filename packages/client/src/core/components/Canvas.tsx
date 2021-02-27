import { useRef, useEffect, ReactNode } from "react";
import { UPDATE_PRIORITY, settings, ENV, Application } from "pixi.js";
import * as PIXI from "pixi.js";
import { render } from "react-pixi-fiber";

// PIXI DevTools
if (process.env.NODE_ENV === "development") {
  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
}

// force using WEBGL2
// because when start at using mobile emulator and then switch to desktop,
// create renderer will throw error
settings.PREFER_ENV = ENV.WEBGL2;

type CanvasProps = {
  className?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
};
export function Canvas({
  width = 800,
  height = 600,
  className,
  children,
}: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !children) return;

    const app = new Application({
      width,
      height,
      view: ref.current,
    });

    // react pixi fiber render
    render(<>{children}</>, app.stage);

    // ticker render
    const update = () => app.renderer.render(app.stage);

    // mount
    app.ticker.add(update, null, UPDATE_PRIORITY.LOW);

    // unmount
    return () => {
      app.ticker.remove(update, null);

      app.destroy();
    };
  }, [ref, width, height, children]);

  return <canvas className={className} ref={ref} />;
}
