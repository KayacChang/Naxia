import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Area } from "types";

const { reducer, actions } = createSlice({
  name: "areas",
  initialState: {} as Record<string, Area>,
  reducers: {
    add: (state, action: PayloadAction<Area[]>) =>
      action.payload.reduce(
        (state, area) => ({ ...state, [area.id]: area }),
        state
      ),
  },
});

export { reducer, actions };
