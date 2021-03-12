import { AssetsLoader, Canvas, useViewport } from "core";
import { PlaceHolder } from "components";
import { Sprite, Container } from "react-pixi-fiber";
import { Spritesheet, Texture } from "pixi.js";
import { useNetwork } from "network";

import UI from "./UI";

import BG from "assets/map.png";
import Tachie from "assets/tachie.png";
import { useEffect } from "react";

type MapProps = {
  resources: Record<string, Texture | Spritesheet>;
};
function Map({ resources }: MapProps) {
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

type LayoutProps = {
  resources: Record<string, Texture | Spritesheet>;
};
function Layout({ resources }: LayoutProps) {
  const { width, height } = useViewport();
  const send = useNetwork();

  useEffect(() => {
    send?.(
      JSON.stringify({
        type: "login",
        id: process.env.REACT_APP_TOKEN,
      })
    );
  }, [send]);

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
