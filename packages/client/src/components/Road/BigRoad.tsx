import clsx from "clsx";
import { CSSProperties } from "react";
import { Round } from "types";
import { BigRoadAlgorithm } from "./Algorithm";
import { Ring } from "./Ring";

type BigRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function BigRoad({ rounds }: BigRoadProps) {
  const col = 34;
  const table = BigRoadAlgorithm(rounds);

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
