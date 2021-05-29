import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, getUserItem, login, updateUser } from "api";
import { RootState, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { User, Item } from "types";

type AuthRequest = {
  username: string;
  password: string;
};

export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserBalance = (state: RootState) => state.user.user?.balance;
export const selectUserItems = (state: RootState) => state.user.items;

const item = {
  sync: createAsyncThunk<Item[], void, { state: RootState }>(
    "user/item/sync",
    (_, { getState }) => {
      const token = selectToken(getState());

      invariant(token, "Unauthorized");

      return getUserItem(token);
    }
  ),
};

const balance = {
  update: createAction<number>("user/balance/update"),
};

export const user = {
  item,
  balance,
  auth: createAsyncThunk<string, AuthRequest>("user/auth", async (req) => {
    const { token } = await login(req);

    localStorage.setItem("TOKEN", token);

    return token;
  }),
  sync: createAsyncThunk<User, void, { state: RootState }>(
    "user/sync",
    (_, { getState }) => {
      const token = selectToken(getState());

      invariant(token, "Unauthorized");

      return getUser(token);
    }
  ),
  update: createAsyncThunk<User, User, { state: RootState }>(
    "user/update",
    (user, { getState }) => {
      const token = selectToken(getState());

      invariant(token, "Unauthorized");

      return updateUser(token, user);
    }
  ),
};

type UserState = {
  token?: string;
  user?: User;
  items?: Item[];
};
const initialState: UserState = {
  token: localStorage.getItem("TOKEN") || undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(user.balance.update, (state, action) => {
        if (!state.user) return;

        state.user.balance = action.payload;
      })
      .addCase(user.auth.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(user.sync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(user.update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(user.item.sync.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default userSlice.reducer;

export function useUser() {
  return useAppSelector(selectUser);
}

export function useUserItem() {
  return useAppSelector(selectUserItems);
}

export function useUserBalance() {
  return useAppSelector(selectUserBalance);
}
