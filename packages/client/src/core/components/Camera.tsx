import { Viewport as _Viewport } from "pixi-viewport";
import { Container as TContainer } from "pixi.js";
import { ReactNode } from "react";
import { CustomPIXIComponent, Container } from "react-pixi-fiber";

type ViewportProps = {
  screenWidth: number;
  screenHeight: number;
};
function customDisplayObject({ screenWidth, screenHeight }: ViewportProps) {
  return new _Viewport({
    screenWidth,
    screenHeight,
  });
}

function customApplyProps() {}

function customDidAttach(viewport: _Viewport) {
  const root = viewport.children[0] as TContainer;

  viewport.worldWidth = root.width;
  viewport.worldHeight = root.height;

  viewport.clamp({ direction: "all" });
  viewport.clampZoom({
    maxScale: 0.7,
    minScale: Math.max(
      viewport.screenWidth / root.width,
      viewport.screenHeight / root.height
    ),
  });
  viewport.drag().pinch().wheel().decelerate();
}

const Viewport = CustomPIXIComponent(
  { customDisplayObject, customApplyProps, customDidAttach },
  "Viewport"
);

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
