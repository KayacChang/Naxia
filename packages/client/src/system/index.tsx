import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import room from "./room";
import assets from "./assets";
import user from "./user";
import sounds from "./sounds";
import viewport from "./viewport";
import map from "./maps";
import system from "./system";

export const store = configureStore({
  reducer: {
    room,
    assets,
    user,
    sounds,
    viewport,
    map,
    system,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./maps";
export * from "./user";
export * from "./assets";
export * from "./sounds";
export * from "./room";
export * from "./viewport";
export * from "./system";
