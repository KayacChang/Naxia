import Assets from "assets";
import clsx from "clsx";
import { Circle } from "./Circle";

type RingProps = {
  color: "red" | "blue";
  tie?: number;
  bankerPair?: boolean;
  playerPair?: boolean;
};
export function Ring({ color, tie, bankerPair, playerPair }: RingProps) {
  const ringColor =
    // color === "red" ? Assets.Room.Road_Ring_Red : Assets.Room.Road_Ring_Blue;
    color === "red" ? Assets.Room.Icon_Fire : Assets.Room.Icon_Ice;

  return (
    <div className="relative flex justify-center items-center">
      {bankerPair && (
        <Circle
          className={clsx(
            "absolute top-0 left-0 from-red-500",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(-0.05rem, -0.05rem) scale(50%)`,
            backgroundImage: `url('${Assets.Room.Icon_Fire_Circle}')`,
          }}
        />
      )}

      <img
        style={{ padding: `1px` }}
        src={ringColor}
        alt={`road ${color} ring`}
      />

      {playerPair && (
        <Circle
          className={clsx(
            "absolute bottom-0 right-0 from-blue-500",
            "w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3"
          )}
          style={{
            transform: `translate(0.05rem, 0.05rem) scale(50%)`,
            backgroundImage: `url('${Assets.Room.Icon_Ice_Circle}')`,
          }}
        />
      )}

      {tie && (
        <span className="absolute text-xxs xl:text-sm transform scale-50">
          {tie}
        </span>
      )}
    </div>
  );
}
