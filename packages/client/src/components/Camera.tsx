import React from "react";
import { Viewport as _Viewport } from "pixi-viewport";
import { PixiComponent, Container, applyDefaultProps } from "@inlet/react-pixi";
import { Container as TContainer } from "@pixi/display";
import { ReactNode, useEffect, useRef } from "react";
import { Rectangle } from "@pixi/math";
import { throttle } from "utils";

const viewport = new _Viewport();

type ViewportProps = {
  screenWidth: number;
  screenHeight: number;
  pause?: boolean;
};
const Viewport = PixiComponent<ViewportProps, _Viewport>("Viewport", {
  create: ({ screenWidth, screenHeight }) => {
    viewport.screenWidth = screenWidth;
    viewport.screenHeight = screenHeight;

    return viewport;
  },
  didMount: (viewport) => {
    const root = viewport.children[0] as TContainer;
    viewport.worldWidth = root.width;
    viewport.worldHeight = root.height;
    viewport.clamp({ direction: "all" });
    viewport.clampZoom({
      maxScale: 1,
      minScale: 0.6,
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

    const stage = current.children[0];
    const hitArea = new Rectangle(0, 0, current.width, current.height);

    function interactive(flag: boolean) {
      stage.hitArea = flag ? hitArea : new Rectangle(0, 0, 0, 0);
    }

    current.on("drag-start", () => interactive(false));
    current.on(
      "drag-end",
      throttle(300, () => interactive(true))
    );

    return () => void unmount?.(current);
  }, [mount, unmount]);

  return (
    <Viewport {...props} ref={ref}>
      <Container>{children}</Container>
    </Viewport>
  );
}
