import { CSSProperties } from "react";
import { range } from "ramda";
import { Round } from "types";

type ResultImages = {
  Player: string;
  Banker: string;
  Tie: string;
  BankPair: string;
  PlayerPair: string;
};

type MarkerRoadProps = {
  rounds: Round[];
  style?: CSSProperties;
  images: ResultImages;
};
function MarkerRoad({ rounds, style, images }: MarkerRoadProps) {
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
              {result === "Player" ? "閒" : "莊"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type RoadProps = {
  frame: string;
  resultImages: ResultImages;
  rounds: Round[];
};
export function Road({ frame, rounds, resultImages }: RoadProps) {
  return (
    <div className="relative">
      <img src={frame} alt="road background" />

      <div
        className="absolute top-0 w-full h-full flex"
        style={{
          paddingLeft: `${12}px`,
          paddingTop: `${10}px`,
          paddingBottom: `${6}px`,
        }}
      >
        <MarkerRoad
          rounds={rounds}
          style={{ width: `${34}%` }}
          images={resultImages}
        />
      </div>
    </div>
  );
}
