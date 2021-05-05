import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  SkeletonData,
  useAppSelector,
} from "system";
import { useViewport } from "utils";
import { useEffect, useState } from "react";
import { CustomSpine, Spine } from "components";
import { RoomStatus } from "types";
import { Container } from "@inlet/react-pixi";
import { Game } from "layers";

export default function Effect() {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const roundResult = useAppSelector(selectRoomResult);

  const assets = useAppSelector(selectAssetsByName);
  const [animation, setAnimation] = useState<SkeletonData | undefined>(
    undefined
  );

  useEffect(() => {
    if (status !== RoomStatus.Result || !roundResult) return;

    if (roundResult.result === "lose") {
      return;
    }

    if (roundResult.result === "win") {
      const { game_round, ...rest } = roundResult.info;
      const target = Object.entries(rest).find(([, win]) => win);
      if (!target) return;

      const [animation] = target;

      switch (animation) {
        case "bank_pair":
          setAnimation(assets("Skill_DoubleFire"));
          return;
        case "player_pair":
          setAnimation(assets("Skill_DoubleIceHit"));
          return;
        case "player":
          setAnimation(assets("Skill_Fire"));
          return;
        case "banker":
          setAnimation(assets("Skill_IceHit"));
          return;
        case "tie":
          setAnimation(assets("Skill_Wind"));
          return;
      }
    }
  }, [roundResult, status]);

  if (!animation) {
    return <></>;
  }

  return (
    <Game className="absolute top-0">
      <Spine
        data={animation}
        x={width / 2}
        y={height / 2}
        scale={1 / window.devicePixelRatio}
        ref={(ref: CustomSpine) => {
          if (!ref) return;

          ref.state.setAnimation(0, "animation", false);
          ref.state.addListener({
            complete: () => setAnimation(undefined),
          });
        }}
      />
    </Game>
  );
}
