import { CSSProperties } from "react";
import { range } from "ramda";
import { Round } from "types";
import Assets from "assets";

const images = {
  player: Assets.Common.Road_Blue,
  banker: Assets.Common.Road_Red,
  tie: Assets.Common.Road_Blue,
  player_pair: Assets.Common.Road_Blue,
  bank_pair: Assets.Common.Road_Red,
};

type MarkerRoadProps = {
  rounds: Round[];
  style?: CSSProperties;
};
function MarkerRoad({ rounds, style }: MarkerRoadProps) {
  return (
    <div className="w-full h-full grid grid-cols-9" style={style}>
      {range(0, 6 * 9).map((id) => {
        if (!rounds[id]) return <div key={id}></div>;

        const { result } = rounds[id];

        return (
          <div
            key={id}
            className="relative flex justify-center items-center"
            style={{ margin: `${1}px` }}
          >
            <img className="absolute" src={images[result]} alt="blue" />

            <div className="absolute text-xxs">
              {result === "player" ? "閒" : "莊"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type RoadProps = {
  rounds: Round[];
};
export function Road({ rounds }: RoadProps) {
  return (
    <div className="relative">
      <img src={Assets.Common.Road_Frame} alt="road background" />

      <div
        className="absolute top-0 w-full h-full flex"
        style={{
          paddingLeft: `${12}px`,
          paddingTop: `${10}px`,
          paddingBottom: `${6}px`,
        }}
      >
        <MarkerRoad rounds={rounds} style={{ width: `${34}%` }} />
      </div>
    </div>
  );
}
