import clsx from "clsx";
import Assets from "assets";
import Skill from "./Skill";
import {
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

  if (!info) return <></>;

  const skills = info.skills;

  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Room.Room_Status} alt="bet information" />

      <div className="absolute top-0 h-full w-full px-4 pb-2">
        <div className="w-full h-full text-white flex flex-col">
          <h3
            className={clsx(
              "text-fansy space-x-1",
              "text-xxs lg:text-xl xl:text-3xl",
              "h-1/6 pl-1/10",
              "flex items-center"
            )}
          >
            <span className="font-noto">線上人數:</span>
            <span>{users}</span>
          </h3>

          <div className="lg:-mt-1 text-xxs lg:text-xl xl:text-2xl">
            <div className="flex justify-center space-x-4 lg:px-1/10">
              <Skill
                name={skills.bank_pair.name}
                normal={Assets.Room.Skill_FlameThrower_Normal}
              />
              <Skill
                name={skills.tie.name}
                normal={Assets.Room.Skill_Hurricane_Normal}
              />
              <Skill
                name={skills.player_pair.name}
                normal={Assets.Room.Skill_IceBeam_Normal}
              />
            </div>

            <div className="flex justify-center space-x-4 px-10 lg:px-1/4">
              <Skill
                name={skills.player.name}
                normal={Assets.Room.Skill_FlareBlitz_Normal}
              />
              <Skill
                name={skills.banker.name}
                normal={Assets.Room.Skill_Blizzard_Normal}
              />
            </div>
          </div>

          <h5
            className={clsx(
              "text-fansy space-x-1",
              "flex-1 flex justify-center items-center",
              "pt-1/24 xl:pt-0",
              "text-xs lg:text-xl xl:text-3xl"
            )}
          >
            <span className="font-noto">累計金額:</span>
            <span>{totalBet}</span>
          </h5>
        </div>
      </div>
    </div>
  );
}
