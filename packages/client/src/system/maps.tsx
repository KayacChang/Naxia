import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getAllDungeonsInMap,
  getAllMaps,
  getConditionsByDungeonID,
  getInfoByDungeonID,
  getNPCInMap,
  getRoundsByDungeonID,
  unlock,
} from "api";
import { AppDispatch, RootState, useAppSelector } from "system";
import invariant from "tiny-invariant";
import {
  Condition,
  Round,
  Map as TMap,
  Dungeon as IDungeon,
  NPC,
  DungeonInfo,
} from "types";
import { selectToken } from "./user";

export const Map = {
  all: createAsyncThunk<TMap[], void, { state: RootState }>(
    "map/all",
    (_, { getState }) => {
      const token = selectToken(getState());
      invariant(token, "Unauthorized");

      return getAllMaps(token);
    }
  ),
  npc: createAsyncThunk<{ [id: string]: NPC }, number, { state: RootState }>(
    "map/npc",
    async (mapID, { getState }) => {
      const token = selectToken(getState());
      invariant(token, "Unauthorized");

      const npc = await getNPCInMap(token, mapID);

      return { [mapID]: npc };
    }
  ),
  dungeons: createAsyncThunk<
    { [id: string]: IDungeon },
    number,
    { state: RootState }
  >("map/dungeons", async (mapID, { getState }) => {
    const token = selectToken(getState());
    invariant(token, "Unauthorized");

    const dungeons = await getAllDungeonsInMap(token, mapID);

    return dungeons.reduce(
      (obj, dungeon) => ({ ...obj, [`${mapID}.${dungeon.id}`]: dungeon }),
      {}
    );
  }),
};

export const Dungeon = {
  get: {
    conditions: createAsyncThunk<
      { [id: string]: Condition[] },
      { mapID: number; dungeonID: number },
      { state: RootState }
    >(
      "map/dungeon/get/conditions",
      async ({ mapID, dungeonID }, { getState }) => {
        const token = selectToken(getState());
        invariant(token, "Unauthorized");

        const conditions = await getConditionsByDungeonID(
          token,
          mapID,
          dungeonID
        );

        return { [`${mapID}.${dungeonID}`]: conditions };
      }
    ),

    rounds: createAsyncThunk<
      { [id: string]: Round[] },
      { mapID: number; dungeonID: number },
      { state: RootState }
    >("map/dungeon/get/rounds", async ({ mapID, dungeonID }, { getState }) => {
      const token = selectToken(getState());
      invariant(token, "Unauthorized");

      const rounds = await getRoundsByDungeonID(token, mapID, dungeonID);

      return { [`${mapID}.${dungeonID}`]: rounds };
    }),

    info: createAsyncThunk<
      { [id: string]: DungeonInfo },
      { mapID: number; dungeonID: number },
      { state: RootState }
    >("map/dungeon/get/info", async ({ mapID, dungeonID }, { getState }) => {
      const token = selectToken(getState());
      invariant(token, "Unauthorized");

      const info = await getInfoByDungeonID(token, mapID, dungeonID);

      return { [`${mapID}.${dungeonID}`]: info };
    }),
  },

  unlock: createAsyncThunk<
    void,
    { mapID: number; dungeonID: number },
    { state: RootState; dispatch: AppDispatch }
  >(
    "map/dungeon/unlock",
    async ({ mapID, dungeonID }, { getState, dispatch }) => {
      const token = selectToken(getState());
      invariant(token, "Unauthorized");

      await unlock(token, mapID, dungeonID);

      await dispatch(Map.dungeons(mapID));
    }
  ),

  anim: {
    play: createAction<number>("map/dungeon/anim/play"),
    clear: createAction("map/dungeon/anim/stop"),
  },

  modal: {
    condition: createAsyncThunk<
      number,
      number,
      { state: RootState; dispatch: AppDispatch }
    >(
      "map/dungeon/modal/condition",
      async (dungeonID, { getState, dispatch }) => {
        const map = selectCurrentMap(getState());

        await Promise.all([
          dispatch(Dungeon.get.info({ mapID: map.id, dungeonID })),
          dispatch(Dungeon.get.conditions({ mapID: map.id, dungeonID })),
        ]);

        return dungeonID;
      }
    ),

    detail: createAsyncThunk<
      number,
      number,
      { state: RootState; dispatch: AppDispatch }
    >("map/dungeon/modal/detail", async (dungeonID, { getState, dispatch }) => {
      const map = selectCurrentMap(getState());

      await Promise.all([
        dispatch(Dungeon.get.info({ mapID: map.id, dungeonID })),
        dispatch(Dungeon.get.rounds({ mapID: map.id, dungeonID })),
        dispatch(Dungeon.get.conditions({ mapID: map.id, dungeonID })),
      ]);

      return dungeonID;
    }),

    close: createAsyncThunk("map/dungeon/close", () => {
      return;
    }),
  },
};

export type TDungeon = {
  conditions: Condition[];
  rounds: Round[];
  info: DungeonInfo;
};

