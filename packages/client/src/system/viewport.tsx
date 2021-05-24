import { ReactNode, useLayoutEffect, useState } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "system";
import { Map } from "immutable";
import { throttle } from "utils";
import Assets from "assets";
import { createPortal } from "react-dom";

export function getOrientation(): "portrait" | "landscape" {
  const mql = window.matchMedia("(orientation: portrait)");

  return mql.matches ? "portrait" : "landscape";
}

export function getViewPort(ratio = 16 / 9) {
  const height = window.screen.availHeight;

  return {
    width: height * ratio,
    height,
  };
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

  useLayoutEffect(() => {
    const refresh = throttle(100, () => {
      const cur = getViewPort();
      if (!Map(cur).equals(Map(viewport))) {
        dispatch(viewportSlice.actions.update(cur));
      }

      const curOrientation = getOrientation();
      if (orientation !== curOrientation) {
        setOrientation(curOrientation);
      }
    });

    let id = requestAnimationFrame(function update() {
      refresh();

      id = requestAnimationFrame(update);
    });

    return () => cancelAnimationFrame(id);
  }, [dispatch, viewport, orientation, setOrientation]);

  if (orientation === "portrait") {
    return createPortal(
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-3/5">
          <img src={Assets.Common.Rotate} alt="rotate" />
        </div>
      </div>,
      document.getElementById("root") as HTMLElement
    );
  }

  return <>{children}</>;
}

export function useViewport() {
  return useAppSelector(selectViewport);
}
