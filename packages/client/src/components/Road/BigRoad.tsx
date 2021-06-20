import clsx from "clsx";
import { CSSProperties } from "react";
import { Round } from "types";
import { BigRoad as Algorithm, Icon, RoundToResult } from "./Algorithm";
import { Ring } from "./Ring";

type BigRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function BigRoad({ rounds }: BigRoadProps) {
  const col = 34;
  const table = Algorithm(col, rounds.map(RoundToResult));

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
              color={col.icons.includes(Icon.Blue) ? "blue" : "red"}
              tie={col.tie > 0 ? col.tie : undefined}
              bankerPair={col.icons.includes(Icon.RedSmall)}
              playerPair={col.icons.includes(Icon.BlueSmall)}
            />
          ) : (
            <div key={index} />
          )
        )}
    </div>
  );
}
