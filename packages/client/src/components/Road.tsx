import Assets from "assets";
import clsx from "clsx";
import { cond, includes } from "ramda";
import {
  ReactNode,
  CSSProperties,
  useCallback,
  useState,
  useEffect,
} from "react";
import { SkillOption, Round, RoomStatus } from "types";
import { Modal } from "./lobby/Modal";
import "./Road.css";
import { Continue } from "components";
import {
  Dungeon,
  selectRoomStatusCurrent,
  useAppSelector,
  useDungeon,
  useMap,
} from "system";
import { useDispatch } from "react-redux";

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

// type RingProps = {
//   color: "red" | "blue";
//   size: "lg" | "sm";
// };
// function Ring({ color, size }: RingProps) {
//   const sizePx = size === "lg" ? 11.6 : 5.75;
//   const ringColor =
//     color === "red" ? Assets.Room.Road_Ring_Red : Assets.Room.Road_Ring_Blue;
//   return (
//     <div>
//       <img
//         style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
//         src={ringColor}
//         alt={`road ${color} ${size} ring`}
//       />
//     </div>
//   );
// }

// type SlashProps = { className?: string };
// function Slash({ className }: SlashProps) {
//   return (
//     <div className="pl-px" style={{ width: `${5.7}px`, height: `${5.7}px` }}>
//       <div
//         className={clsx("rounded w-1/3 h-full transform rotate-45", className)}
//         style={{
//           background: `radial-gradient(circle at 0% 40%, rgba(255, 255, 255, 0.6) 15%, var(--tw-gradient-from) 30% 60%, #000 100%)`,
//         }}
//       ></div>
//     </div>
//   );
// }

type RecordProps = {
  results: SkillOption[];
};
function Record({ results }: RecordProps) {
  return (
    <Circle
      className={clsx(
        "rounded-full relative  flex justify-center items-center",
        "h-4 w-4 lg:w-5/6 lg:h-5/6",
        cond<SkillOption[], string>([
          [includes("banker"), () => "from-red-500"],
          [includes("player"), () => "from-blue-500"],
          [includes("tie"), () => "from-green-500"],
        ])(results)
      )}
    >
      {results.includes("bank_pair") && (
        <Circle
          className={clsx(
            "absolute top-0 left-0 from-red-500",
            "w-1.5 h-1.5 lg:w-3 lg:h-3"
          )}
          style={{
            transform: `translate(-0.05rem, -0.05rem)`,
          }}
        />
      )}

      <span className={clsx("transform scale-40 lg:scale-100 text-lg")}>
        {cond<SkillOption[], string>([
          [includes("banker"), () => "莊"],
          [includes("player"), () => "閒"],
          [includes("tie"), () => "和"],
        ])(results)}
      </span>

      {results.includes("player_pair") && (
        <Circle
          className={clsx(
            "absolute bottom-0 right-0 from-blue-500",
            "w-1.5 h-1.5 lg:w-3 lg:h-3"
          )}
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
        "text-white",
        className
      )}
      style={style}
    >
      {rounds.slice(0, 9 * 6).map(({ id, results }) => (
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
    <div className="flex items-center">
      <div className={clsx("font-kai", cubeClassName)}>{role}</div>
      <p className={clsx("px-4", color)}>{count}</p>
    </div>
  );
}

type RoadLargeProps = {
  rounds: Round[];
};
function RoadLarge({ rounds }: RoadLargeProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center",
        "w-full lg:w-3/4"
      )}
    >
      <img
        className="p-2 pr-1"
        src={Assets.Room.Road_Frame_Big}
        alt="room frame big"
      />

      <div className="absolute w-full h-full p-1/24 xl:p-12 flex flex-col">
        <div
          className={clsx(
            "w-full flex items-center justify-between px-1/24",
            "h-1/4",
            "text-base lg:text-2xl xl:text-5xl"
          )}
        >
          <CountCube
            cubeClassName="cube-red px-2 xl:p-4"
            color="text-red-600"
            role="莊"
            count={2}
          />

          <CountCube
            cubeClassName="cube-blue px-2 xl:p-4"
            color="text-blue-600"
            role="閒"
            count={2}
          />

          <CountCube
            cubeClassName="cube-green px-2 xl:p-4"
            color="text-green-500"
            role="和"
            count={2}
          />

          <CountCube
            cubeClassName="cube-light-red px-2 xl:p-4"
            color="text-red-400"
            role="莊對"
            count={2}
          />

          <CountCube
            cubeClassName="cube-light-blue px-2 xl:p-4"
            color="text-blue-300"
            role="閒對"
            count={2}
          />
        </div>

        <div className="w-full flex-1 flex font-kai">
          <MarkerRoad
            rounds={rounds}
            className={clsx("mt-0.5 ml-0.5", "lg:-mb-1.5 lg:mt-1", "w-35%")}
          />

          <div className="flex-1 mt-px ml-px -mr-px">
            <div className="w-full h-1/2 flex flex-wrap content-start pl-px"></div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px"></div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <div className="w-1/2 h-full flex flex-wrap"></div>

              <div className="w-1/2 h-full pl-px flex flex-wrap"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 transform translate-y-full">
        <Continue text="點擊繼續" />
      </div>
    </div>
  );
}

