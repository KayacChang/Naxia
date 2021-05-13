import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  useAppSelector,
} from "system";
import { useViewport } from "utils";
import { useMemo } from "react";
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

  const spine = useMemo(() => {
    if (status !== RoomStatus.Result || !roundResult) return;

    const { game_round, ...rest } = roundResult.info;
    const target = Object.entries(rest).find(([, value]) => value);
    if (!target) return;

    const [animation] = target;

    switch (animation) {
      case "bank_pair":
        return new Spine(assets("Skill_FlameThrower_Spine"));
      case "player_pair":
        return new Spine(assets("Skill_IceBeam_Spine"));
      case "player":
        return new Spine(assets("Skill_FlareBlitz_Spine"));
      case "banker":
        return new Spine(assets("Skill_Blizzard_Spine"));
      case "tie":
        return new Spine(assets("Skill_Hurricane_Spine"));
    }

    return;
  }, [status, roundResult, assets]);

  return (
    <Game className="absolute top-0 pointer-events-none">
      <Container
        x={width / 2}
        y={height / 2}
        scale={1 / window.devicePixelRatio}
        ref={(ref: TContainer | null) => {
          if (!ref || !spine) return;

          spine.state.setAnimation(0, "animation", false);

          ref.addChild(spine);
        }}
      />
    </Game>
  );
}
