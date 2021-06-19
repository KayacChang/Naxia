import {
  Effect,
  getViewPort,
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatusCurrent,
  selectRoomStream,
  useAppDispatch,
  useAppSelector,
} from "system";
import { memo, useMemo } from "react";
import { RoomStatus, SkillOption } from "types";
import { Game } from "layers";
import { Spine } from "components";
import clsx from "clsx";
import Sound from "assets/sound";

export default memo(() => {
  const { width, height } = getViewPort();

  const status = useAppSelector(selectRoomStatusCurrent);
  const roundResult = useAppSelector(selectRoomResult);
  const assets = useAppSelector(selectAssetsByName);
  const dispatch = useAppDispatch();
  const isStream = useAppSelector(selectRoomStream);

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

    const result = target[0] as SkillOption;

    const sound = {
      bank_pair: Sound.Room.Skill_Fire,
      player_pair: Sound.Room.Skill_IceHit,
      player: Sound.Room.Skill_DoubleFire,
      banker: Sound.Room.Skill_DoubleIceHit,
      tie: Sound.Room.Skill_Wind,
    }[result];

    dispatch(Effect.play(sound));

    return {
      bank_pair: assets("Skill_FlameThrower_Spine"),
      player_pair: assets("Skill_IceBeam_Spine"),
      player: assets("Skill_FlareBlitz_Spine"),
      banker: assets("Skill_Blizzard_Spine"),
      tie: assets("Skill_Hurricane_Spine"),
    }[result];
  }, [status, roundResult, assets, dispatch]);

  return (
    <Game
      className={clsx(
        "pointer-events-none",
        !data && "hidden",
        isStream && "hidden"
      )}
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
