import clsx from "clsx";
import Assets from "assets";
import { cond, includes } from "ramda";
import { SkillOption } from "types";
import { Circle } from "./Circle";

type RecordProps = {
  results: SkillOption[];
};
export function Record({ results }: RecordProps) {
  return (
    <Circle
      className={clsx(
        "relative flex justify-center items-center",
        "h-4 w-4 lg:w-3/4 lg:h-3/4 xl:w-5/6 xl:h-5/6",
      )}
      style={{
        backgroundImage: `url('${
          cond<SkillOption[], string>([
            [includes("banker"), () => Assets.Room.Icon_Fire],
            [includes("player"), () => Assets.Room.Icon_Ice],
            [includes("tie"), () => Assets.Room.Icon_Wind],
          ])(results)
        }')`
      }}
    >
      {results.includes("bank_pair") && (
        <Circle
          className={clsx(
            "absolute top-0 left-0",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(-0.05rem, -0.05rem)`,
            backgroundImage: `url('${Assets.Room.Icon_Dark}')`
          }}
        />
      )}

      {results.includes("player_pair") && (
        <Circle
          className={clsx(
            "absolute bottom-0 right-0",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(0.05rem, 0.05rem)`,
            backgroundImage: `url('${Assets.Room.Icon_Light}')`
          }}
        />
      )}
    </Circle>
  );
}
