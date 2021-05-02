import clsx from "clsx";
import Assets from "assets";

const size_mapping = {
  md: {
    width: "w-14",
  },
  sm: {
    width: "w-12",
  },
};

const frame = {
  md: Assets.Room.Skill_Frame_L,
  sm: Assets.Room.Skill_Frame_S,
};

type SkillProps = {
  img: string;
  name: string;
  value?: number;
  size?: keyof typeof size_mapping;
  enable?: boolean;
  onClick?: () => void;
};
export default function Skill({
  img,
  name,
  value = 0,
  size = "md",
  enable = true,
  onClick,
}: SkillProps) {
  return (
    <button
      className={clsx(
        "relative",
        size_mapping[size].width,
        enable || "opacity-50",
        onClick && enable ? "pointer-events-auto" : "pointer-events-none"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img src={img} alt="skill image" />

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span className="text-white text-xs text-shadow">{name}</span>
        </div>
      </div>

      <div className="absolute -bottom-1 px-1 flex justify-center">
        <img src={frame[size]} alt="frame image" />

        <span className="text-white text-xxs absolute top-0">{value}</span>
      </div>
    </button>
  );
}
