import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item, RoomStatus, Boss } from "types";
import { assets, toTask, wait } from "utils";
import { AppDispatch, RootState, store } from ".";
import { addAssets, selectAssetIsLoading } from "./assets";

type RoundResult = {
  items: Item[];
  info: {
    game_round: string;
    bank_pair: boolean;
    banker: boolean;
    player: boolean;
    player_pair: boolean;
    tie: boolean;
  };
  result: "win" | "lose";
};

type RoomResponse =
  | { event: "room_status"; data: { status: RoomStatus } }
  | { event: "next_status_countdown"; timer: number }
  | { event: "round_result"; data: RoundResult }
  | { event: "next_round_monster"; data: Boss };

let ws: WebSocket | undefined;

const status = createAction<RoomStatus>("room/status");
const countdown = createAction<number>("room/countdown");
const result = createAction<RoundResult>("room/result");

const bosses = [
  assets("/boss/guaiwu1/guaiwu1.json"),
  assets("/boss/guaiwu2/guaiwu2.json"),
];

const boss = createAsyncThunk<
  Boss,
  Boss,
  { state: RootState; dispatch: AppDispatch }
>("room/boss", async (boss, { getState, dispatch }) => {
  const old = selectRoomBoss(getState());

  if (old && old.id === boss.id) {
    return boss;
  }

  while (selectAssetIsLoading(getState())) {
    await wait(100);
  }

  await dispatch(addAssets(toTask({ [boss.id]: bosses[boss.id] })));

  return boss;
});

export const join = createAsyncThunk("room/join", async () => {
  ws = new WebSocket(process.env.REACT_APP_WS || "");

  ws.addEventListener("message", (event: MessageEvent) => {
    const data = JSON.parse(event.data) as RoomResponse;

    if (data.event === "room_status") {
      store.dispatch(status(data.data.status));
    }

    if (data.event === "next_status_countdown") {
      store.dispatch(countdown(data.timer));
    }

    if (data.event === "round_result") {
      store.dispatch(result(data.data));
    }

    if (data.event === "next_round_monster") {
      store.dispatch(boss(data.data));
    }
  });

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
  bosses: Boss[];
}

const initialState: RoomState = {
  isJoin: false,
  status: {
    current: RoomStatus.Change,
    countdown: 0,
  },
  bosses: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(join.fulfilled, (state) => {
        state.isJoin = true;
      })
      .addCase(leave.fulfilled, (state) => {
        state.isJoin = false;
      })
      .addCase(status, (state, action) => {
        state.status.current = action.payload;

        if (state.status.current === RoomStatus.Change) {
          state.bosses.shift();
        }
      })
      .addCase(countdown, (state, action) => {
        state.status.countdown = action.payload;
      })
      .addCase(result, (state, action) => {
        state.result = action.payload;
      })
      .addCase(boss.fulfilled, (state, action) => {
        state.bosses.push(action.payload);
      });
  },
});

export const selectRoom = (state: RootState) => state.room;
export const selectRoomIsJoin = (state: RootState) => state.room.isJoin;
export const selectRoomStatus = (state: RootState) => state.room.status;
export const selectRoomStatusCurrent = (state: RootState) =>
  state.room.status.current;
export const selectRoomResult = (state: RootState) => state.room.result;
export const selectRoomBoss = (state: RootState) => state.room.bosses[0];

export default roomSlice.reducer;
