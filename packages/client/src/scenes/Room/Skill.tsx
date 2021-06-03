import clsx from "clsx";
import Assets from "assets";
import { ReactNode, useCallback, useState } from "react";
import {
  selectRoomHasSubmitted,
  selectRoomResult,
  selectRoomStatusCurrent,
  useAppSelector,
} from "system";
import { RoomStatus } from "types";

function usePressEffect(img: string) {
  const [effects, setEffects] = useState<ReactNode[]>([]);
  const [isPress, setPress] = useState(false);

  const onPointerDown = useCallback(() => {
    setPress(true);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isPress) return;

    const effect = (
      <img
        key={performance.now()}
        className="absolute top-0 animate-ping"
        src={img}
        alt="skill ping effect"
        ref={(ref) => {
          if (!ref) return;

          ref.addEventListener("animationend", () => {
            setEffects((effects) => effects.filter((it) => it !== effect));
          });
        }}
      />
    );

    setEffects((effects) => [...effects, effect]);
    setPress(false);
  }, [isPress, img]);

  return { onPointerDown, onPointerUp, effects };
}

type SkillProps = {
  normal: string;
  active?: string;
  name: string;
  value?: number;
  onClick?: () => void;
  className?: string;
};
export default function Skill({
  normal,
  active,
  name,
  value = 0,
  onClick,
  className,
}: SkillProps) {
  const { onPointerDown, onPointerUp, effects } = usePressEffect(
    active || normal
  );

  const hasSubmitted = useAppSelector(selectRoomHasSubmitted);
  const status = useAppSelector(selectRoomStatusCurrent);
  const result = useAppSelector(selectRoomResult);

  const state = (() => {
    if (!onClick) return "normal";

    if (hasSubmitted) {
      if (
        value > 0 &&
        status === RoomStatus.Result &&
        result?.result === "lose"
      ) {
        return "failed";
      }

      return value > 0 ? "active" : "hidden";
    }

    if (status === RoomStatus.Start) {
      return value > 0 ? "active" : "normal";
    }

    return "hidden";
  })();

  return (
    <button
      className={clsx(
        "relative transition-opacity duration-500",
        state === "hidden" && "opacity-0",
        onClick && state !== "hidden"
          ? "pointer-events-auto"
          : "pointer-events-none",
        className
      )}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="relative flex justify-center items-center">
        <img
          className={clsx(state === "failed" && "")}
          src={normal}
          alt="skill"
        />

        {active && (
          <img
            src={active}
            alt="skill effect"
            className={clsx(
              "absolute",
              state === "normal" && "hidden",
              state === "active" && "animate-pulse",
              state === "failed" && "filter grayscale"
            )}
          />
        )}

        {effects}

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span
            className={clsx(
              "text-stroke",
              state === "failed" ? "text-red-500" : "text-white"
            )}
          >
            {state === "failed" ? "MISS" : name}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "absolute -bottom-1 px-1 flex justify-center",
          state === "failed" && "filter grayscale"
        )}
      >
        <div className="relative flex justify-center items-center">
          <img src={Assets.Room.Skill_Frame} alt="frame" />

          <span className="absolute text-fansy">{value}</span>
        </div>
      </div>
    </button>
  );
}
