import { CircleLayout, Radian } from "components";
import Assets from "assets";

import Bet from "./Bet";
import Skill from "./Skill";
import { SkillSet } from "types";
import { useState } from "react";
import { useAppDispatch, room, useAppSelector, selectRoomOrder } from "system";

type BetsProps = {
  enable?: boolean;
  options: number[];
  value: number;
  onChange?: (bet: number) => void;
};
function Bets({ options, value, onChange, enable }: BetsProps) {
  return (
    <CircleLayout radius={5.2}>
      {options.map((option, index) => (
        <Radian key={option} radian={Math.PI * (1.06 + 0.2 * index)}>
          <Bet value={option} enable={enable} active={index === value} />
        </Radian>
      ))}
    </CircleLayout>
  );
}

type BetSectionProps = {
  skills: SkillSet;
  bets: number[];
};
export default function BetSection({ skills, bets }: BetSectionProps) {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectRoomOrder);
  const [bet, setBet] = useState(bets[0]);

  return (
    <div className="relative w-full h-full">
      <div className="w-24 absolute bottom-0 right-0">
        <img src={Assets.Room.Bet_Frame} alt="bet background" />
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <Bets options={bets} value={bet} onChange={setBet} />
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={8.4}>
          <Radian radian={Math.PI * 1.15}>
            <Skill
              name={skills.player.name}
              normal={Assets.Room.Skill_FlareBlitz_Normal}
              active={Assets.Room.Skill_FlareBlitz_Active}
              value={order.player}
              onClick={() => dispatch(room.order.add({ player: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.33}>
            <Skill
              name={skills.banker.name}
              normal={Assets.Room.Skill_Blizzard_Normal}
              active={Assets.Room.Skill_Blizzard_Active}
              value={order.banker}
              onClick={() => dispatch(room.order.add({ banker: bet }))}
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
              onClick={() => dispatch(room.order.add({ player_pair: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.24}>
            <Skill
              name={skills.tie.name}
              normal={Assets.Room.Skill_Hurricane_Normal}
              active={Assets.Room.Skill_Hurricane_Active}
              value={order.tie}
              onClick={() => dispatch(room.order.add({ tie: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.12}>
            <Skill
              name={skills.bank_pair.name}
              normal={Assets.Room.Skill_FlameThrower_Normal}
              active={Assets.Room.Skill_FlameThrower_Active}
              value={order.bank_pair}
              onClick={() => dispatch(room.order.add({ bank_pair: bet }))}
            />
          </Radian>
        </CircleLayout>
      </div>
    </div>
  );
}
