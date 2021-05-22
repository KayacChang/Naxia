import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  useAppSelector,
} from "system";
import { useViewport } from "utils";
import { memo, useMemo } from "react";
import { RoomStatus, SkillOption } from "types";
import { Game } from "layers";
import { Spine } from "components";
import clsx from "clsx";

export default memo(function Effect() {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const roundResult = useAppSelector(selectRoomResult);
  const assets = useAppSelector(selectAssetsByName);

  const data = useMemo(() => {
    if (status !== RoomStatus.Result || !roundResult) {
      return;
    }

    if (roundResult.result === "lose") {
      return assets("Anim_Be_Attack");
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

  return (
    <Game
      className={clsx("absolute top-0 pointer-events-none", !data && "hidden")}
    >
      {data && (
        <Spine
          x={width / 2}
          y={height / 2}
          scale={1 / window.devicePixelRatio}
          data={data}
          mount={(spine) => spine.state.setAnimation(0, "animation", false)}
        />
      )}
    </Game>
  );
});
