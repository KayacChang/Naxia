import React, { Component }  from 'react';
import { useMemo, useState } from "react";
import { identity } from "ramda";
import { Sprite, Container, Text } from "@inlet/react-pixi";

import { useAppSelector, selectAssetsByName } from "system";
import { Spine } from "components";
import { filters } from "pixi.js";

type DungeonProps = {
  id: number;
  title: string;
  x: number;
  y: number;
  lock?: boolean;
  onClick?: () => void;
  showLockAnim?: boolean;
  onClear?: () => void;
};
export default function Dungeon({
  id,
  x,
  y,
  title,
  lock,
  onClick,
  showLockAnim = false,
  onClear,
}: DungeonProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const assets = useAppSelector(selectAssetsByName);

  const filter = useMemo(() => {
    if (!lock) return [];

    const colorMatrix = new filters.ColorMatrixFilter();
    colorMatrix.blackAndWhite(true);

    return [colorMatrix];
  }, [lock]);

  return (
    <Container
      x={x}
      y={y}
      interactive={true}
      buttonMode={true}
      pointerdown={onClick || identity}
    >
      <Container filters={filter}>
        <Sprite
          ref={(ref) => {
            setWidth(ref?.width || 0);
            setHeight(ref?.height || 0);
          }}
          texture={assets(`Dungeon_${id}`)}
        />

        <Sprite x={-68} y={-16} texture={assets("Dungeon_Frame")} />
      </Container>

      {lock && (
        <Sprite
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          texture={assets("Lock")}
        />
      )}

      {showLockAnim && (
        <Spine
          x={width / 2}
          y={height / 2}
          data={assets("Lock_Anim")}
          mount={(spine) => {
            spine.state.setAnimation(0, "animation", false);
            spine.state.addListener({ complete: onClear });
          }}
        />
      )}

      <Text
        anchor={{ x: 0.5, y: 0 }}
        x={width / 2}
        y={198}
        style={{
          fill: lock ? ["#ffffff"] : ["#fef3c7", "#fde68a", "#fbbf24"],
          fontFamily: "kai",
          fontSize: 32,
          dropShadow: true,
          dropShadowColor: "#000000",
          dropShadowBlur: 4,
          dropShadowAngle: Math.PI / 6,
        }}
        text={title}
      />
    </Container>
  );
}
