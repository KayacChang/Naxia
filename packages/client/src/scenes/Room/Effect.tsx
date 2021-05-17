import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  useAppSelector,
} from "system";
import { useViewport } from "utils";
import { useMemo } from "react";
import { RoomStatus, SkillOption } from "types";
import { Game } from "layers";
import { Spine } from "components";

export default function Effect() {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const roundResult = useAppSelector(selectRoomResult);
  const assets = useAppSelector(selectAssetsByName);

  const data = useMemo(() => {
    if (status !== RoomStatus.Result || !roundResult) {
      return;
    }

    const { game_round, ...rest } = roundResult.info;
    const target = Object.entries(rest).find(([, value]) => value);

    if (!target) return;

    return {
      bank_pair: assets("Skill_FlameThrower_Spine"),
      player_pair: assets("Skill_IceBeam_Spine"),
      player: assets("Skill_FlareBlitz_Spine"),
      banker: assets("Skill_Blizzard_Spine"),
      tie: assets("Skill_Hurricane_Spine"),
    }[target[0] as SkillOption];
  }, [status, roundResult, assets]);

  if (!data) {
    return <></>;
  }

  return (
    <Game className="absolute top-0 pointer-events-none">
      <Spine
        x={width / 2}
        y={height / 2}
        scale={1 / window.devicePixelRatio}
        data={data}
        mount={(spine) => {
          spine.state.setAnimation(0, "animation", false);
        }}
      />
    </Game>
  );
}
