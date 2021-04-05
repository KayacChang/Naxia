import { ResourceMap, useAssetsLoader, useViewport } from "core";
import { Game } from "layers";
import { Texture, Graphics as IGraphics, Sprite as ISprite } from "pixi.js";
import { Sprite, Text, Container, Graphics } from "react-pixi-fiber";

import BG from "assets/loading/background.png";
import FRAME from "assets/loading/loading-frame.png";
import BAR from "assets/loading/loading-bar.png";
import ITEM from "assets/loading/item.png";
import GLOW from "assets/loading/glow.png";
import { useEffect, useRef } from "react";

type ProgressBarProps = {
  resources: ResourceMap;
  value?: number;
};
function ProgressBar({ resources, value = 0 }: ProgressBarProps) {
  const { width } = useViewport();

  const maskRef = useRef<IGraphics>(null);
  const barRef = useRef<ISprite>(null);
  const glowRef = useRef<ISprite>(null);

  useEffect(() => {
    if (!maskRef.current || !barRef.current || !glowRef.current) return;

    const mask = maskRef.current;
    const bar = barRef.current;
    const glow = glowRef.current;

    const { x, width, height } = bar;

    bar.mask = mask
      .beginFill(0xffffff)
      .drawRect(x - width / 2, -0.5 * height, width * value, height);

    glow.x = x - width / 2 + width * value;
  }, [maskRef.current, barRef.current, glowRef.current]);

  return (
    <Container>
      <Sprite
        x={width / 2}
        anchor={0.5}
        scale={1 / window.devicePixelRatio}
        texture={resources[FRAME] as Texture}
      />

      <Graphics ref={maskRef} />

      <Sprite
        x={width / 2 - 4}
        anchor={0.5}
        scale={1 / window.devicePixelRatio}
        texture={resources[BAR] as Texture}
        ref={barRef}
      />

      <Sprite
        anchor={0.5}
        scale={1 / window.devicePixelRatio}
        texture={resources[GLOW] as Texture}
        ref={glowRef}
      />
    </Container>
  );
}

type TitleProps = {
  resources: ResourceMap;
};
function Title({ resources }: TitleProps) {
  const { width } = useViewport();
  return (
    <Container x={width / 2} y={-30} scale={1 / window.devicePixelRatio}>
      <Sprite
        x={-100}
        scale={{ x: -1, y: 1 }}
        texture={resources[ITEM] as Texture}
      />

      <Text
        anchor={{ x: 0.5, y: 0.18 }}
        text="加載中"
        style={{ fill: 0xfff5e4, fontSize: 48, fontFamily: "Noto Serif TC" }}
      />

      <Sprite x={100} texture={resources[ITEM] as Texture} />
    </Container>
  );
}

export function Loading() {
  const { width, height } = useViewport();
  const { status, resources } = useAssetsLoader([BG, FRAME, BAR, ITEM, GLOW]);

  if (status !== "resolved") {
    return <></>;
  }

  return (
    <Game>
      <Sprite
        width={width}
        height={height}
        texture={resources[BG] as Texture}
      />

      <Container y={height * 0.85}>
        <ProgressBar resources={resources} value={0.8} />

        <Title resources={resources} />

        <Text
          x={50}
          y={14}
          text="小提示:提示內容提示內容..."
          style={{
            fill: 0xfadc64,
            fontSize: 12,
            fontFamily: "Noto Serif TC",
          }}
        />
      </Container>
    </Game>
  );
}
