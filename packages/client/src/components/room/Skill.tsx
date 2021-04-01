import SKILL_BLIZZARD_LG from "assets/room/skill/blizzard-lg.png";
import SKILL_FLAME_THROWER_LG from "assets/room/skill/flamethrower-lg.png";
import SKILL_FLARE_BLITZ_LG from "assets/room/skill/flareblitz-lg.png";
import SKILL_HURRICANE_LG from "assets/room/skill/hurricane-lg.png";
import SKILL_ICE_BEAM_LG from "assets/room/skill/icebeam-lg.png";

import SKILL_FRAME_LG from "assets/room/skill/frame-lg.png";
import clsx from "clsx";

const skill_mapping = {
  blizzard: {
    image: SKILL_BLIZZARD_LG,
    name: "寒雪擊",
  },
  flamethrower: {
    image: SKILL_FLAME_THROWER_LG,
    name: "雙炎斬",
  },
  flareblitz: {
    image: SKILL_FLARE_BLITZ_LG,
    name: "炙炎擊",
  },
  hurricane: {
    image: SKILL_HURRICANE_LG,
    name: "微風破",
  },
  icebeam: {
    image: SKILL_ICE_BEAM_LG,
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

type SkillProps = {
  type: keyof typeof skill_mapping;
  value?: string;
  size?: keyof typeof size_mapping;
};
export function Skill({ type, value = "21000", size = "md" }: SkillProps) {
  return (
    <div className={clsx("relative", size_mapping[size].width)}>
      <div className="relative">
        <img src={skill_mapping[type].image} alt="skill image" />

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <span className="text-white text-xs text-shadow">
            {skill_mapping[type].name}
          </span>
        </div>
      </div>

      <div className="absolute -bottom-1 px-1 flex justify-center">
        <img src={SKILL_FRAME_LG} alt="frame image" />

        <span className="text-white text-xxs absolute top-0">{value}</span>
      </div>
    </div>
  );
}
