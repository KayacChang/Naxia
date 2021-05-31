import React from "react";
import { ReactNode, useLayoutEffect, useState } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "system";
import { Map } from "immutable";
import { throttle } from "utils";
import Assets from "assets";
import { createPortal } from "react-dom";

export function isChrome() {
  const userAgent = window.navigator.userAgent;
  return /Chrome/i.test(userAgent) || /CriOS/i.test(userAgent);
}

export function isIOS() {
  return window.navigator.platform.match(/iPad|iPhone|iPod/i);
}

export function getOrientation(): "portrait" | "landscape" {
  const mql = window.matchMedia("(orientation: portrait)");

  return mql.matches ? "portrait" : "landscape";
}

export function getViewPort(ratio = 16 / 9) {
  const height = Math.min(window.screen.width, window.screen.height);

  const width = height * ratio;

  return {
    width,
    height,
  };
}

export function isBarOpen() {
  const diff = window.outerHeight - window.innerHeight;

  const trigger = isChrome() ? window.outerHeight / 10 : 0;

  return diff > trigger;
}

type Viewport = { width: number; height: number };

const initialState: Viewport = getViewPort();

const viewportSlice = createSlice({
  name: "viewport",
  initialState,
  reducers: {
    update(state, action: PayloadAction<Viewport>) {
      const { width, height } = action.payload;

      state.width = width;
      state.height = height;
    },
  },
});

const selectViewport = (state: RootState) => state.viewport;

export default viewportSlice.reducer;

type ViewportProviderProps = {
  children: ReactNode;
};
export function ViewportProvider({ children }: ViewportProviderProps) {
  const dispatch = useAppDispatch();
  const viewport = useAppSelector(selectViewport);
  const [orientation, setOrientation] = useState(getOrientation());
  const [isToolbarVisible, setToolbarVisible] = useState(() => isBarOpen());

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
  }, [setOrientation, setToolbarVisible, isToolbarVisible]);

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

  return (
    <>
      {children}

      {isToolbarVisible &&
        createPortal(
          <div
            className="absolute top-0 w-full pointer-events-auto"
            style={{ height: `400vh`, zIndex: 999 }}
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

export function useViewport() {
  return useAppSelector(selectViewport);
}
