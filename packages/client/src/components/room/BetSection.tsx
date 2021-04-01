import { CircleLayout, Radian, Bet, Skill } from "components";

import BET_BG from "assets/room/bet/background.png";

export function BetSection() {
  return (
    <div className="relative w-full h-full">
      <div className="w-24 absolute bottom-0 right-0">
        <img src={BET_BG} alt={BET_BG} />
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={5.2}>
          <Radian radian={Math.PI * 1.06}>
            <Bet value={500} />
          </Radian>

          <Radian radian={Math.PI * 1.25}>
            <Bet value={500} active />
          </Radian>

          <Radian radian={Math.PI * 1.44}>
            <Bet value={500} />
          </Radian>
        </CircleLayout>
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={8.4}>
          <Radian radian={Math.PI * 1.15}>
            <Skill type="blizzard" />
          </Radian>

          <Radian radian={Math.PI * 1.33}>
            <Skill type="flamethrower" />
          </Radian>
        </CircleLayout>
      </div>

      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
        <CircleLayout radius={12}>
          <Radian radian={Math.PI * 1.35}>
            <Skill type="flareblitz" />
          </Radian>

          <Radian radian={Math.PI * 1.24}>
            <Skill type="hurricane" />
          </Radian>

          <Radian radian={Math.PI * 1.12}>
            <Skill type="icebeam" />
          </Radian>
        </CircleLayout>
      </div>
    </div>
  );
}
