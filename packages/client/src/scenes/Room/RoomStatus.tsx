import clsx from "clsx";
import Assets from "./assets";
import Skill from "./Skill";

type RoomStatusProps = {
  className: string;
};
export default function RoomStatus({ className }: RoomStatusProps) {
  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Status} alt="bet information" />

      <div className="absolute top-0 h-full w-full px-4">
        <div className="w-full h-full text-white">
          <h3 className="text-xxs py-1 px-2">線上人數: 2000</h3>

          <div>
            <div className="flex justify-center space-x-4">
              <Skill type="blizzard" size="sm" />
              <Skill type="hurricane" size="sm" />
              <Skill type="flareblitz" size="sm" />
            </div>

            <div className="flex justify-center space-x-4">
              <Skill type="flamethrower" size="sm" />
              <Skill type="icebeam" size="sm" />
            </div>
          </div>

          <h5 className="text-xs pt-2 flex justify-center">
            <span>累計金額:</span>
            <span>39600</span>
          </h5>
        </div>
      </div>
    </div>
  );
}
