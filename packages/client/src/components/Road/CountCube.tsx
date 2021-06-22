import clsx from "clsx";
import Assets from "assets";
import {cond, equals, always} from 'ramda';
type CountCubePorps = {
  cubeClassName: string;
  color: string;
  role: string;
  count: number;
};
export function CountCube({
  cubeClassName,
  color,
  role,
  count,
}: CountCubePorps) {
  return (
    <div className="flex items-center"> 
      <img
        className="p-2 pr-1"
        src={cond<string, string>([
          [(role) => role === "莊", () => Assets.Room.Icon_Fire],
          [(role) => role === "閒", () => Assets.Room.Icon_Ice],
          [(role) => role === "和", () => Assets.Room.Icon_Wind],
          [(role) => role === "閒對", () => Assets.Room.Icon_Light],
          [(role) => role === "莊對", () => Assets.Room.Icon_Dark],
        ])(role)}
        alt="room frame big"
      />
      <p className={clsx("px-4", color)}>{count}</p>
    </div>
  );
}