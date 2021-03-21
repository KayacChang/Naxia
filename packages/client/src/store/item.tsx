import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "types";

const { reducer, actions } = createSlice({
  name: "items",
  initialState: {} as Record<string, Item>,
  reducers: {
    add: (state, action: PayloadAction<Item[]>) =>
      action.payload.reduce(
        (state, item) => ({ ...state, [item.id]: item }),
        state
      ),
  },
});

export { reducer, actions };
