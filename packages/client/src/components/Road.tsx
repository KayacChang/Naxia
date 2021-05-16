import Assets from "assets";
import clsx from "clsx";
import { cond, includes } from "ramda";
import { ReactNode, CSSProperties, useCallback, useState } from "react";
import { SkillOption, Round } from "types";
import { Modal } from "./lobby/Modal";
import "./Road.css";

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

type RingProps = {
  color: "red" | "blue";
  size: "lg" | "sm";
};
function Ring({ color, size }: RingProps) {
  const sizePx = size === "lg" ? 11.6 : 5.75;
  const ringColor =
    color === "red" ? Assets.Room.Road_Ring_Red : Assets.Room.Road_Ring_Blue;
  return (
    <div>
      <img
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
        src={ringColor}
        alt={`road ${color} ${size} ring`}
      />
    </div>
  );
}

type SlashProps = { className?: string };

function Slash({ className }: SlashProps) {
  return (
    <div className="pl-px" style={{ width: `${5.7}px`, height: `${5.7}px` }}>
      <div
        className={clsx("rounded w-1/3 h-full transform rotate-45", className)}
        style={{
          background: `radial-gradient(circle at 0% 40%, rgba(255, 255, 255, 0.6) 15%, var(--tw-gradient-from) 30% 60%, #000 100%)`,
        }}
      ></div>
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

type CountCubePorps = {
  cubeClassName: string;
  color: string;
  role: string;
  count: number;
};
function CountCube({ cubeClassName, color, role, count }: CountCubePorps) {
  return (
    <div className="flex">
      <div className={clsx("font-kai", cubeClassName)}>{role}</div>
      <p className={clsx("text-2xl px-4", color)}>{count}</p>
    </div>
  );
}

function RoadLargeRecordItem({ results }: RecordProps) {
  return (
    <div
      style={{ width: "1.48rem", height: "1.48rem" }}
      className="flex justify-center items-center pl-1 pt-1"
    >
      <Record results={results} />
    </div>
  );
}

type RoadLargeProps = {
  rounds: Round[];
};
function RoadLarge({ rounds }: RoadLargeProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        className="p-2 pr-1"
        src={Assets.Room.Road_Frame_Big}
        alt="room frame big"
      />
      <div className="absolute w-full h-48 px-7">
        <div className="w-full h-12 flex items-center justify-between px-2">
          <CountCube
            cubeClassName="cube-red"
            color="text-red-600"
            role="莊"
            count={2}
          />

          <CountCube
            cubeClassName="cube-blue"
            color="text-blue-600"
            role="閒"
            count={2}
          />

          <CountCube
            cubeClassName="cube-green"
            color="text-green-500"
            role="和"
            count={2}
          />

          <CountCube
            cubeClassName="cube-light-red"
            color="text-red-400"
            role="莊對"
            count={2}
          />

          <CountCube
            cubeClassName="cube-light-blue"
            color="text-blue-300"
            role="閒對"
            count={2}
          />
        </div>
        <div className="w-full h-36 flex ">
          {/* 左側 */}
          <div className="w-54 h-full flex flex-wrap content-start">
            {rounds.slice(-1 * 9 * 6).map(({ id, results }) => (
              <RoadLargeRecordItem results={results} key={id} />
            ))}
          </div>

          {/* 右側 */}
          <div className="flex-1 mt-px ml-px -mr-px">
            {/* 右上格-大圈 */}
            <div className="w-full h-1/2 flex flex-wrap content-start pl-px">
              <Ring color="red" size="lg" />
              <Ring color="blue" size="lg" />
            </div>

            {/* 右中格-小圈 */}
            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <Ring color="blue" size="sm" />
              <Ring color="red" size="sm" />
            </div>

            {/* 右下格 */}
            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              {/* 左格-小圓 */}
              <div className="w-1/2 h-full flex flex-wrap">
                <Circle className="from-blue-500 w-1 h-1 m-px" />
                <Circle className="from-red-500 w-1 h-1 m-px" />
              </div>

              {/* 右格-小斜槓 */}
              <div className="w-1/2 h-full pl-px flex flex-wrap">
                <Slash className="from-blue-500" />
                <Slash className="from-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Continue text="點擊繼續" />
    </div>
  );
}

type ContinueProps = {
  text: string;
};
function Continue({ text }: ContinueProps) {
  return (
    <div className="absolute bottom-6">
      <div className="w-60 relative flex justify-center items-center">
        <img src={Assets.Room.Result_Continue} alt="continue background" />

        <span className="absolute text-white font-noto text-xl">{text}</span>
      </div>
    </div>
  );
}

type RoomRoadProps = {
  className?: string;
  rounds: Round[];
};
export function RoomRoad({ className, rounds }: RoomRoadProps) {
  const [open, setOpen] = useState(false);

  const countByResult = useCallback(
    (result: SkillOption) =>
      rounds.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
        .length,
    [rounds]
  );

  const skillOptions: SkillOption[] = [
    "banker",
    "player",
    "tie",
    "player_pair",
    "bank_pair",
  ];

  return (
    <>
      <button
        className={clsx("relative", className)}
        onClick={() => setOpen(true)}
      >
        <img src={Assets.Room.Road_Frame_Small} alt="background" />

        <div className="absolute w-full h-full top-0 flex py-1 px-1.5 font-kai">
          <div className="w-8 flex flex-col">
            <div className="flex-1 flex justify-center items-center">莊</div>
            <div className="flex-1 flex justify-center items-center">閒</div>
          </div>

          <MarkerRoad rounds={rounds} className="flex-1 gap-0.5 mt-0.5" />

          <div className="w-12 flex flex-col text-xs p-0.5">
            {skillOptions.map((type) => (
              <div
                key={type}
                className={clsx(
                  "flex-1 flex justify-between items-center ",
                  cond<SkillOption, string>([
                    [(type) => type === "banker", () => "text-red-500"],
                    [(type) => type === "player", () => "text-blue-500"],
                    [(type) => type === "tie", () => "text-green-400"],
                    [(type) => type === "player_pair", () => "text-blue-400"],
                    [(type) => type === "bank_pair", () => "text-red-400"],
                  ])(type)
                )}
              >
                <span>
                  {cond<SkillOption, string>([
                    [(type) => type === "banker", () => "莊"],
                    [(type) => type === "player", () => "閒"],
                    [(type) => type === "tie", () => "和"],
                    [(type) => type === "player_pair", () => "閒對"],
                    [(type) => type === "bank_pair", () => "莊對"],
                  ])(type)}
                </span>
                <span>{countByResult(type)}</span>
              </div>
            ))}
          </div>
        </div>
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <RoadLarge rounds={rounds} />
        </Modal>
      )}
    </>
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
