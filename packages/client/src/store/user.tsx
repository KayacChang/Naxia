import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";

const { reducer, actions } = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {
    login: (_, action: PayloadAction<User>) => action.payload,
  },
});

export { reducer, actions };
