import Assets from "assets";
import clsx from "clsx";
import { cond, includes } from "ramda";
import { ReactNode, CSSProperties } from "react";
import { SkillOption, Round } from "types";

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
        "rounded-full relative w-full h-full flex justify-center items-center",
        cond<SkillOption[], string>([
          [includes("banker"), () => "from-red-500"],
          [includes("player"), () => "from-blue-500"],
          [includes("tie"), () => "from-green-500"],
        ])(results)
      )}
    >
      {results.includes("bank_pair") && (
        <Circle
          className="absolute top-0 left-0 from-red-500 w-1.5 h-1.5"
          style={{
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
          className="absolute bottom-0 right-0 from-blue-500 w-1.5 h-1.5"
          style={{
            transform: `translate(0.05rem, 0.05rem)`,
          }}
        />
      )}
    </Circle>
  );
}

type MarkerRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
function MarkerRoad({ className, rounds, style }: MarkerRoadProps) {
  return (
    <div
      className={clsx(
        "grid grid-flow-col grid-cols-9 grid-rows-6 place-items-center",
        className
      )}
      style={style}
    >
      {rounds.slice(-1 * 9 * 6).map(({ id, results }) => (
        <Record key={id} results={results} />
      ))}
    </div>
  );
}

type RoomRoadMiniProps = {
  className?: string;
  rounds: Round[];
};
export function RoomRoadMini({ className, rounds }: RoomRoadMiniProps) {
  const countByResult = (result: SkillOption) =>
    rounds.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
      .length;

  return (
    <div className={clsx("relative", className)}>
      <img src={Assets.Room.Road_Frame_Small} alt="background" />

      <div className="absolute w-full h-full top-0 flex py-1 px-1.5 font-kai">
        <div className="w-8 flex flex-col">
          <div className="flex-1 flex justify-center items-center">莊</div>
          <div className="flex-1 flex justify-center items-center">閒</div>
        </div>

        <MarkerRoad rounds={rounds} className="flex-1 gap-0.5 mt-0.5" />

        <div className="w-12 flex flex-col text-xs p-0.5">
          <div className="flex-1 flex justify-between items-center text-red-500">
            <span>莊</span>
            <span>{countByResult("banker")}</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-blue-500">
            <span>閒</span>
            <span>{countByResult("player")}</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-green-400">
            <span>和</span>
            <span>{countByResult("tie")}</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-blue-400">
            <span>閒對</span>
            <span>{countByResult("player_pair")}</span>
          </div>
          <div className="flex-1 flex justify-between items-center text-red-400">
            <span>莊對</span>
            <span>{countByResult("bank_pair")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type LobbyRoadProps = {
  rounds: Round[];
};
export function LobbyRoad({ rounds }: LobbyRoadProps) {
  return (
    <div className="relative">
      <img src={Assets.Common.Road_Frame} alt="road background" />

      <div
        className="absolute top-0 w-full h-full flex"
        style={{
          paddingLeft: `${12}px`,
          paddingTop: `${10}px`,
          paddingBottom: `${6}px`,
        }}
      >
        <MarkerRoad rounds={rounds} style={{ width: `${34}%` }} />
      </div>
    </div>
  );
}
