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

function customDidAttach(instance: _Viewport) {
  const root = instance.children[0] as TContainer;

  instance.worldWidth = root.width;
  instance.worldHeight = root.height;

  instance.clamp({ direction: "all" });
  instance.drag().pinch().wheel().decelerate();
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
