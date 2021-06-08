import { ReactNode, useLayoutEffect, useState } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "system";
import { Map } from "immutable";
import { throttle } from "utils";
import Assets from "assets";
import { createPortal } from "react-dom";
import MobileDetect from "mobile-detect";
import { useRouteMatch } from "react-router";

function detect() {
  return new MobileDetect(window.navigator.userAgent);
}

export function isChrome() {
  return detect().userAgent() === "Chrome";
}

export function isIOS() {
  return detect().os() === "iOS";
}

export function isMobile() {
  return Boolean(detect().mobile());
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
      };
    }

    const height = window.innerHeight;

    const width = height * ratio;

    return {
      width,
      height,
      scale: 1 / window.devicePixelRatio || 1,
    };
  }

  const height = Math.min(window.screen.width, window.screen.height);

  const width = height * ratio;

  return {
    width,
    height,
    scale: 1 / window.devicePixelRatio || 1,
  };
}

export function isBarOpen() {
  const diff = window.outerHeight - window.innerHeight;

  const trigger = window.outerHeight / 10;

  return diff > trigger;
}

type Viewport = { width: number; height: number; scale: number };
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
  const match = useRouteMatch({
    path: "/",
    strict: true,
  });

  const isDesktop = !isMobile();

  useLayoutEffect(() => {
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
  }, [viewport, dispatch]);

  useLayoutEffect(() => {
    if (isDesktop) return;

    const refresh = throttle(300, () => {
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

  if (!match?.isExact && isChrome() && !isIOS()) {
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

                const fn = () => root.requestFullscreen();

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
