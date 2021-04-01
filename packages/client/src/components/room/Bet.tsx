import BET_NORMAL from "assets/room/bet/bet-normal.png";
import BET_ACTIVE from "assets/room/bet/bet-active.png";
import BET_EFFECT from "assets/room/bet/bet-effect.png";
import clsx from "clsx";

type BetProps = {
  active?: boolean;
  value: number;
};
export function Bet({ value, active }: BetProps) {
  return (
    <div className={clsx("w-10 relative", active && "transform scale-120")}>
      {active && (
        <img
          className="absolute -z-10 transform scale-115"
          src={BET_EFFECT}
          alt="effect"
        />
      )}

      <img src={active ? BET_ACTIVE : BET_NORMAL} alt="bet background" />

      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white">
        {value}
      </span>
    </div>
  );
}
