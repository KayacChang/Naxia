import Assets from "assets";
import clsx from "clsx";
import { Round } from "types";
import { MarkerRoad } from "./MarkerRoad";
import { BigRoad } from "./BigRoad";
import { BigEyeRoad } from "./BigEyeRoad";
import { SmallRoad } from "./SmallRoad";
import { CockroachRoad } from "./CockroachRoad";

type LobbyRoadProps = {
  rounds: Round[];
};
export function LobbyRoad({ rounds }: LobbyRoadProps) {
  return (
    <div className="relative font-kai">
      <img src={Assets.Common.Road_Frame} alt="road background" />

      <div
        className={clsx(
          "absolute top-0 w-full h-full flex",
          "px-3 lg:px-5 xl:px-8",
          "pt-2 lg:pt-5 xl:pt-6",
          "pb-2 lg:pb-3"
        )}
      >
        <MarkerRoad
          className="mt-0.5"
          rounds={rounds}
          style={{ width: `${35}%` }}
        />

        <div className="flex-1 mt-px ml-px -mr-px">
          <div className="w-full h-1/2 flex flex-wrap content-start pl-px">
            <BigRoad rounds={rounds} />
          </div>

          <div className="w-full h-1/4 flex flex-wrap content-start mt-px ml-px">
            <BigEyeRoad rounds={rounds} />
          </div>

          <div className="w-full h-1/4 flex flex-wrap content-start pt-px px-px">
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
  );
}
