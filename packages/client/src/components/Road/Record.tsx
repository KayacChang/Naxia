import clsx from "clsx";
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
