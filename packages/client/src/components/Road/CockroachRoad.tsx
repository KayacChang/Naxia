import clsx from "clsx";
import { CSSProperties } from "react";
import { Round } from "types";
import { CockroachRoadAlgorithm } from "./Algorithm";
import { Slash } from "./Slash";

type CockroachRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function CockroachRoad({ rounds }: CockroachRoadProps) {
  const table = CockroachRoadAlgorithm(rounds);
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
