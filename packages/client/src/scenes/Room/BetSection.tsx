import { CircleLayout, Radian } from "components";
import Assets from "assets";

import Bet from "./Bet";
import Skill from "./Skill";
import { Order, SkillSet } from "types";
import { useCallback } from "react";

type BetSectionProps = {
  enable: boolean;
  skills: SkillSet;
  order: Order;
  setOrder: (order: Order) => void;
  bets: number[];
};
export default function BetSection({
  enable,
  skills,
  order,
  setOrder,
  bets,
}: BetSectionProps) {
  const onSkillClick = useCallback(
    (skill: keyof SkillSet) => {
      setOrder({ ...order, [skill]: order[skill] + bets[1] });
    },
    [order]
  );

  return (
    <div className="relative w-full h-full">
      <div className="w-24 absolute bottom-0 right-0">
        <img src={Assets.Room.Bet_Frame} alt="bet background" />
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={5.2}>
          <Radian radian={Math.PI * 1.06}>
            <Bet value={bets[0]} enable={enable} />
          </Radian>

          <Radian radian={Math.PI * 1.25}>
            <Bet value={bets[1]} enable={enable} active />
          </Radian>

          <Radian radian={Math.PI * 1.44}>
            <Bet value={bets[2]} enable={enable} />
          </Radian>
        </CircleLayout>
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={8.4}>
          <Radian radian={Math.PI * 1.15}>
            <Skill
              name={skills.player.name}
              normal={Assets.Room.Skill_FlareBlitz_Normal}
              active={Assets.Room.Skill_FlareBlitz_Active}
              value={order.player}
              onClick={() => onSkillClick("player")}
              enable={enable}
            />
          </Radian>

          <Radian radian={Math.PI * 1.33}>
            <Skill
              name={skills.banker.name}
              normal={Assets.Room.Skill_Blizzard_Normal}
              active={Assets.Room.Skill_Blizzard_Active}
              value={order.banker}
              onClick={() => onSkillClick("banker")}
              enable={enable}
            />
          </Radian>
        </CircleLayout>
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={12}>
          <Radian radian={Math.PI * 1.35}>
            <Skill
              name={skills.player_pair.name}
              normal={Assets.Room.Skill_IceBeam_Normal}
              active={Assets.Room.Skill_IceBeam_Active}
              value={order.player_pair}
              onClick={() => onSkillClick("player_pair")}
              enable={enable}
            />
          </Radian>

          <Radian radian={Math.PI * 1.24}>
            <Skill
              name={skills.tie.name}
              normal={Assets.Room.Skill_Hurricane_Normal}
              active={Assets.Room.Skill_Hurricane_Active}
              value={order.tie}
              onClick={() => onSkillClick("tie")}
              enable={enable}
            />
          </Radian>

          <Radian radian={Math.PI * 1.12}>
            <Skill
              name={skills.bank_pair.name}
              normal={Assets.Room.Skill_FlameThrower_Normal}
              active={Assets.Room.Skill_FlameThrower_Active}
              value={order.bank_pair}
              onClick={() => onSkillClick("bank_pair")}
              enable={enable}
            />
          </Radian>
        </CircleLayout>
      </div>
    </div>
  );
}
