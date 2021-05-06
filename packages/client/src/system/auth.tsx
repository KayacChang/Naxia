import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "api";
import { RootState } from "system";

export type AuthState = {
  token?: string;
};
type AuthRequest = {
  username: string;
  password: string;
};

export const auth = createAsyncThunk<string, AuthRequest>(
  "auth",
  async ({ username, password }) => {
    const { token } = await login({ username, password });

    localStorage.setItem("TOKEN", token);

    return token;
  }
);

const initialState: AuthState = {
  token: localStorage.getItem("TOKEN") || undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
