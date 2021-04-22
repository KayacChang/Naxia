import clsx from "clsx";

import Assets from "./assets";

const skill_mapping = {
  blizzard: {
    md: Assets.Skill_Blizzard_L,
    sm: Assets.Skill_Blizzard_S,
    name: "寒雪擊",
  },
  flamethrower: {
    md: Assets.Skill_Flame_Thrower_L,
    sm: Assets.Skill_Flame_Thrower_S,
    name: "雙炎斬",
  },
  flareblitz: {
    md: Assets.Skill_Flare_Blitz_L,
    sm: Assets.Skill_Flare_Blitz_S,
    name: "炙炎擊",
  },
  hurricane: {
    md: Assets.Skill_Hurricane_L,
    sm: Assets.Skill_Hurricane_S,
    name: "微風破",
  },
  icebeam: {
    md: Assets.Skill_Ice_Beam_L,
    sm: Assets.Skill_Ice_Beam_S,
    name: "雙寒斬",
  },
};

const size_mapping = {
  md: {
    width: "w-14",
  },
  sm: {
    width: "w-12",
  },
};

const frame = {
  md: Assets.Skill_Frame_L,
  sm: Assets.Skill_Frame_S,
};

type SkillProps = {
  type: keyof typeof skill_mapping;
  value?: string;
  size?: keyof typeof size_mapping;
};
export default function Skill({
  type,
  value = "21000",
  size = "md",
}: SkillProps) {
  return (
    <button className={clsx("relative", size_mapping[size].width)}>
      <div className="relative">
        <img src={skill_mapping[type][size]} alt="skill image" />

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span className="text-white text-xs text-shadow">
            {skill_mapping[type].name}
          </span>
        </div>
      </div>

      <div className="absolute -bottom-1 px-1 flex justify-center">
        <img src={frame[size]} alt="frame image" />

        <span className="text-white text-xxs absolute top-0">{value}</span>
      </div>
    </button>
  );
}
