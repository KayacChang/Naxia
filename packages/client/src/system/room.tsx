import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bet } from "api";
import invariant from "tiny-invariant";
import { Item, RoomStatus, Boss, Order } from "types";
import { toTask, wait } from "utils";
import { AppDispatch, RootState, user } from ".";
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
export const selectRoomCountDown = (state: RootState) =>
  state.room.status.countdown;
export const selectRoomStatusCurrent = (state: RootState) =>
  state.room.status.current;
export const selectRoomResult = (state: RootState) => state.room.result;
export const selectRoomOrder = (state: RootState) => state.room.order;
export const selectRoomHasSubmitted = (state: RootState) =>
  state.room.hasSubmitted;

export const selectRoomBossAll = (state: RootState) => state.room.boss.all;
export const selectRoomBossCurrent = (state: RootState) =>
  state.room.boss.current;
export const selectRoomBossStage = (state: RootState) => state.room.boss.stage;

let ws: WebSocket | undefined;

const game = {
  status: createAction<RoomStatus>("room/game/status"),
  countdown: createAction<number>("room/game/countdown"),
  result: createAction<RoundResult>("room/game/result"),
  boss: createAsyncThunk<
    Boss,
    Boss,
    { state: RootState; dispatch: AppDispatch }
  >("room/game/boss", async (boss, { getState, dispatch }) => {
    const cache = selectRoomBossAll(getState());

    if (cache.some(({ id }) => boss.id === id)) {
      return boss;
    }

    while (selectAssetIsLoading(getState())) {
      await wait(100);
    }

    await dispatch(addAssets(toTask({ [`Boss.${boss.id}`]: boss.spine_json })));

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
    },
    {
      condition: (order) => Object.entries(order).length > 0,
    }
  ),
  add: createAsyncThunk<
    Order,
    Order,
    { state: RootState; dispatch: AppDispatch }
  >(
    "room/order/add",
    (order, { getState, dispatch }) => {
      const {
        user: { user: currentUser },
      } = getState();

      invariant(currentUser, "Unauthorized");

      const totalbet =
        Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

      dispatch(user.balance.update(currentUser.balance - totalbet));

      return order;
    },
    {
      condition: (order, { getState }) => {
        const {
          user: { user },
        } = getState();

        invariant(user, "Unauthorized");

        const totalbet =
          Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

        return user.balance >= totalbet;
      },
    }
  ),
  clear: createAsyncThunk<
    void,
    void,
    { state: RootState; dispatch: AppDispatch }
  >("room/order/clear", (_, { getState, dispatch }) => {
    const {
      room: { order },
      user: { user: currentUser },
    } = getState();

    invariant(currentUser, "Unauthorized");

    const totalbet =
      Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

    dispatch(user.balance.update(currentUser.balance + totalbet));
  }),
  redo: createAsyncThunk<
    Order,
    void,
    { state: RootState; dispatch: AppDispatch }
  >(
    "room/order/redo",
    (_, { getState, dispatch }) => {
      const {
        room: { history },
        user: { user: currentUser },
      } = getState();

      invariant(currentUser, "Unauthorized");

      const order = history[history.length - 1] || {};

      const totalbet =
        Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

      dispatch(user.balance.update(currentUser.balance - totalbet));

      return order;
    },
    {
      condition: (_, { getState }) => {
        const {
          room: { history },
          user: { user },
        } = getState();

        invariant(user, "Unauthorized");

        const order = history[history.length - 1] || {};

        const totalbet =
          Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

        return user.balance >= totalbet;
      },
    }
  ),
};

export const room = {
  game,
  order,
  join: createAsyncThunk<
    string,
    string,
    { state: RootState; dispatch: AppDispatch }
  >("room/join", (roomID, { getState, dispatch }) => {
    const token = selectToken(getState());

    invariant(token, "Unauthorized");

    const url = new URL(process.env.REACT_APP_WS || "");
    url.searchParams.append("roomID", roomID);
    url.searchParams.append("token", token);

    ws = new WebSocket(url.toString());

    ws.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data) as RoomResponse;

      if (data.event === "room_status") {
        dispatch(room.order.clear());
        dispatch(game.status(data.data.status));
      }

      if (data.event === "next_status_countdown") {
        dispatch(game.countdown(data.timer));
      }

      if (data.event === "round_result") {
        dispatch(game.result(data.data));
      }

      if (data.event === "next_round_monster") {
        dispatch(game.boss(data.data));
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

  boss: {
    current?: Boss;
    stage?: Boss;
    all: Boss[];
  };

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
  boss: {
    all: [],
  },
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

        if (state.status.current === RoomStatus.Change) {
          state.boss.current = state.boss.stage;
        }

        if (state.status.current === RoomStatus.Result) {
          state.hasSubmitted = false;
        }
      })
      .addCase(room.game.countdown, (state, action) => {
        state.status.countdown = action.payload;
      })
      .addCase(room.game.result, (state, action) => {
        state.result = action.payload;
      })
      .addCase(room.game.boss.fulfilled, (state, action) => {
        const boss = action.payload;

        if (state.boss.current === undefined) {
          state.boss.current = boss;
          state.boss.stage = boss;
        } else {
          state.boss.stage = boss;
        }

        if (state.boss.all.every(({ id }) => boss.id !== id)) {
          state.boss.all.push(action.payload);
        }
      })
      .addCase(room.order.add.fulfilled, (state, action) => {
        state.order = Object.entries(action.payload).reduce(
          (order, [name, value]) => ({
            ...order,
            [name]: (order[name] || 0) + value,
          }),
          state.order
        );
      })
      .addCase(room.order.clear.fulfilled, (state) => {
        state.order = {};
      })
      .addCase(room.order.redo.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(room.order.submit.fulfilled, (state, action) => {
        state.order = {};
        state.hasSubmitted = true;

        state.history.push(action.payload);
      });
  },
});

export default roomSlice.reducer;
