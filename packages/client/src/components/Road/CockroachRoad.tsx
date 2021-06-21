import clsx from "clsx";
import Assets from "assets";
import { CSSProperties } from "react";
import { Round } from "types";
import { CockroachRoad as Algorithm, Icon, RoundToResult } from "./Algorithm";
import { Slash } from "./Slash";

type CockroachRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function CockroachRoad({ rounds }: CockroachRoadProps) {
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
            <Slash
              key={index}
              // className={clsx(
              //   col === Icon.Red ? "from-red-500" : "from-blue-500"
              // )}
              style={{
                backgroundImage: `url('${col === Icon.Red ? Assets.Room.Icon_Fire_Strip : Assets.Room.Icon_Ice_Strip}')`,
              }}
            />
          ) : (
            <div key={index} />
          )
        )}
    </div>
  );
}
