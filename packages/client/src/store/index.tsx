import { configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";
import { Provider, useDispatch as _useDispatch } from "react-redux";
import * as User from "./user";

const store = configureStore({
  reducer: {
    user: User.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export function StoreProvider({ children }: PropsWithChildren<{}>) {
  return <Provider store={store}>{children}</Provider>;
}

export function useDispatch() {
  return _useDispatch<typeof store.dispatch>();
}

export { User };
