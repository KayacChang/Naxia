import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  useAppSelector,
} from "system";
import { useViewport } from "utils";
import { useEffect, useState } from "react";
import { RoomStatus } from "types";
import { Game } from "layers";
import { Container } from "@inlet/react-pixi";
import { Container as TContainer } from "@pixi/display";
import { Spine } from "@pixi-spine/all-3.8";

export default function Effect() {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const roundResult = useAppSelector(selectRoomResult);

  const assets = useAppSelector(selectAssetsByName);
  const [skill, setSkill] = useState<string | undefined>();

  useEffect(() => {
    if (status !== RoomStatus.Result || !roundResult) return;

    const { game_round, ...rest } = roundResult.info;
    const target = Object.entries(rest).find(([, value]) => value);
    if (!target) return;

    const [animation] = target;

    switch (animation) {
      case "bank_pair":
        setSkill("Skill_FlameThrower_Spine");
        return;
      case "player_pair":
        setSkill("Skill_IceBeam_Spine");
        return;
      case "player":
        setSkill("Skill_FlareBlitz_Spine");
        return;
      case "banker":
        setSkill("Skill_Blizzard_Spine");
        return;
      case "tie":
        setSkill("Skill_Hurricane_Spine");
        return;
    }
  }, [roundResult, status, setSkill]);

  return (
    <Game className="absolute top-0">
      <Container
        x={width / 2}
        y={height / 2}
        scale={1 / window.devicePixelRatio}
        ref={(ref: TContainer | null) => {
          if (!ref || !skill) return;

          const spine = new Spine(assets(skill));
          spine.state.setAnimation(0, "animation", false);

          spine.state.addListener({
            complete: () => setSkill(undefined),
          });

          ref.addChild(spine);
        }}
      />
    </Game>
  );
}
