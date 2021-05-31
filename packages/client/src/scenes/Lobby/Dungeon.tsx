import React from "react";
import { useMemo, useState } from "react";
import { identity } from "ramda";
import { Sprite, Container, Text } from "@inlet/react-pixi";

import {
  useAppSelector,
  selectAssetsByName,
  selectUnlockAnim,
  useAppDispatch,
  Dungeon as DungeonSystem,
} from "system";
import { Spine } from "components";
import { Circle, filters } from "pixi.js";

type DungeonProps = {
  id: number;
  title: string;
  x: number;
  y: number;
  lock?: boolean;
  onClick?: () => void;
};
export default function Dungeon({
  id,
  x,
  y,
  title,
  lock,
  onClick,
}: DungeonProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const assets = useAppSelector(selectAssetsByName);
  const dispatch = useAppDispatch();

  const showLockAnim = useAppSelector(selectUnlockAnim) === id;

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
      pointerup={onClick || identity}
      hitArea={new Circle(width / 2, height / 2, 100)}
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

      <Spine
        visible={showLockAnim}
        x={width / 2}
        y={height / 2}
        data={assets("Lock_Anim")}
        mount={(spine) => {
          if (!showLockAnim) return;

          spine.state.setAnimation(0, "animation", false);

          spine.state.addListener({
            complete: () => {
              requestAnimationFrame(() => dispatch(DungeonSystem.anim.clear()));
            },
          });
        }}
      />

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
