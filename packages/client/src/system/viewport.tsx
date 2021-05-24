import { ReactNode, useLayoutEffect } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "system";
import { Map } from "immutable";

export function getViewPort(ratio = 16 / 9) {
  return {
    width: window.innerHeight * ratio,
    height: window.innerHeight,
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

  useLayoutEffect(() => {
    function refresh() {
      const cur = getViewPort();

      if (Map(cur).equals(Map(viewport))) return;

      dispatch(viewportSlice.actions.update(cur));
    }

    let id = requestAnimationFrame(function update() {
      refresh();

      id = requestAnimationFrame(update);
    });

    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);

      cancelAnimationFrame(id);
    };
  }, [dispatch, viewport]);

  return <>{children}</>;
}

export function useViewport() {
  return useAppSelector(selectViewport);
}
