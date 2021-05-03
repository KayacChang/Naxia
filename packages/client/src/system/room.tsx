import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, RoomStatus } from "types";
import { RootState, store } from ".";

type RoundResult = { items: Item[]; result: "win" | "lose" };

type RoomResponse =
  | { event: "room_status"; data: { status: RoomStatus } }
  | { event: "next_status_countdown"; timer: number }
  | { event: "round_result"; data: RoundResult };

let ws: WebSocket | undefined;

export const join = createAsyncThunk("room/join", async () => {
  ws = new WebSocket(process.env.REACT_APP_WS || "");

  return new Promise<void>((resolve) => {
    ws?.addEventListener("open", () => resolve());
  });
});

export const leave = createAsyncThunk("room/leave", async () => {
  ws?.close();
  ws = undefined;
});

export interface RoomState {
  isJoin: boolean;
  status: {
    current: RoomStatus;
    countdown: number;
  };
  result?: RoundResult;
}

const initialState: RoomState = {
  isJoin: false,
  status: {
    current: RoomStatus.Change,
    countdown: 0,
  },
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    status: (state, action: PayloadAction<RoomStatus>) => {
      state.status.current = action.payload;
    },
    countdown: (state, action: PayloadAction<number>) => {
      state.status.countdown = action.payload;
    },
    result: (state, action: PayloadAction<RoundResult | undefined>) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(join.fulfilled, (state) => {
      state.isJoin = true;

      ws?.addEventListener("message", (event: MessageEvent) => {
        const data = JSON.parse(event.data) as RoomResponse;

        if (data.event === "room_status") {
          store.dispatch(roomSlice.actions.status(data.data.status));
          return;
        }

        if (data.event === "next_status_countdown") {
          store.dispatch(roomSlice.actions.countdown(data.timer));
          return;
        }

        if (data.event === "round_result") {
          store.dispatch(roomSlice.actions.result(data.data));
        }

        console.log(data);
      });
    });

    builder.addCase(leave.fulfilled, (state) => {
      state.isJoin = false;
    });
  },
});

export const selectRoomIsJoin = (state: RootState) => state.room.isJoin;
export const selectRoomStatus = (state: RootState) => state.room.status;
export const selectRoomStatusCurrent = (state: RootState) =>
  state.room.status.current;
export const selectRoomResult = (state: RootState) => state.room.result;

export default roomSlice.reducer;