type MapState = {
  npc: { [id: string]: NPC };
  currentMap: number;
  maps: TMap[];
  dungeons: { [id: string]: IDungeon };

  currentDungeon?: number;

  unlockAnim?: number;

  infos: { [id: string]: DungeonInfo };
  conditions: { [id: string]: Condition[] };
  rounds: { [id: string]: Round[] };
};

const initialState: MapState = {
  npc: {},
  currentMap: 0,
  maps: [],

  dungeons: {},
  currentDungeon: undefined,

  unlockAnim: undefined,

  infos: {},
  conditions: {},
  rounds: {},
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Map.all.fulfilled, (state, { payload }) => {
        state.maps = payload;
      })
      .addCase(Map.npc.fulfilled, (state, { payload }) => {
        state.npc = { ...state.npc, ...payload };
      })
      .addCase(Map.dungeons.fulfilled, (state, { payload }) => {
        state.dungeons = { ...state.dungeons, ...payload };
      })
      .addCase(Dungeon.anim.play, (state, { payload }) => {
        state.unlockAnim = payload;
      })
      .addCase(Dungeon.anim.clear, (state) => {
        state.unlockAnim = undefined;
      })
      .addCase(Dungeon.get.conditions.fulfilled, (state, { payload }) => {
        state.conditions = { ...state.conditions, ...payload };
      })
      .addCase(Dungeon.get.info.fulfilled, (state, { payload }) => {
        state.infos = { ...state.infos, ...payload };
      })
      .addCase(Dungeon.get.rounds.fulfilled, (state, { payload }) => {
        state.rounds = { ...state.rounds, ...payload };
      })
      .addCase(Dungeon.modal.condition.fulfilled, (state, { payload }) => {
        state.currentDungeon = payload;
      })
      .addCase(Dungeon.modal.detail.fulfilled, (state, { payload }) => {
        state.currentDungeon = payload;
      })
      .addCase(Dungeon.modal.close.fulfilled, (state) => {
        state.currentDungeon = undefined;
      });
  },
});

export const selectDungeonInfo = (
  state: RootState,
  mapID: number,
  dungeonID?: number
) => (dungeonID ? state.map.infos[`${mapID}.${dungeonID}`] : undefined);

export const selectDungeonRounds = (
  state: RootState,
  mapID: number,
  dungeonID?: number
) => (dungeonID ? state.map.rounds[`${mapID}.${dungeonID}`] : undefined);

export const selectDungeonConditions = (
  state: RootState,
  mapID: number,
  dungeonID?: number
) => (dungeonID ? state.map.conditions[`${mapID}.${dungeonID}`] : undefined);

export const selectCurrentMap = (state: RootState) =>
  state.map.maps[state.map.currentMap];

export const selectCurrentDungeon = (state: RootState) =>
  state.map.currentDungeon;

const selectMaps = (state: RootState) => state.map.maps;

const selectNPC = (state: RootState) =>
  state.map.npc[selectCurrentMap(state).id];

export const selectUnlockAnim = (state: RootState) => state.map.unlockAnim;

const selectDungeons = createSelector(
  [
    (state: RootState) => state.map.dungeons,
    (_: RootState, mapID: number) => mapID,
  ],
  (dungeons, mapID) =>
    Object.entries(dungeons)
      .filter(([key]) => key.split(".")[0] === String(mapID))
      .map(([, dungeon]) => dungeon)
);

export default mapSlice.reducer;

export function useMaps() {
  const maps = useAppSelector(selectMaps);

  return maps.length ? maps : undefined;
}

export function useMap() {
  return useAppSelector(selectCurrentMap);
}

export function useNPC() {
  return useAppSelector(selectNPC);
}

export function useDungeons() {
  const map = useAppSelector(selectCurrentMap);
  return useAppSelector((state) => selectDungeons(state, map.id));
}

export function useDungeonInfo() {
  const map = useAppSelector(selectCurrentMap);
  const dungeonID = useAppSelector(selectCurrentDungeon);

  return useAppSelector((state) => selectDungeonInfo(state, map.id, dungeonID));
}

export function useDungeonRounds() {
  const map = useAppSelector(selectCurrentMap);
  const dungeonID = useAppSelector(selectCurrentDungeon);

  return useAppSelector((state) =>
    selectDungeonRounds(state, map.id, dungeonID)
  );
}

export function useDungeonConditions() {
  const map = useAppSelector(selectCurrentMap);
  const dungeonID = useAppSelector(selectCurrentDungeon);

  return useAppSelector((state) =>
    selectDungeonConditions(state, map.id, dungeonID)
  );
}

export function useDungeon() {
  const map = useAppSelector(selectCurrentMap);
  const dungeonID = useAppSelector(selectCurrentDungeon);

  const info = useAppSelector((state) =>
    selectDungeonInfo(state, map.id, dungeonID)
  );
  const conditions = useAppSelector((state) =>
    selectDungeonConditions(state, map.id, dungeonID)
  );
  const rounds = useAppSelector((state) =>
    selectDungeonRounds(state, map.id, dungeonID)
  );

  return {
    info,
    conditions,
    rounds,
  };
}
