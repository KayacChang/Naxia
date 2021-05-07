import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import room from "./room";
import assets from "./assets";
import user from "./user";

export const store = configureStore({
  reducer: {
    room,
    assets,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./maps";
export * from "./user";
export * from "./assets";
export * from "./room";
