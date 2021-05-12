import Assets from "assets";
import clsx from "clsx";
import { cond, includes } from "ramda";
import { CSSProperties, ReactNode } from "react";
import { SkillOption } from "types";

type CircleProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
function Circle({ className, style, children }: CircleProps) {
  return (
    <div
      className={clsx("rounded-full", className)}
      style={{
        background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), var(--tw-gradient-from) 30%, #000)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type RecordProps = {
  results: SkillOption[];
};
function Record({ results }: RecordProps) {
  return (
    <Circle
      className={clsx(
        "rounded-full m-1 relative w-4/5 h-4/5 flex justify-center items-center",
        cond<SkillOption[], string>([
          [includes("banker"), () => "from-red-500"],
          [includes("player"), () => "from-blue-500"],
          [includes("tie"), () => "from-green-500"],
        ])(results)
      )}
    >
      {results.includes("bank_pair") && (
        <Circle
          className="absolute top-0 left-0 from-red-500"
          style={{
            width: `0.32rem`,
            height: `0.32rem`,
            transform: `translate(-0.05rem, -0.05rem)`,
          }}
        />
      )}

      <span className="text-xxs">
        {cond<SkillOption[], string>([
          [includes("banker"), () => "莊"],
          [includes("player"), () => "閒"],
          [includes("tie"), () => "和"],
        ])(results)}
      </span>

      {results.includes("player_pair") && (
        <Circle
          className="absolute bottom-0 right-0 from-blue-500"
          style={{
            width: `0.32rem`,
            height: `0.32rem`,
            transform: `translate(0.05rem, 0.05rem)`,
          }}
        />
      )}
    </Circle>
  );
}

type RoadProps = {
  className?: string;
};
export function Road({ className }: RoadProps) {
  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Room.Road_Frame_Small} alt="background" />

      <div className="absolute w-full h-full top-0 flex py-1 px-1.5 font-kai">
        <div className="w-8 flex flex-col">
          <div className="flex-1 flex justify-center items-center">莊</div>
          <div className="flex-1 flex justify-center items-center">閒</div>
        </div>

        <div className="flex-1 grid grid-flow-col grid-cols-9 grid-rows-6 place-items-center mt-0.5">
          <Record results={["player"]} />
          <Record results={["banker"]} />
          <Record results={["tie"]} />
          <Record results={["player", "bank_pair", "player_pair"]} />
          <Record results={["banker", "bank_pair", "player_pair"]} />
          <Record results={["tie", "bank_pair", "player_pair"]} />
        </div>

        <div className="w-12 flex flex-col text-xs p-0.5">
          <div className="flex-1 flex justify-between items-center text-red-500">
            <span>莊</span>
            <span>2</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-blue-500">
            <span>閒</span>
            <span>2</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-green-400">
            <span>和</span>
            <span>2</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-blue-400">
            <span>閒對</span>
            <span>2</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-red-400">
            <span>莊對</span>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  );
}