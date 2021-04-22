import { Viewport as _Viewport } from "pixi-viewport";
import { Container as TContainer } from "pixi.js";
import { ReactNode } from "react";
import { CustomPIXIComponent, Container } from "react-pixi-fiber";

const viewport = new _Viewport();

type ViewportProps = {
  screenWidth: number;
  screenHeight: number;
  moved?: () => void;
};
function customDisplayObject({ screenWidth, screenHeight }: ViewportProps) {
  viewport.screenWidth = screenWidth;
  viewport.screenHeight = screenHeight;

  return viewport;
}

function customApplyProps() {}

function customDidAttach(viewport: _Viewport) {
  const root = viewport.children[0] as TContainer;

  viewport.worldWidth = root.width;
  viewport.worldHeight = root.height;

  viewport.clamp({ direction: "all" });
  viewport.clampZoom({
    maxScale: 0.7,
    minScale: 0.5,
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
