import Assets from "assets";
import clsx from "clsx";
import { cond, includes } from "ramda";
import { ReactNode, CSSProperties, useCallback, useState } from "react";
import { Continue } from "scenes/Room/Continue";
import { SkillOption, Round } from "types";
import { Modal } from "./lobby/Modal";

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

type CountProps = {
  type?: SkillOption;
  value: number;
};
function Count({ type, value }: CountProps) {
  // @todo
  return (
    <div className="flex-1 flex p-1.5 space-x-4">
      {/* <img src={} alt="background" /> */}

      <div className="flex items-center text-2xl">{value}</div>
    </div>
  );
}

function RoadLarge() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative mx-4">
        <img src={Assets.Room.Road_Frame_Big} alt="background" />

        <div className="absolute top-0 w-full h-full flex flex-col p-4">
          <div className="h-12 flex">
            <Count value={2} />
            <Count value={2} />
            <Count value={2} />
            <Count value={2} />
            <Count value={2} />
          </div>

          <div className="flex-1">{/* @todo */}</div>
        </div>
      </div>

      <Continue className="font-kai" text="點擊繼續" />
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
          <RoadLarge />
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
