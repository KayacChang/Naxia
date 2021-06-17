import Assets from "assets";
import clsx from "clsx";
import { cond, includes, pipe } from "ramda";
import { ReactNode, CSSProperties, useState, useEffect } from "react";
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

type RingProps = {
  color: "red" | "blue";
  tie?: number;
  bankerPair?: boolean;
  playerPair?: boolean;
};
function Ring({ color, tie, bankerPair, playerPair }: RingProps) {
  const ringColor =
    color === "red" ? Assets.Room.Road_Ring_Red : Assets.Room.Road_Ring_Blue;

  return (
    <div className="relative flex justify-center items-center">
      {bankerPair && (
        <Circle
          className={clsx(
            "absolute top-0 left-0 from-red-500",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(-0.05rem, -0.05rem) scale(50%)`,
          }}
        />
      )}

      <img
        style={{ padding: `1px` }}
        src={ringColor}
        alt={`road ${color} ring`}
      />

      {playerPair && (
        <Circle
          className={clsx(
            "absolute bottom-0 right-0 from-blue-500",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(0.05rem, 0.05rem) scale(50%)`,
          }}
        />
      )}

      {tie && (
        <span className="absolute text-xxs transform scale-50">{tie}</span>
      )}
    </div>
  );
}

type SlashProps = { className?: string };
function Slash({ className }: SlashProps) {
  return (
    <div
      className={clsx("rounded w-1/3 h-full transform rotate-45", className)}
      style={{
        background: `radial-gradient(circle at 0% 40%, rgba(255, 255, 255, 0.6) 15%, var(--tw-gradient-from) 30% 60%, #000 100%)`,
      }}
    />
  );
}

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
        "rounded-full relative  flex justify-center items-center",
        "h-4 w-4 lg:w-3/4 lg:h-3/4 xl:w-5/6 xl:h-5/6",
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
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(-0.05rem, -0.05rem)`,
          }}
        />
      )}

      <span className={clsx("text-xs lg:text-base xl:text-lg")}>
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
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(0.05rem, 0.05rem)`,
          }}
        />
      )}
    </Circle>
  );
}

function algorithmA(rounds: Round[]) {
  const table: SkillOption[][][] = [[]];
  let currentWin: "banker" | "player" | undefined = undefined;

  rounds.forEach((round) => {
    const isBankerWin = round.results.includes("banker");
    const isPlayerWin = round.results.includes("player");
    const isTie = round.results.includes("tie");
    const isBankPair = round.results.includes("bank_pair");
    const isPlayerPair = round.results.includes("player_pair");

    if (!currentWin && isBankerWin) {
      currentWin = "banker";
    }

    if (!currentWin && isPlayerWin) {
      currentWin = "player";
    }

    // switch
    if (
      (isBankerWin && currentWin === "player") ||
      (isPlayerWin && currentWin === "banker")
    ) {
      if (isBankerWin) currentWin = "banker";
      if (isPlayerWin) currentWin = "player";

      table.push([]);
    }

    let results: SkillOption[] = [];

    if (isBankerWin) {
      results.push("banker");
    }

    if (isPlayerWin) {
      results.push("player");
    }

    if (isTie) {
      results.push("tie");
    }

    if (isBankPair) {
      results.push("bank_pair");
    }

    if (isPlayerPair) {
      results.push("player_pair");
    }

    table[table.length - 1].push(results);
  });

  return table;
}

interface Result {
  type: "banker" | "player";
  pair: ("bank_pair" | "player_pair")[];
  tie: number;
}
function algorithmB(table: SkillOption[][][]) {
  const results: Result[][] = [];

  table.forEach((row) => {
    const resultRow: Result[] = [];

    let tie = 0;

    row.forEach((col, index) => {
      if (col.includes("tie")) {
        tie += 1;

        if (row.length - 1 === index) {
          resultRow[resultRow.length - 1].tie = tie;
        }

        return;
      }

      if (resultRow[resultRow.length - 1]) {
        resultRow[resultRow.length - 1].tie = tie;
      }

      tie = 0;
      resultRow.push({
        type: col.includes("player") ? "player" : "banker",
        pair: col.filter((res) =>
          ["bank_pair", "player_pair"].includes(res)
        ) as ("bank_pair" | "player_pair")[],
        tie,
      });
    });

    results.push(resultRow);
  });

  return results;
}

