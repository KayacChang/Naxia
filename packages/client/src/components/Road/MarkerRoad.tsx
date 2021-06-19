import clsx from "clsx";
import { CSSProperties } from "react";
import { Round } from "types";
import { Record } from "./Record";

type MarkerRoadProps = {
  rounds: Round[];
  className?: string;
  style?: CSSProperties;
};
export function MarkerRoad({ className, rounds, style }: MarkerRoadProps) {
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
