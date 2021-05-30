import React from "react";
import Assets from "assets";
import { UI } from "layers";

function Progress() {
  return (
    <div className="relative flex items-center justify-center">
      <img src={Assets.System.Progress_Frame} alt="progress frame" />

      <div className="absolute px-5">
        <div className="relative flex items-center">
          <img
            src={Assets.System.Progress_Bar}
            alt="progress bar"
            style={{ clipPath: `inset(0 ${50}% 0 0)` }}
          />

          <img
            className="absolute w-3 transform -translate-x-1/2 animate-pulse"
            style={{ left: `${50}%` }}
            src={Assets.System.Progress_Effect}
            alt="glow effect"
          />
        </div>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <UI className="z-50">
      <div className="relative font-noto">
        <img src={Assets.System.Progress_Background} alt="background" />

        <div className="absolute bottom-0 py-6 space-y-1">
          <div className="flex items-center justify-center space-x-3">
            <img
              className="transform -scale-x-100 w-14"
              src={Assets.System.Progress_Item}
              alt="decorator"
            />

            <p className="text-yellow-200 animate-pulse">{"加載中"}</p>

            <img
              className="w-14"
              src={Assets.System.Progress_Item}
              alt="decorator"
            />
          </div>

          <Progress />

          <p className="px-6 text-xs text-yellow-400">
            {"小提示:提示提示提示"}
          </p>
        </div>
      </div>
    </UI>
  );
}
