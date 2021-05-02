import clsx from "clsx";
import Assets from "assets";

type BetProps = {
  enable?: boolean;
  active?: boolean;
  value: number;
};
export default function Bet({ enable = true, value, active }: BetProps) {
  return (
    <button
      className={clsx(
        "w-10 relative",
        active && "transform scale-120",
        enable || "pointer-events-none opacity-50"
      )}
    >
      {active && (
        <img
          className="absolute -z-10 transform scale-115"
          src={Assets.Room.Bet_Effect}
          alt="effect"
        />
      )}

      <img
        src={active ? Assets.Room.Bet_Active : Assets.Room.Bet_Normal}
        alt="bet background"
      />

      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white">
        {value}
      </span>
    </button>
  );
}