function Table<T>(row: number, col: number, fill?: T) {
  return Array.from(Array(row), (_) => Array(col).fill(fill));
}

function algorithmC(results: Result[][]): (Result | undefined)[][] {
  const col = 6;
  const row = 34;

  const table = Table(row, col);

  results.slice(0, row).forEach((row, _rowIndex) => {
    let rowIndex = _rowIndex;
    let colIndex = 0;

    row.forEach((result) => {
      table[rowIndex][colIndex] = result;

      if (colIndex > col || Boolean(table[rowIndex][colIndex + 1])) {
        rowIndex += 1;
      } else {
        colIndex += 1;
      }
    });
  });

  return table;
}

type BigRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
function BigRoad({ rounds }: BigRoadProps) {
  const col = 34;

  const table = pipe(algorithmA, algorithmB, algorithmC)(rounds);

  return (
    <div
      className={clsx(
        "grid grid-flow-col grid-rows-6 place-items-center",
        "text-white",
        "w-full h-full"
      )}
      style={{
        gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
      }}
    >
      {table
        .flat()
        .map((col, index) =>
          col ? (
            <Ring
              key={index}
              color={col.type === "player" ? "blue" : "red"}
              tie={col.tie > 0 ? col.tie : undefined}
              bankerPair={col.pair.includes("bank_pair")}
              playerPair={col.pair.includes("player_pair")}
            />
          ) : (
            <div key={index} />
          )
        )}
    </div>
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
  const count = (result: SkillOption) =>
    rounds?.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
      .length;

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
            count={count("banker")}
          />

          <CountCube
            cubeClassName="cube-blue px-2 xl:p-4"
            color="text-blue-600"
            role="閒"
            count={count("player")}
          />

          <CountCube
            cubeClassName="cube-green px-2 xl:p-4"
            color="text-green-500"
            role="和"
            count={count("tie")}
          />

          <CountCube
            cubeClassName="cube-light-red px-2 xl:p-4"
            color="text-red-400"
            role="莊對"
            count={count("bank_pair")}
          />

          <CountCube
            cubeClassName="cube-light-blue px-2 xl:p-4"
            color="text-blue-300"
            role="閒對"
            count={count("player_pair")}
          />
        </div>

        <div className="w-full flex-1 flex font-kai">
          <MarkerRoad
            rounds={rounds}
            className={clsx("mt-0.5 ml-0.5", "lg:-mb-1.5 lg:mt-1", "w-35%")}
          />

          <div className="flex-1 mt-px ml-px -mr-px">
            <div className="w-full h-1/2 flex flex-wrap content-start pl-px">
              <BigRoad rounds={rounds} />
            </div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <BigEyeRoad rounds={rounds} />
            </div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <div className="w-1/2 h-full flex flex-wrap">
                <SmallRoad rounds={rounds} />
              </div>

              <div className="w-1/2 h-full pl-px flex flex-wrap">
                <CockroachRoad rounds={rounds} />
              </div>
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

  const countByResult = (result: SkillOption) =>
    rounds?.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
      .length;

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
              "p-0.5 lg:px-2 xl:px-4 lg:-ml-1.5 -mb-1 lg:-mb-2"
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

function bigEyeAlgorithm(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 1; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 1][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 34;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

type BigEyeRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
function BigEyeRoad({ rounds }: BigEyeRoadProps) {
  const table = pipe(
    algorithmA,
    algorithmB,
    algorithmC,
    bigEyeAlgorithm
  )(rounds);

  const col = 34;

  return (
    <div
      className={clsx(
        "grid grid-flow-col grid-rows-3 place-items-center",
        "text-white",
        "w-full h-full"
      )}
      style={{
        gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
      }}
    >
      {table.flat().map((col, index) =>
        col ? (
          <div key={index} className="w-full h-full" style={{ padding: `15%` }}>
            <Circle
              className={clsx(
                col === "red" ? "from-red-500" : "from-blue-500",
                "w-full h-full"
              )}
              style={{
                transform: `translate(-0.05rem, -0.05rem)`,
              }}
            />
          </div>
        ) : (
          <div key={index} />
        )
      )}
    </div>
  );
}

function smallRoadAlgorithm(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 2; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 2][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 17;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

type SmallRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
function SmallRoad({ rounds }: SmallRoadProps) {
  const table = pipe(
    algorithmA,
    algorithmB,
    algorithmC,
    smallRoadAlgorithm
  )(rounds);

  const col = 17;

  return (
    <div
      className={clsx(
        "grid grid-flow-col grid-rows-3 place-items-center",
        "text-white",
        "w-full h-full"
      )}
      style={{
        gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
      }}
    >
      {table.flat().map((col, index) =>
        col ? (
          <div key={index} className="w-full h-full" style={{ padding: `15%` }}>
            <Circle
              className={clsx(
                col === "red" ? "from-red-500" : "from-blue-500",
                "w-full h-full"
              )}
              style={{
                transform: `translate(-0.05rem, -0.05rem)`,
              }}
            />
          </div>
        ) : (
          <div key={index} />
        )
      )}
    </div>
  );
}

function cockroachRoadAlgorithm(table: (Result | undefined)[][]) {
  const results: ("red" | "blue" | undefined)[][] = [];
  let current: "red" | "blue" | undefined = undefined;

  for (let rowIndex = 3; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];

    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      if (!table[rowIndex][colIndex]) {
        if (current !== "blue") {
          current = "blue";

          results.push(["blue"]);

          break;
        }

        results[results.length - 1].push("blue");

        break;
      }

      const existed = Boolean(table[rowIndex - 3][colIndex]);
      if (existed) {
        if (current !== "red") {
          current = "red";

          results.push(["red"]);

          continue;
        }

        results[results.length - 1].push("red");
      }
    }
  }

  function toTable(results: ("red" | "blue" | undefined)[][]) {
    const col = 3;
    const row = 17;

    const table = Table(row, col);

    results.slice(0, row).forEach((_row, _rowIndex) => {
      let rowIndex = _rowIndex;
      let colIndex = 0;

      _row.forEach((result) => {
        if (rowIndex >= row) {
          return;
        }

        table[rowIndex][colIndex] = result;

        if (colIndex < col - 1 && !table[rowIndex][colIndex + 1]) {
          colIndex += 1;
        } else {
          rowIndex += 1;
        }
      });
    });

    return table;
  }

  return toTable(results);
}

type CockroachRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
function CockroachRoad({ rounds }: CockroachRoadProps) {
  const table = pipe(
    algorithmA,
    algorithmB,
    algorithmC,
    cockroachRoadAlgorithm
  )(rounds);

  const col = 17;

  return (
    <div
      className={clsx(
        "grid grid-flow-col grid-rows-3 place-items-center",
        "text-white",
        "w-full h-full"
      )}
      style={{
        gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
      }}
    >
      {table
        .flat()
        .map((col, index) =>
          col ? (
            <Slash
              key={index}
              className={clsx(col === "red" ? "from-red-500" : "from-blue-500")}
            />
          ) : (
            <div key={index} />
          )
        )}
    </div>
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
          "px-3 lg:px-5 xl:px-8",
          "pt-2 lg:pt-5 xl:pt-6",
          "pb-2 lg:pb-3"
        )}
      >
        <MarkerRoad
          className="mt-0.5"
          rounds={rounds}
          style={{ width: `${35}%` }}
        />

        <div className="flex-1 mt-px ml-px -mr-px">
          <div className="w-full h-1/2 flex flex-wrap content-start pl-px">
            <BigRoad rounds={rounds} />
          </div>

          <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
            <BigEyeRoad rounds={rounds} />
          </div>

          <div className="w-full h-1/4 flex flex-wrap content-start pt-px px-px">
            <div className="w-1/2 h-full flex flex-wrap">
              <SmallRoad rounds={rounds} />
            </div>

            <div className="w-1/2 h-full pl-px flex flex-wrap">
              <CockroachRoad rounds={rounds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
