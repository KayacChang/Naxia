import React, { Component }  from 'react';
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
        "w-10 relative flex items-center justify-center",
        active && "transform scale-120",
        enable || "pointer-events-none opacity-50"
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

      <span className="absolute text-xs font-noto font-bold tracking-wider text-sonora glow mt-0.5">
        {value}
      </span>
    </button>
  );
}
