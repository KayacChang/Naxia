import Assets from "assets";
import clsx from "clsx";
import { UI } from "layers";
import {
  isMobile,
  selectAssetProgress,
  useAppSelector,
  useViewport,
} from "system";

function Progress() {
  const progress = useAppSelector(selectAssetProgress);
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");
  const setiPadStyle = {
    margin: '0 auto',
    maxWidth: window.screen.height,
  }
  return (
    <div className={`relative flex items-center justify-center ${isiPad && 'set_iPad_style'}`}>
      <img src={Assets.System.Progress_Frame} alt="progress frame" />

      <div className="absolute">
        <TopText />
      </div>

      <div className="absolute w-full" style={{ padding: `${3}%` }}>
        <div className="relative flex items-center" style={{ width: `${98.7}%` }}>
          <img
            src={Assets.System.Progress_Bar}
            alt="progress bar"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          />

          <img
            className="absolute transform -translate-x-1/2 animate-pulse"
            style={{ left: `${progress}%`, width: `${2}%` }}
            src={Assets.System.Progress_Effect}
            alt="glow effect"
          />
        </div>
      </div>

      <div className="absolute">
        <HelpText />
      </div>
    </div>
  );
}

function HelpText() {
  const { scale } = useViewport();

  return (
    <div
      style={{
        transform: `scale(${isMobile() ? 1 : scale}) translateY(${100}%)`,
      }}
    >
      <p className={clsx("text-yellow-400 text-base", isMobile() || "mt-2")}>
        {"小提示:提示提示提示"}
      </p>
    </div>
  );
}

function TopText() {
  const { scale } = useViewport();

  return (
    <div
      className="flex items-center"
      style={{
        transform: `scale(${isMobile() ? 1 : scale}) translateY(${-100}%)`,
      }}
    >
      <img
        className="transform -scale-x-100"
        src={Assets.System.Progress_Item}
        alt="decorator"
      />

      <p className={clsx("text-yellow-200 animate-pulse whitespace-nowrap")}>
        {"加載中"}
      </p>

      <img src={Assets.System.Progress_Item} alt="decorator" />
    </div>
  );
}

export function Loading() {
  return (
    <UI className="z-50">
      <div className="text-xl font-nota w-full h-full flex flex-col justify-center items-center">
        <img src={Assets.System.Progress_Background} alt="background" />

        <div className="absolute bottom-1/10 w-full">
          <Progress />
        </div>
      </div>
    </UI>
  );
}
