import { CircleLayout, Radian } from "components";
import Assets from "assets";

import Bet from "./Bet";
import Skill from "./Skill";
import { RoomStatus, SkillSet } from "types";
import { useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  room,
  useAppSelector,
  selectRoomOrder,
  selectRoomStatusCurrent,
} from "system";
import { clamp } from "ramda";
import clsx from "clsx";

function unify(e: any) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

export function useSwipe() {
  const [direction, setDirection] = useState(0);
  const [originX, setOriginX] = useState(0);

  const onPressStart = useCallback((e) => {
    e = unify(e);

    setOriginX(e.clientX);
  }, []);

  const onPressEnd = useCallback(
    (e) => {
      e = unify(e);

      setDirection(-1 * Math.sign(e.clientX - originX));
      setOriginX(0);

      requestAnimationFrame(() => setDirection(0));
    },
    [originX]
  );

  return { direction, onPressStart, onPressEnd };
}

type BetsProps = {
  enable?: boolean;
  options: number[];
  onChange?: (bet: number) => void;
};
function Bets({ options, onChange, enable }: BetsProps) {
  const status = useAppSelector(selectRoomStatusCurrent);
  const show = status === RoomStatus.Start;

  const [active, setActive] = useState(0);

  const { direction, onPressEnd, onPressStart } = useSwipe();

  useEffect(() => {
    const _clamp = clamp(0, options.length - 3);

    setActive((active) => _clamp(active + direction));
  }, [direction, setActive, options.length]);

  useEffect(() => {
    onChange?.(options[active]);
  }, [onChange, options, active]);

  return (
    <div
      className={clsx(
        "absolute bottom-0 right-0 w-full h-full",
        "flex items-end justify-end",
        "pointer-events-auto",
        show
          ? "ease-out-expo"
          : "transform translate-x-1/2 translate-y-1/2 ease-in-expo",
        "transition-transform duration-700 "
      )}
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onTouchStart={onPressStart}
      onTouchEnd={onPressEnd}
    >
      <div className="relative">
        <div className="w-24">
          <img src={Assets.Room.Bet_Frame} alt="bet background" />
        </div>

        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
          <CircleLayout radius={5.2}>
            {options.map((option, index) => (
              <Radian
                key={option}
                radian={Math.PI * (1.06 + 0.2 * (index - active))}
                className="transition-transform"
              >
                <Bet
                  value={option}
                  enable={enable}
                  active={index === active + 1}
                />
              </Radian>
            ))}
          </CircleLayout>
        </div>
      </div>
    </div>
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
      <Bets options={bets} onChange={setBet} />

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
