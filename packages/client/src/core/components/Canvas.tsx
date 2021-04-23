import { ReactNode, useEffect, useRef } from "react";
import { settings, ENV, Application, UPDATE_PRIORITY } from "pixi.js";
import * as PIXI from "pixi.js";
import { render } from "react-pixi-fiber";

global.PIXI = PIXI;

// force using WEBGL2
// because when start at using mobile emulator and then switch to desktop,
// create renderer will throw error
settings.PREFER_ENV = ENV.WEBGL2;

type CanvasProps = {
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
};
export function Canvas({
  width = 800,
  height = 600,
  children,
  className,
}: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !children) return;

    const app = new Application({
      width,
      height,
      view: ref.current,
      autoDensity: true,
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

  return (
    <canvas width={width} height={height} ref={ref} className={className} />
  );
}
