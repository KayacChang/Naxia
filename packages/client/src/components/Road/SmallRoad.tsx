import clsx from "clsx";
import { CSSProperties } from "react";
import { SmallRoadAlgorithm } from "./Algorithm";
import { Round } from "types";
import { Circle } from "./Circle";

type SmallRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function SmallRoad({ rounds }: SmallRoadProps) {
  const table = SmallRoadAlgorithm(rounds);

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
