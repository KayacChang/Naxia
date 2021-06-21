import Assets from "assets";
import clsx from "clsx";
import { SkillOption, Round } from "types";
import { Continue } from "components";
import { CountCube } from "./CountCube";
import { MarkerRoad } from "./MarkerRoad";
import { BigRoad } from "./BigRoad";
import { BigEyeRoad } from "./BigEyeRoad";
import { SmallRoad } from "./SmallRoad";
import { CockroachRoad } from "./CockroachRoad";

type RoadLargeProps = {
  rounds: Round[];
};
export function RoadLarge({ rounds }: RoadLargeProps) {
  const count = (result: SkillOption) =>
    rounds?.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
      .length;

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center",
        "w-full lg:w-3/4"
      )}
    >
      <img
        className="p-2 pr-1"
        src={Assets.Room.Road_Frame_Big}
        alt="room frame big"
      />

      <div className="absolute w-full h-full p-1/24 xl:p-12 flex flex-col">
        <div
          className={clsx(
            "w-full flex items-center justify-between px-1/24",
            "h-1/4",
            "text-base lg:text-2xl xl:text-4xl"
          )}
        >
          <CountCube
            cubeClassName="cube-red px-2 xl:p-4"
            color="text-red-600"
            role="莊"
            count={count("banker")}
          />

          <CountCube
            cubeClassName="cube-blue px-2 xl:p-4"
            color="text-blue-600"
            role="閒"
            count={count("player")}
          />

          <CountCube
            cubeClassName="cube-green px-2 xl:p-4"
            color="text-green-500"
            role="和"
            count={count("tie")}
          />

          <CountCube
            cubeClassName="cube-light-red px-2 xl:p-4"
            color="text-red-400"
            role="莊對"
            count={count("bank_pair")}
          />

          <CountCube
            cubeClassName="cube-light-blue px-2 xl:p-4"
            color="text-blue-300"
            role="閒對"
            count={count("player_pair")}
          />
        </div>

        <div className="w-full flex-1 flex font-kai">
          <MarkerRoad
            rounds={rounds}
            className={clsx("mt-0.5 ml-0.5", "lg:-mb-1.5 lg:mt-1", "w-35%")}
          />

          <div className="flex-1 mt-px ml-px -mr-px">
            <div className="w-full h-1/2 flex flex-wrap content-start pl-px">
              <BigRoad rounds={rounds} />
            </div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <BigEyeRoad rounds={rounds} />
            </div>

            <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
              <div className="w-1/2 h-full flex flex-wrap">
                <SmallRoad rounds={rounds} />
              </div>

              <div className="w-1/2 h-full pl-px flex flex-wrap">
                <CockroachRoad rounds={rounds} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 transform translate-y-full">
        <Continue text="點擊繼續" />
      </div>
    </div>
  );
}