type RoomRoadProps = {
  className?: string;
};
export function RoomRoad({ className }: RoomRoadProps) {
  const [open, setOpen] = useState(false);

  const map = useMap();
  const { rounds, info } = useDungeon();

  const countByResult = useCallback(
    (result: SkillOption) =>
      rounds
        ?.slice(-1 * 9 * 6)
        .filter(({ results }) => results.includes(result)).length,
    [rounds]
  );

  const dispatch = useDispatch();
  const status = useAppSelector(selectRoomStatusCurrent);

  useEffect(() => {
    if (!map || !info) return;

    status === RoomStatus.Result &&
      dispatch(Dungeon.get.rounds({ mapID: map.id, dungeonID: info.id }));
  }, [status, map, info, dispatch]);

  const skillOptions: SkillOption[] = [
    "banker",
    "player",
    "tie",
    "player_pair",
    "bank_pair",
  ];

  if (!rounds) return <></>;

  return (
    <>
      <button
        className={clsx("relative", className)}
        onClick={() => setOpen(true)}
      >
        <img src={Assets.Room.Road_Frame_Small} alt="background" />

        <div
          className={clsx(
            "absolute top-0 w-full h-full flex font-kai",
            "py-1 px-1.5",
            "lg:py-2 lg:px-3",
            "xl:py-4 xl:px-5"
          )}
        >
          <div className={clsx("flex flex-col", "w-8", "lg:text-2xl lg:w-1/8")}>
            <div className="flex-1 flex justify-center items-center">莊</div>
            <div className="flex-1 flex justify-center items-center">閒</div>
          </div>

          <MarkerRoad
            rounds={rounds}
            className={clsx(
              "flex-1 mt-0.5 ml-0.5",
              "lg:-mb-1.5 lg:ml-1 lg:mt-1"
            )}
          />

          <div
            className={clsx(
              "flex flex-col text-xs",
              "w-12 lg:w-1/5",
              "text-xs lg:text-lg xl:text-2xl",
              "p-0.5 lg:px-4 lg:-ml-1.5 -mb-1 lg:-mb-2"
            )}
          >
            {skillOptions.map((type) => (
              <div
                key={type}
                className={clsx(
                  "flex-1 flex justify-between items-center",
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
    <div className="relative font-kai">
      <img src={Assets.Common.Road_Frame} alt="road background" />

      <div
        className={clsx(
          "absolute top-0 w-full h-full flex",
          "pl-3 lg:pl-6 xl:pl-8",
          "pt-3 lg:pt-5 xl:pt-6",
          "pb-2 lg:pb-4"
        )}
      >
        <MarkerRoad rounds={rounds} style={{ width: `${34}%` }} />
      </div>
    </div>
  );
}
