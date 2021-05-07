import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bet } from "api";
import invariant from "tiny-invariant";
import { Item, RoomStatus, Boss, Order } from "types";
import { assets, toTask, wait } from "utils";
import { AppDispatch, RootState, store } from ".";
import { addAssets, selectAssetIsLoading } from "./assets";
import { selectToken, selectUser } from "./user";

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

export const selectRoom = (state: RootState) => state.room;
export const selectRoomID = (state: RootState) => state.room.room_id;
export const selectRoomIsJoin = (state: RootState) => state.room.isJoin;
export const selectRoomStatus = (state: RootState) => state.room.status;
export const selectRoomStatusCurrent = (state: RootState) =>
  state.room.status.current;
export const selectRoomResult = (state: RootState) => state.room.result;
export const selectRoomBoss = (state: RootState) => state.room.bosses[0];
export const selectRoomOrder = (state: RootState) => state.room.order;
export const selectRoomHasSubmitted = (state: RootState) =>
  state.room.hasSubmitted;

let ws: WebSocket | undefined;

const bosses = [
  assets("/boss/guaiwu1/guaiwu1.json"),
  assets("/boss/guaiwu2/guaiwu2.json"),
];

const game = {
  status: createAction<RoomStatus>("room/game/status"),
  countdown: createAction<number>("room/game/countdown"),
  result: createAction<RoundResult>("room/game/result"),
  boss: createAsyncThunk<
    Boss,
    Boss,
    { state: RootState; dispatch: AppDispatch }
  >("room/game/boss", async (boss, { getState, dispatch }) => {
    const old = selectRoomBoss(getState());

    if (old && old.id === boss.id) {
      return boss;
    }

    while (selectAssetIsLoading(getState())) {
      await wait(100);
    }

    await dispatch(addAssets(toTask({ [boss.id]: bosses[boss.id] })));

    return boss;
  }),
};

const order = {
  submit: createAsyncThunk<Order, Order, { state: RootState }>(
    "room/order/submit",
    async (order, { getState }) => {
      const token = selectToken(getState());
      const user = selectUser(getState());
      const room_id = selectRoomID(getState());

      invariant(token && user && room_id, "Unauthorized");

      const options = Object.entries(order)
        .filter(([, value]) => Boolean(value))
        .map(([name, value]) => ({
          cmd: name,
          val: value || 0,
        }));

      await bet(token, {
        room_id,
        uid: user.uid,
        options,
      });

      return order;
    }
  ),
  add: createAction<Order>("room/order/add"),
  clear: createAction("room/order/clear"),
  redo: createAction("room/order/redo"),
};

export const room = {
  game,
  order,
  join: createAsyncThunk<string, string>("room/join", (roomID) => {
    ws = new WebSocket(process.env.REACT_APP_WS || "");

    ws.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data) as RoomResponse;

      if (data.event === "room_status") {
        store.dispatch(game.status(data.data.status));
      }

      if (data.event === "next_status_countdown") {
        store.dispatch(game.countdown(data.timer));
      }

      if (data.event === "round_result") {
        store.dispatch(game.result(data.data));
      }

      if (data.event === "next_round_monster") {
        store.dispatch(game.boss(data.data));
      }
    });

    return new Promise((resolve) => {
      ws?.addEventListener("open", () => resolve(roomID));
    });
  }),
  leave: createAsyncThunk("room/leave", async () => {
    ws?.close();
    ws = undefined;
  }),
};

export interface RoomState {
  room_id?: string;
  isJoin: boolean;
  status: {
    current: RoomStatus;
    countdown: number;
  };
  result?: RoundResult;
  bosses: Boss[];

  hasSubmitted: boolean;
  history: Order[];
  order: Order;
}

const initialState: RoomState = {
  isJoin: false,
  status: {
    current: RoomStatus.Change,
    countdown: 0,
  },
  bosses: [],

  hasSubmitted: false,
  history: [],
  order: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(room.join.fulfilled, (state, action) => {
        state.room_id = action.payload;
        state.isJoin = true;
      })
      .addCase(room.leave.fulfilled, (state) => {
        state.isJoin = false;
      })
      .addCase(room.game.status, (state, action) => {
        state.status.current = action.payload;

        if (state.status.current === RoomStatus.Stop && !state.hasSubmitted) {
          state.order = {};
        }

        if (state.status.current === RoomStatus.Change) {
          state.bosses.shift();
          state.hasSubmitted = false;
          state.order = {};
        }
      })
      .addCase(room.game.countdown, (state, action) => {
        state.status.countdown = action.payload;
      })
      .addCase(room.game.result, (state, action) => {
        state.result = action.payload;
      })
      .addCase(room.game.boss.fulfilled, (state, action) => {
        state.bosses.push(action.payload);
      })
      .addCase(room.order.add, (state, action) => {
        state.order = Object.entries(action.payload).reduce(
          (order, [name, value]) => ({
            ...order,
            [name]: (order[name] || 0) + value,
          }),
          state.order
        );
      })
      .addCase(room.order.clear, (state) => {
        state.order = {};
      })
      .addCase(room.order.redo, (state) => {
        state.order = state.history[state.history.length - 1];
      })
      .addCase(room.order.submit.fulfilled, (state, action) => {
        state.hasSubmitted = true;

        state.history.push(action.payload);
      });
  },
});

export default roomSlice.reducer;
