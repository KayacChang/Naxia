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
  enable?: boolean;
  onClick?: () => void;
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
        "relative",
        size_mapping[size].width,
        enable || "opacity-50",
        onClick && enable ? "pointer-events-auto" : "pointer-events-none"
      )}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="relative">
        <img src={normal} alt="skill normal image" />

        {effects}

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span className="text-white text-xs text-shadow">{name}</span>
        </div>
      </div>

      <div className="absolute -bottom-1 px-1 flex justify-center">
        <img src={Assets.Room.Skill_Frame} alt="frame image" />

        <span className="text-white text-xxs absolute top-0">{value}</span>
      </div>
    </button>
  );
}
