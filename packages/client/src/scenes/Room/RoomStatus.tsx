import clsx from "clsx";
import Assets from "assets";
import Skill from "./Skill";
import { SkillSet } from "types";

type RoomStatusProps = {
  skills: SkillSet;
  className: string;
};
export default function RoomStatus({ skills, className }: RoomStatusProps) {
  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Room.Status} alt="bet information" />

      <div className="absolute top-0 h-full w-full px-4">
        <div className="w-full h-full text-white">
          <h3 className="text-xxs py-1 px-2 text-fansy space-x-1">
            <span className="font-noto">線上人數:</span>
            <span>2000</span>
          </h3>

          <div>
            <div className="flex justify-center space-x-4">
              <Skill
                size="sm"
                name={skills.bank_pair.name}
                normal={Assets.Room.Skill_FlameThrower_Normal}
              />
              <Skill
                size="sm"
                name={skills.tie.name}
                normal={Assets.Room.Skill_Hurricane_Normal}
              />
              <Skill
                size="sm"
                name={skills.player_pair.name}
                normal={Assets.Room.Skill_IceBeam_Normal}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Skill
                size="sm"
                name={skills.player.name}
                normal={Assets.Room.Skill_FlareBlitz_Normal}
              />
              <Skill
                size="sm"
                name={skills.banker.name}
                normal={Assets.Room.Skill_Blizzard_Normal}
              />
            </div>
          </div>

          <h5 className="text-xs pt-1 mt-0.5 flex justify-center text-fansy space-x-1">
            <span className="font-noto">累計金額:</span>
            <span>39600</span>
          </h5>
        </div>
      </div>
    </div>
  );
}
