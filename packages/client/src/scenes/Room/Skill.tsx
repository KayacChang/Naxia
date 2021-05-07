import clsx from "clsx";
import Assets from "assets";
import { ReactNode, useCallback, useState } from "react";

const size_mapping = {
  md: {
    width: "w-14",
  },
  sm: {
    width: "w-12",
  },
};

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
        alt="skill active image"
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
  size?: keyof typeof size_mapping;
  onClick?: () => void;
  enable?: boolean;
};
export default function Skill({
  normal,
  active,
  name,
  value = 0,
  size = "md",
  enable = true,
  onClick,
}: SkillProps) {
  const { onPointerDown, onPointerUp, effects } = usePressEffect(
    active || normal
  );

  return (
    <button
      className={clsx(
        "relative transition-opacity duration-500",
        size_mapping[size].width,
        enable || "opacity-0",
        onClick && enable ? "pointer-events-auto" : "pointer-events-none"
      )}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="relative flex justify-center items-center">
        <img src={normal} alt="skill image" />

        {Boolean(onClick && value > 0) && (
          <img
            src={active}
            alt="skill image"
            className="absolute animate-pulse"
          />
        )}

        {effects}

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span className="text-white text-xs text-stroke">{name}</span>
        </div>
      </div>

      <div className="absolute -bottom-1 px-1 flex justify-center">
        <img src={Assets.Room.Skill_Frame} alt="frame image" />

        <span className="text-xxs absolute top-0 text-fansy">{value}</span>
      </div>
    </button>
  );
}
