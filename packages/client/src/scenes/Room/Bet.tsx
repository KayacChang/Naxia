import clsx from "clsx";
import Assets from "assets";

type BetProps = {
  enable?: boolean;
  active?: boolean;
  value: number;
  className?: string;
};
export default function Bet({
  enable = true,
  value,
  active,
  className,
}: BetProps) {
  return (
    <button
      className={clsx(
        "relative flex items-center justify-center",
        active && "transform scale-120 lg:scale-100",
        enable || "pointer-events-none opacity-50",
        className
      )}
    >
      {active && (
        <div
          className="absolute -z-10 animate-spin"
          style={{ willChange: "transform" }}
        >
          <img
            className="transform scale-115 animate-pulse"
            style={{ willChange: "opacity" }}
            src={Assets.Room.Bet_Effect}
            alt="effect"
          />
        </div>
      )}

      <img
        src={active ? Assets.Room.Bet_Active : Assets.Room.Bet_Normal}
        alt="bet background"
      />

      <span className="absolute font-noto font-bold tracking-wider text-sonora glow mt-0.5">
        {value}
      </span>
    </button>
  );
}
