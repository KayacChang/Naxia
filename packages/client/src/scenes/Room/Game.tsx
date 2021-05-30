import React, { Component }  from 'react';
import {
  useAppSelector,
  selectRoomStatusCurrent,
  selectRoomBossCurrent,
  selectRoomResult,
  getAssets,
  useViewport,
} from "system";
import { RoomStatus } from "types";
import { Spine } from "components";
import { memo } from "react";
import anime from "animejs";

const Boss = memo(() => {
  const { width, height } = useViewport();
  const boss = useAppSelector(selectRoomBossCurrent);
  const status = useAppSelector(selectRoomStatusCurrent);
  const result = useAppSelector(selectRoomResult);

  return (
    <Spine
      x={width / 2}
      y={height / 2}
      scale={1 / window.devicePixelRatio}
      data={boss?.id && getAssets(`Boss.${boss.id}`)}
      mount={(spine) => {
        if (
          status === RoomStatus.Start ||
          status === RoomStatus.Stop ||
          status === RoomStatus.Result
        ) {
          spine.alpha = 1;
        }

        if (status === RoomStatus.Result && result?.result) {
          spine.state.setAnimation(
            0,
            result.result === "win" ? "BeAttack" : "Attack",
            false
          );

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
      unmount={(spine) => spine.state.clearListeners()}
    />
  );
});

const Dealing = memo(() => {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);

  return (
    <Spine
      x={width / 2}
      y={height / 2}
      visible={status === RoomStatus.Stop}
      scale={1 / window.devicePixelRatio}
      data={getAssets("Anim_Dealing")}
      mount={(spine) => spine.state.setAnimation(0, "animation", true)}
    />
  );
});

export default memo(() => (
  <>
    <Boss />

    <Dealing />
  </>
));
