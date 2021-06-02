import React from "react";
import Assets from "assets";
import { useUserBalance } from "system";
import clsx from "clsx";

export function Status() {
  const value = useUserBalance();

  return (
    <div className="absolute right-0 p-2 pr-3 z-30">
      <div
        className={clsx(
          "relative text-white",
          "flex items-center justify-end",
          "w-44 lg:w-80",
          "text-sm lg:text-xl"
        )}
      >
        <img src={Assets.Common.Balance} alt="status frame" />

        <span className="absolute pr-4 lg:pr-8 mb-0.5 text-fansy">{value}</span>
      </div>
    </div>
  );
}
