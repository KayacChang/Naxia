import { ReactNode, useLayoutEffect, useState } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "system";
import { Map } from "immutable";
import { throttle } from "utils";
import Assets from "assets";
import { createPortal } from "react-dom";
import MobileDetect from "mobile-detect";

function detect() {
  return new MobileDetect(window.navigator.userAgent);
}

export function isChrome() {
  return detect().match("Chrome");
}

export function isSafari() {
  return !isChrome() && detect().match("Safari");
}

export function isIOS() {
  return detect().os() === "iOS";
}

export function isMobileMock() {
  return window.navigator.userAgent.indexOf("Mobile") !== -1;
}

export function isMobile() {
  return Boolean(detect().mobile());
}

function getScale() {
  const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const screenWidth = window.screen.width;

  return screenWidth / viewportWidth;
}

export function getOrientation(): "portrait" | "landscape" {
  const mql = window.matchMedia("(orientation: portrait)");

  return mql.matches ? "portrait" : "landscape";
}

export function getViewPort(ratio = 16 / 9) {
  if (!isMobile()) {
    if (window.innerWidth / window.innerHeight < ratio) {
      const width = window.innerWidth;

      const height = width / ratio;

      return {
        width,
        height,
        scale: height / window.innerHeight,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
      };
    }

    const height = window.innerHeight;
    const width = height * ratio;

    return {
      width,
      height,
      scale: 1 / window.devicePixelRatio || 1,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    };
  }

  const height = Math.min(window.screen.width, window.screen.height);

  const width = height * ratio;

  return {
    width,
    height,
    scale: 1 / window.devicePixelRatio || 1,

    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
  };
}

export function isBarOpen() {
  const diff = window.outerHeight - window.innerHeight;

  const trigger = window.outerHeight / 10;

  return diff > trigger;
}

export function isiPad() {
  return detect().match("iPad");
}

type Viewport = {
  width: number;
  height: number;
  scale: number;
  availWidth: number;
  availHeight: number;
};
const initialState: Viewport = getViewPort();
const viewportSlice = createSlice({
  name: "viewport",
  initialState,
  reducers: {
    update(state, action: PayloadAction<Viewport>) {
      const { width, height, scale } = action.payload;
      state.width = width;
      state.height = height;
      state.scale = scale;
    },
  },
});

function toggleFullscreen(el: HTMLElement) {
  if (!document.fullscreenElement) {
    el.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

type ViewportProviderProps = {
  children: ReactNode;
};
export function ViewportProvider({ children }: ViewportProviderProps) {
  const dispatch = useAppDispatch();
  const viewport = useAppSelector(selectViewport);
  const [orientation, setOrientation] = useState(getOrientation());
  const [isToolbarVisible, setToolbarVisible] = useState(() => isBarOpen());
  const [isFullScreen, setFullScreen] = useState(() =>
    Boolean(document.fullscreenElement)
  );
  const isDesktop = !isMobile();
  const isIpad = isiPad();

  useLayoutEffect(() => {
    if (isFullScreen) {
      const cur = getViewPort();

      dispatch(viewportSlice.actions.update(cur));

      return;
    }

    const refresh = () => {
      const cur = getViewPort();
      if (!Map(cur).equals(Map(viewport))) {
        dispatch(viewportSlice.actions.update(cur));
      }
    };

    let id = requestAnimationFrame(function update() {
      refresh();
      id = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(id);
  }, [viewport, dispatch, isFullScreen]);

  useLayoutEffect(() => {
    if (isDesktop) return;

    const refresh = throttle(10, () => {
      setOrientation(getOrientation());
      setToolbarVisible(isBarOpen());
    });

    if (!isToolbarVisible) {
      window.addEventListener("resize", refresh);

      return () => window.removeEventListener("resize", refresh);
    }

    let id = requestAnimationFrame(function update() {
      refresh();
      id = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(id);
  }, [setOrientation, setToolbarVisible, isToolbarVisible, isDesktop]);

  useLayoutEffect(() => {
    const fn = () => setFullScreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", fn);

    return () => document.removeEventListener("fullscreenchange", fn);
  }, [setFullScreen]);

  if (isDesktop) {
    if (isSafari() && Math.abs(getScale() - 1) > 0.01) {
      return createPortal(
        <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
          <h1 className="text-white text-2xl">
            請將螢幕縮放 {window.devicePixelRatio > 1 ? "縮小" : "放大"}
            ，以獲得順暢的遊玩體驗。
          </h1>
        </div>,
        document.getElementById("root") as HTMLElement
      );
    }

    if (window.devicePixelRatio !== 1) {
      return createPortal(
        <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
          <h1 className="text-white text-2xl">
            請將螢幕縮放 {window.devicePixelRatio > 1 ? "縮小" : "放大"}
            ，以獲得順暢的遊玩體驗。
          </h1>
        </div>,
        document.getElementById("root") as HTMLElement
      );
    }

    return <>{children}</>;
  }

  if (orientation === "portrait") {
    return createPortal(
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="w-3/5">
          <img src={Assets.System.Rotate} alt="rotate" />
        </div>
      </div>,
      document.getElementById("root") as HTMLElement
    );
  }

  if (isIpad && orientation === "landscape") document.querySelector('html')?.classList.add('isIpad');

  if (isChrome() && !isIOS()) {
    return (
      <>
        {children}

        {!isFullScreen &&
          createPortal(
            <div
              className="absolute top-0 w-full pointer-events-auto overflow-auto"
              style={{ height: `400vh`, zIndex: 999, touchAction: "auto" }}
              ref={(ref) => {
                const root = document.body;

                if (!ref || !root) return;

                const fn = () => toggleFullscreen(root);

                ref.addEventListener("click", fn);
              }}
            ></div>,
            document.body as HTMLElement
          )}
      </>
    );
  }

  return (
    <>
      {children}

      {isToolbarVisible &&
        createPortal(
          <div
            className="absolute top-0 w-full pointer-events-auto overflow-auto"
            style={{ height: `400vh`, zIndex: 999, touchAction: "auto" }}
          >
            <div className="fixed top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
              <div className="w-1/5">
                <img src={Assets.System.Scroll} alt="scroll" />
              </div>
            </div>
          </div>,
          document.getElementById("root") as HTMLElement
        )}
    </>
  );
}

const selectViewport = (state: RootState) => state.viewport;

export default viewportSlice.reducer;

export function useViewport() {
  return useAppSelector(selectViewport);
}
