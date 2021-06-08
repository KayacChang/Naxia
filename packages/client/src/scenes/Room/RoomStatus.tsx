import clsx from "clsx";
import Assets from "assets";
import Skill from "./Skill";
import {
  selectRoomRoundStatus,
  selectRoomTotalBet,
  selectRoomUsers,
  useAppSelector,
  useDungeonInfo,
} from "system";

type RoomStatusProps = {
  className?: string;
};
export default function RoomStatus({ className }: RoomStatusProps) {
  const info = useDungeonInfo();
  const users = useAppSelector(selectRoomUsers);
  const totalBet = useAppSelector(selectRoomTotalBet);
  const roundStatus = useAppSelector(selectRoomRoundStatus);

  if (!info) return <></>;

  const skills = info.skills;

  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Room.Room_Status} alt="bet information" />

      <div className="absolute top-0 h-full w-full px-4 pb-2">
        <div className="w-full h-full text-white flex flex-col">
          <div className="h-1/6 pt-0.5 pl-1/10 flex items-center">
            <div
              className={clsx(
                "font-kai text-fansy space-x-1",
                "text-xxs lg:text-xl xl:text-3xl"
              )}
            >
              <span>線上人數:</span>
              <span>{users}</span>
            </div>
          </div>

          <div className="lg:-mt-1 text-xxs lg:text-xl xl:text-2xl">
            <div className="flex justify-center space-x-4 lg:px-1/10">
              <Skill
                name={skills.bank_pair.name}
                normal={Assets.Room.Skill_FlameThrower_Normal}
                value={roundStatus.bank_pair}
              />
              <Skill
                name={skills.tie.name}
                normal={Assets.Room.Skill_Hurricane_Normal}
                value={roundStatus.tie}
              />
              <Skill
                name={skills.player_pair.name}
                normal={Assets.Room.Skill_IceBeam_Normal}
                value={roundStatus.player_pair}
              />
            </div>

            <div className="flex justify-center space-x-4 px-10 lg:px-1/4">
              <Skill
                name={skills.player.name}
                normal={Assets.Room.Skill_FlareBlitz_Normal}
                value={roundStatus.player}
              />
              <Skill
                name={skills.banker.name}
                normal={Assets.Room.Skill_Blizzard_Normal}
                value={roundStatus.banker}
              />
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center pt-1/24 xl:pt-0">
            <h5
              className={clsx(
                "font-kai text-fansy space-x-1 pt-0.5",
                "text-xs lg:text-xl xl:text-3xl"
              )}
            >
              <span>累計金額:</span>
              <span>{totalBet}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
