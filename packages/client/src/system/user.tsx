import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, getUserIP, getUserItem, login, updateUser } from "api";
import { RootState, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { User, Item } from "types";
import { system } from "./system";

type AuthRequest = {
  username: string;
  password: string;
};

export const selectToken = (state: RootState) => state.user.token;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserBalance = (state: RootState) => state.user.user?.balance;
export const selectUserItems = (state: RootState) => state.user.items;
export const selectUserError = (state: RootState) => state.user.error;

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
  auth: createAsyncThunk<string, AuthRequest, { rejectValue: string }>(
    "user/auth",
    (req, { rejectWithValue }) =>
      login(req)
        .then(({ token }) => {
          localStorage.setItem("TOKEN", token);

          return token;
        })
        .catch((error) => {
          return rejectWithValue(error);
        })
  ),
  sync: createAsyncThunk<User, void, { state: RootState }>(
    "user/sync",
    async (_, { getState, dispatch }) => {
      const token = selectToken(getState());

      try {
        invariant(token, "Unauthorized");

        const user = await getUser(token);
        const ip = await getUserIP(token);

        user.ip = ip;

        return user;
      } catch (error) {
        dispatch(system.error(error));

        return error;
      }
    }
  ),
  update: createAsyncThunk<User, User, { state: RootState }>(
    "user/update",
    async (user, { getState, dispatch }) => {
      const token = selectToken(getState());

      try {
        invariant(token, "Unauthorized");

        return updateUser(token, user);
      } catch (error) {
        dispatch(system.error(error));

        return error;
      }
    }
  ),

  error: {
    clear: createAction("user/error/clear"),
  },
};

type UserState = {
  token?: string;
  user?: User;
  items?: Item[];
  error?: string;
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
      .addCase(user.auth.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(user.sync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(user.update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(user.item.sync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(user.error.clear, (state) => {
        state.error = undefined;
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

export function useUserError() {
  return useAppSelector(selectUserError);
}
