import { Viewport as _Viewport } from "pixi-viewport";
import { PixiComponent, Container, applyDefaultProps } from "@inlet/react-pixi";
import { Container as TContainer } from "@pixi/display";
import { ReactNode, useEffect, useRef } from "react";

const viewport = new _Viewport();

type ViewportProps = {
  screenWidth: number;
  screenHeight: number;
  pause?: boolean;
};
const Viewport = PixiComponent<ViewportProps, _Viewport>("Viewport", {
  create: ({ screenWidth, screenHeight, pause = false }) => {
    viewport.screenWidth = screenWidth;
    viewport.screenHeight = screenHeight;
    viewport.pause = pause;

    return viewport;
  },
  didMount: (viewport) => {
    const root = viewport.children[0] as TContainer;
    viewport.worldWidth = root.width;
    viewport.worldHeight = root.height;
    viewport.clamp({ direction: "all" });
    viewport.clampZoom({
      maxScale: 0.7,
      minScale: 0.5,
    });
    viewport.drag().pinch().wheel().decelerate();
  },
  willUnmount: (instance, parent) => {},
  applyProps: (instance, oldP, newP) => {
    applyDefaultProps(instance, oldP, newP);
  },
});

type CameraProps = {
  screenWidth: number;
  screenHeight: number;
  children: ReactNode;
  mount?: (viewport: _Viewport) => void;
  unmount?: (viewport: _Viewport) => void;
};
export function Camera({ children, mount, unmount, ...props }: CameraProps) {
  const ref = useRef<_Viewport>(null);

  useEffect(() => {
    const current = ref.current;

    if (!current) return;

    mount?.(current);

    return () => void unmount?.(current);
  }, [mount, unmount]);

  return (
    <Viewport {...props} ref={ref}>
      <Container>{children}</Container>
    </Viewport>
  );
}
