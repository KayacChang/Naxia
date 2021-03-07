import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";

const slice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    login: (_, action: PayloadAction<User>) => action.payload,
  },
});

const reducer = slice.reducer;
const actions = { ...slice.actions };
export { reducer, actions };
