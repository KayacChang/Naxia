import { CircleLayout, Radian } from "components";
import Assets from "assets";

import Bet from "./Bet";
import Skill from "./Skill";
import { RoomStatus } from "types";
import { useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  room,
  useAppSelector,
  selectRoomOrder,
  selectRoomStatusCurrent,
  useDungeonInfo,
  useViewport,
  selectRoomStream,
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
  value: number;
  onChange?: (bet: number) => void;
};
function Bets({ options, value, onChange, enable }: BetsProps) {
  const { height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const show = status === RoomStatus.Start;

  const [active, setActive] = useState(options.indexOf(value));

  const { direction, onPressEnd, onPressStart } = useSwipe();

  useEffect(() => {
    const _clamp = clamp(0, options.length - 1);

    setActive((active) => _clamp(active + direction));
  }, [direction, setActive, options.length]);

  useEffect(() => onChange?.(options[active]), [onChange, options, active]);

  return (
    <div
      className={clsx(
        "absolute bottom-0 right-0 w-full h-full",
        "flex items-end justify-end",
        "pointer-events-auto",
        show
          ? "ease-out-expo"
          : "transform translate-x-1/2 translate-y-1/2 ease-in-expo",
        "transition-transform duration-700"
      )}
      style={{ willChange: "transform" }}
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onTouchStart={onPressStart}
      onTouchEnd={onPressEnd}
    >
      <div className="flex items-end justify-end relative">
        <div className="w-24 lg:w-8/12 xl:w-10/12">
          <img src={Assets.Room.Bet_Frame} alt="bet background" />
        </div>

        <div
          className={clsx(
            "absolute lg:pl-10",
            "transform translate-x-1/2 translate-y-1/2",
            "text-xs lg:text-lg xl:text-2xl"
          )}
        >
          <CircleLayout radius={6 * (height / 420)}>
            {options.map((option, index) => (
              <Radian
                key={option}
                radian={Math.PI * (1 + 0.26 * (index - active + 1))}
                className="transition-transform"
                style={{ willChange: "transform" }}
              >
                <Bet
                  className="w-12 lg:w-8/12 xl:w-10/12"
                  value={option}
                  enable={enable}
                  active={index === active}
                />
              </Radian>
            ))}
          </CircleLayout>
        </div>
      </div>
    </div>
  );
}

export default function BetSection() {
  const { height } = useViewport();
  const info = useDungeonInfo();

  const skills = info?.skills;
  const bets = info?.bets;

  const dispatch = useAppDispatch();
  const order = useAppSelector(selectRoomOrder);
  const isStream = useAppSelector(selectRoomStream);

  const [bet, setBet] = useState(bets?.[0] || 0);

  if (!skills || !bets) return <></>;

  return (
    <div
      className={clsx(
        "relative w-full h-full",
        "text-xs lg:text-lg xl:text-2xl"
      )}
    >
      <Bets options={bets} value={bet} onChange={setBet} />

      <div
        className={clsx(
          "absolute bottom-0 right-0",
          "transform translate-x-1/2 translate-y-1/2"
        )}
      >
        <CircleLayout radius={9.2 * (height / 420)}>
          <Radian radian={Math.PI * 1.17}>
            <Skill
              className="w-14 lg:w-6/12 xl:w-8/12"
              name={isStream ? "閒" : skills.player.name}
              normal={Assets.Room.Skill_FlareBlitz_Normal}
              active={Assets.Room.Skill_FlareBlitz_Active}
              value={order.player}
              hasBorder={true}
              onClick={() => dispatch(room.order.add({ player: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.32}>
            <Skill
              className="w-14 lg:w-6/12 xl:w-8/12"
              name={isStream ? "莊" : skills.banker.name}
              normal={Assets.Room.Skill_Blizzard_Normal}
              active={Assets.Room.Skill_Blizzard_Active}
              value={order.banker}
              hasBorder={true}
              onClick={() => dispatch(room.order.add({ banker: bet }))}
            />
          </Radian>
        </CircleLayout>
      </div>

      <div
        className={clsx(
          "absolute bottom-0 right-0",
          "transform translate-x-1/2 translate-y-1/2"
        )}
      >
        <CircleLayout radius={12.8 * (height / 420)}>
          <Radian radian={Math.PI * 1.35}>
            <Skill
              className="w-14 lg:w-6/12 xl:w-8/12"
              name={isStream ? "閒對" : skills.player_pair.name}
              normal={Assets.Room.Skill_IceBeam_Normal}
              active={Assets.Room.Skill_IceBeam_Active}
              value={order.player_pair}
              hasBorder={true}
              onClick={() => dispatch(room.order.add({ player_pair: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.24}>
            <Skill
              className="w-14 lg:w-6/12 xl:w-8/12"
              name={isStream ? "和" : skills.tie.name}
              normal={Assets.Room.Skill_Hurricane_Normal}
              active={Assets.Room.Skill_Hurricane_Active}
              value={order.tie}
              hasBorder={true}
              onClick={() => dispatch(room.order.add({ tie: bet }))}
            />
          </Radian>

          <Radian radian={Math.PI * 1.12}>
            <Skill
              className="w-14 lg:w-6/12 xl:w-8/12"
              name={isStream ? "莊對" : skills.bank_pair.name}
              normal={Assets.Room.Skill_FlameThrower_Normal}
              active={Assets.Room.Skill_FlameThrower_Active}
              value={order.bank_pair}
              hasBorder={true}
              onClick={() => dispatch(room.order.add({ bank_pair: bet }))}
            />
          </Radian>
        </CircleLayout>
      </div>
    </div>
  );
}
