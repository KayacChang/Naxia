import { AssetsLoader, Canvas } from "core";
import { PlaceHolder } from "components";
import { Sprite, Container } from "react-pixi-fiber";
import { Spritesheet, Texture } from "pixi.js";

import UI from "./UI";

import BG from "assets/map.jpg";
import Tachie from "assets/tachie.png";

type MapProps = {
  width: number;
  height: number;
  resources: Record<string, Texture | Spritesheet>;
};
function Map({ resources, width, height }: MapProps) {
  return (
    <>
      <Sprite texture={resources[BG] as Texture} />

      <Container>
        <Sprite
          y={50}
          texture={resources[Tachie] as Texture}
          scale={1 / window.devicePixelRatio}
        />
      </Container>
    </>
  );
}

type Props = {
  width: number;
  height: number;
};
export function Lobby({ width, height }: Props) {
  return (
    <AssetsLoader tasks={[BG, Tachie]}>
      {({ status, resources }) => {
        if (status !== "resolved") {
          return <PlaceHolder width={width} height={height} />;
        }

        return (
          <div className="relative mx-auto">
            <Canvas className="max-w-full" width={width} height={height}>
              <Map width={width} height={height} resources={resources} />
            </Canvas>

            <UI className="absolute top-0 w-full h-full" />
          </div>
        );
      }}
    </AssetsLoader>
  );
}
