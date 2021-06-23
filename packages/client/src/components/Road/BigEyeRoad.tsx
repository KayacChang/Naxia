import clsx from "clsx";
import Assets from "assets";
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
  const tableData = table.reduce((acc, val) => acc.concat(val), []);

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
      {/* table.flat() */}
      {tableData.map((col, index) =>
        col ? (
          <div key={index} className="w-full h-full" style={{ padding: `10%` }}>
            <Circle
              className={clsx(
                // col === Icon.Red ? "from-red-500" : "from-blue-500",
                "w-full h-full playerIcon"
              )}
              style={{
                transform: `translate(-0.05rem, -0.05rem)`,
                backgroundImage: `url('${col === Icon.Red ? Assets.Room.Icon_Fire_Circle_02 : Assets.Room.Icon_Ice_Circle_02}')`,
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
