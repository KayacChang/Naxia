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
          <h3 className="text-xxs py-1 px-2">線上人數: 2000</h3>

          <div>
            <div className="flex justify-center space-x-4">
              <Skill
                size="sm"
                name={skills.bank_pair.name}
                img={skills.bank_pair.img}
              />
              <Skill size="sm" name={skills.tie.name} img={skills.tie.img} />
              <Skill
                size="sm"
                name={skills.player_pair.name}
                img={skills.player_pair.img}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Skill
                size="sm"
                name={skills.player.name}
                img={skills.player.img}
              />
              <Skill
                size="sm"
                name={skills.banker.name}
                img={skills.banker.img}
              />
            </div>
          </div>

          <h5 className="text-xs pt-2 flex justify-center">
            <span>累計金額:</span>
            <span>39600</span>
          </h5>
        </div>
      </div>
    </div>
  );
}
