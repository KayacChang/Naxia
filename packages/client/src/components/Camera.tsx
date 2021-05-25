import React, { Component }  from 'react';
import { Viewport as _Viewport } from "pixi-viewport";
import { PixiComponent, Container, applyDefaultProps } from "@inlet/react-pixi";
import { Container as TContainer } from "@pixi/display";
import { ReactNode } from "react";

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
  didMount: (viewport, parent) => {
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

type CameraProps = ViewportProps & {
  children: ReactNode;
};
export function Camera({ children, ...props }: CameraProps) {
  return (
    <Viewport {...props}>
      <Container>{children}</Container>
    </Viewport>
  );
}
