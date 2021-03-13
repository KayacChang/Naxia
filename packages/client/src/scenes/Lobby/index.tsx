import { AssetsLoader, Canvas, useViewport } from "core";
import { PlaceHolder } from "components";
import { Sprite, Container } from "react-pixi-fiber";
import { Spritesheet, Texture } from "pixi.js";

import UI from "./UI";

import BG from "assets/map.png";
import Tachie from "assets/tachie.png";

type MapProps = {
  resources: Record<string, Texture | Spritesheet>;
};
function Map({ resources }: MapProps) {
  const { height } = useViewport();

  return (
    <>
      <Sprite texture={resources[BG] as Texture} />

      <Container>
        <Sprite
          y={height}
          anchor={{ x: 0, y: 1 }}
          texture={resources[Tachie] as Texture}
          scale={1 / window.devicePixelRatio}
        />
      </Container>
    </>
  );
}

type LayoutProps = {
  resources: Record<string, Texture | Spritesheet>;
};
function Layout({ resources }: LayoutProps) {
  const { width, height } = useViewport();

  return (
    <div className="relative mx-auto">
      <Canvas className="max-w-full" width={width} height={height}>
        <Map resources={resources} />
      </Canvas>

      <UI className="absolute top-0 w-full h-full" />
    </div>
  );
}

export function Lobby() {
  return (
    <AssetsLoader tasks={[BG, Tachie]}>
      {({ status, resources }) => {
        if (status !== "resolved") {
          return <PlaceHolder />;
        }

        return <Layout resources={resources} />;
      }}
    </AssetsLoader>
  );
}
