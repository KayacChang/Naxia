import clsx from "clsx";
import { CSSProperties } from "react";
import { Round } from "types";
import { BigEyeRoad as Algorithm, Icon, RoundToResult } from "./Algorithm";
import { Circle } from "./Circle";

type BigEyeRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function BigEyeRoad({ rounds }: BigEyeRoadProps) {
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
        gridTemplateColumns: `repeat(${col * 2}, minmax(0, 1fr))`,
      }}
    >
      {table.flat().map((col, index) =>
        col ? (
          <div key={index} className="w-full h-full" style={{ padding: `15%` }}>
            <Circle
              className={clsx(
                col === Icon.Red ? "from-red-500" : "from-blue-500",
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
