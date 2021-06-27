import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bet } from "api";
import invariant from "tiny-invariant";
import { Item, RoomStatus, Boss, Order } from "types";
import { toTask, wait } from "utils";
import { AppDispatch, RootState, user } from ".";
import { addAssets, selectAssetIsLoading } from "./assets";
import { system } from "./system";
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
  result: "win" | "lose" | "";
};

interface RoundStatus {
  bank_pair: number;
  banker: number;
  player: number;
  player_pair: number;
  tie: number;
}

type RoomResponse =
  | { event: "room_status"; data: { status: RoomStatus } }
  | { event: "round_status"; data: RoundStatus }
  | { event: "next_status_countdown"; timer: number }
  | { event: "round_result"; data: RoundResult }
  | { event: "next_round_monster"; data: Boss }
  | { event: "room_online_user"; number: number }
  | { event: "sum"; data: number };

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

export const selectRoomUsers = (state: RootState) => state.room.concurrentUsers;
export const selectRoomTotalBet = (state: RootState) => state.room.totalBet;
export const selectRoomRoundStatus = (state: RootState) => state.room.round;

export const selectRoomStream = (state: RootState) => state.room.stream;

let _ws: WebSocket | undefined;

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

    try {
      await dispatch(
        addAssets(toTask({ [`Boss.${boss.id}`]: boss.spine_json }))
      );

      return boss;
    } catch (error) {
      dispatch(system.error);

      return error;
    }
  }),
};

const order = {
  submit: createAsyncThunk<Order, Order, { state: RootState }>(
    "room/order/submit",
    async (order, { getState, dispatch }) => {
      const token = selectToken(getState());
      const _user = selectUser(getState());
      const room_id = selectRoomID(getState());

      invariant(token && _user && room_id, "Unauthorized");

      const options = Object.entries(order)
        .filter(([, value]) => Boolean(value))
        .map(([name, value]) => ({
          cmd: name,
          val: value || 0,
        }));

      try {
        await bet(token, {
          room_id,
          uid: _user.uid,
          options,
        });

        await dispatch(user.sync());

        return order;
      } catch (error) {
        dispatch(system.error(error));

        return error;
      }
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
    async (_, { getState, dispatch }) => {
      const {
        room: { history },
      } = getState();

      await dispatch(order.clear());

      const _order = history[history.length - 1] || {};

      const totalbet =
        Object.values(_order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

      const {
        user: { user: currentUser },
      } = getState();

      invariant(currentUser, "Unauthorized");

      dispatch(user.balance.update(currentUser.balance - totalbet));

      return _order;
    },
    {
      condition: (_, { getState }) => {
        const {
          room: { history },
          user: { user },
        } = getState();

        invariant(user, "Unauthorized");

        if (!history[history.length - 1]) {
          return false;
        }

        const order = history[history.length - 1];

        const totalbet =
          Object.values(order).reduce((sum = 0, bet = 0) => sum + bet, 0) || 0;

        return user.balance >= totalbet;
      },
    }
  ),
};

function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const room = {
  game,
  order,

  status: {
    user: createAction<number>("room/status/user"),
    totalBet: createAction<number>("room/status/totalBet"),
    round: createAction<RoundStatus>("room/status/round"),
  },

  join: createAsyncThunk<
    string,
    string,
    { state: RootState; dispatch: AppDispatch }
  >("room/join", async (roomID, { getState, dispatch }) => {
    const token = selectToken(getState());

    invariant(token, "Unauthorized");

    if (_ws) return roomID;

    const url = new URL(process.env.REACT_APP_WS || "");
    url.searchParams.append("roomID", roomID);
    url.searchParams.append("token", token);

    const ws = new WebSocket(url.toString());

    let hasMessage = false;

    function onMessage(event: MessageEvent) {
      if (event.data === "pong") return;

      if (!isJson(event.data)) return;

      const data = JSON.parse(event.data) as RoomResponse;

      if (data.event === "room_online_user") {
        dispatch(room.status.user(data.number));
      }

      if (data.event === "sum") {
        dispatch(room.status.totalBet(data.data));
      }

      if (data.event === "round_status") {
        dispatch(room.status.round(data.data));
      }

      const status = selectRoomStatusCurrent(getState());
      if (data.event === "room_status" && status !== data.data.status) {
        hasMessage = true;

        const hasSubmitted = selectRoomHasSubmitted(getState());

        if (data.data.status === RoomStatus.Stop) {
          dispatch(user.sync());
        }

        if (data.data.status === RoomStatus.Stop && !hasSubmitted) {
          dispatch(order.clear());
        }

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
    }

    ws.addEventListener("message", onMessage);

    let ping: NodeJS.Timeout | undefined = undefined;
    function onPing() {
      const wait = Number(process.env.REACT_APP_PING_PER_SECONDS) * 1000;

      ping = setInterval(() => {
        if (!ws || ws.readyState !== ws.OPEN) return;

        ws.send("ping");
      }, wait);
    }

    ws.addEventListener("open", onPing, { once: true });

    const reconnectTime =
      Number(process.env.REACT_APP_RE_CONNECT_PER_SECONDS) * 1000;

    const reconnect = setTimeout(() => {
      if (hasMessage) {
        clearTimeout(reconnect);
        return;
      }

      clearTimeout(reconnect);
      dispatch(room.leave());
      dispatch(room.join(roomID));
    }, reconnectTime);

    function onError(error: Event) {
      dispatch(room.leave());
      dispatch(system.error(String(error)));
    }
    ws.addEventListener("error", onError);

    function onClose() {
      reconnect && clearTimeout(reconnect);
      ping && clearInterval(ping);

      ws?.removeEventListener("message", onMessage);
      ws?.removeEventListener("open", onPing);
      ws?.removeEventListener("error", onError);
      ws?.removeEventListener("close", onClose);
    }

    ws.addEventListener("close", onClose);

    return new Promise((resolve) => {
      ws?.addEventListener(
        "open",
        () => {
          _ws = ws;

          return resolve(roomID);
        },
        { once: true }
      );
    });
  }),
  leave: createAsyncThunk("room/leave", async () => {
    _ws?.close();
    _ws = undefined;
  }),

  stream: createAction<void>("room/stream"),
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

  concurrentUsers: number;
  totalBet: number;
  round: RoundStatus;

  stream: boolean;
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

  concurrentUsers: 0,
  totalBet: 0,
  round: {
    player: 0,
    player_pair: 0,
    banker: 0,
    bank_pair: 0,
    tie: 0,
  },

  stream: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(room.status.user, (state, action) => {
        state.concurrentUsers = action.payload;
      })
      .addCase(room.status.round, (state, action) => {
        state.round = action.payload;
      })
      .addCase(room.status.totalBet, (state, action) => {
        state.totalBet = action.payload;
      })
      .addCase(room.join.fulfilled, (state, action) => {
        state.room_id = action.payload;
        state.isJoin = true;
      })
      .addCase(room.leave.fulfilled, (state) => {
        state = initialState;
      })
      .addCase(room.game.status, (state, action) => {
        state.status.current = action.payload;

        if (state.status.current === RoomStatus.Change) {
          state.boss.current = state.boss.stage;
        }

        if (state.status.current === RoomStatus.Result) {
          state.order = {};
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
        state.hasSubmitted = true;

        state.history.push(action.payload);
      })
      .addCase(room.stream, (state, action) => {
        state.stream = !state.stream;
      });
  },
});

export default roomSlice.reducer;
