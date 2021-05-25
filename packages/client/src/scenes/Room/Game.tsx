import React, { Component }  from 'react';
import { Container } from "@inlet/react-pixi";
import {
  useAppSelector,
  selectRoomStatusCurrent,
  selectAssetsByName,
  selectRoomBossCurrent,
  selectRoomResult,
  getViewPort,
} from "system";
import { RoomStatus } from "types";
import anime from "animejs";
import { Spine } from "components";
import { memo } from "react";

const Boss = memo(() => {
  const { width, height } = getViewPort();
  const boss = useAppSelector(selectRoomBossCurrent);
  const assets = useAppSelector(selectAssetsByName);
  const status = useAppSelector(selectRoomStatusCurrent);
  const result = useAppSelector(selectRoomResult);

  if (boss === undefined) {
    return <Container />;
  }

  return (
    <Spine
      x={width / 2}
      y={height / 2}
      scale={1 / window.devicePixelRatio}
      data={assets(String(boss.id))}
      mount={(spine) => {
        if (status === RoomStatus.Result) {
          if (result?.result === "win") {
            spine.state.setAnimation(0, "BeAttack", false);
          }

          spine.state.addListener({
            complete: () =>
              anime({
                targets: spine,
                alpha: [1, 0],
                duration: 1000,
                easing: "easeOutCubic",
              }).finished.then(() => spine.state.clearListeners()),
          });
        }

        if (status === RoomStatus.Change) {
          anime({
            targets: spine,
            alpha: [0, 1],
            delay: 1000,
            duration: 1000,
            easing: "easeOutCubic",
          });
        }

        if (spine.state.tracks.length <= 0) {
          spine.state.setAnimation(0, "Idle", true);
        }
      }}
    />
  );
});

const Dealing = memo(() => {
  const { width, height } = getViewPort();
  const assets = useAppSelector(selectAssetsByName);
  const status = useAppSelector(selectRoomStatusCurrent);

  return (
    <Spine
      x={width / 2}
      y={height / 2}
      visible={status === RoomStatus.Stop}
      scale={1 / window.devicePixelRatio}
      data={assets("Anim_Dealing")}
      mount={(spine) => spine.state.setAnimation(0, "animation", true)}
    />
  );
});

export default function GameView() {
  return (
    <>
      <Boss />

      <Dealing />
    </>
  );
}
