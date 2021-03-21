import { configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";
import {
  Provider,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import * as User from "./user";
import * as Item from "./item";
import * as Area from "./area";

const store = configureStore({
  reducer: {
    user: User.reducer,
    items: Item.reducer,
    areas: Area.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export function StoreProvider({ children }: PropsWithChildren<{}>) {
  return <Provider store={store}>{children}</Provider>;
}

export function useDispatch() {
  return _useDispatch<typeof store.dispatch>();
}

type Selector<T> = (state: RootState) => T;
export function useSelector<T>(selector: Selector<T>) {
  return _useSelector<RootState, T>(selector);
}

export { User, Item, Area };
