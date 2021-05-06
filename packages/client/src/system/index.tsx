import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import room from "./room";
import assets from "./assets";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    room,
    assets,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./auth";
export * from "./maps";
export * from "./user";
export * from "./assets";
export * from "./room";
