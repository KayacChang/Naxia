import {
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

    return dungeons.reduce((obj, dungeon) => {
      return { ...obj, [`${mapID}.${dungeon.id}`]: dungeon };
    }, {});
  }),
};

export const Dungeon = {
  get: createAsyncThunk<
    { [id: string]: TDungeon },
    { mapID: number; dungeonID: number },
    { state: RootState }
  >("map/dungeon/sync", async ({ mapID, dungeonID }, { getState }) => {
    const token = selectToken(getState());
    invariant(token, "Unauthorized");

    const [conditions, rounds, info] = await Promise.all([
      getConditionsByDungeonID(token, mapID, dungeonID),
      getRoundsByDungeonID(token, mapID, dungeonID),
      getInfoByDungeonID(token, mapID, dungeonID),
    ]);

    return {
      [`${mapID}.${dungeonID}`]: { conditions, rounds, info },
    };
  }),
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
  open: createAsyncThunk<
    number,
    number,
    { state: RootState; dispatch: AppDispatch }
  >("map/dungeon/open", async (dungeonID, { getState, dispatch }) => {
    const map = selectCurrentMap(getState());

    const target = selectDungeonInfos(getState(), map.id, dungeonID);

    if (!target) {
      await dispatch(Dungeon.get({ mapID: map.id, dungeonID }));
    }

    return dungeonID;
  }),
  close: createAsyncThunk("map/dungeon/close", () => {
    return;
  }),
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
  dungeonInfos: { [id: string]: TDungeon };
};

const initialState: MapState = {
  npc: {},
  currentMap: 0,
  maps: [],

  dungeons: {},
  currentDungeon: undefined,
  dungeonInfos: {},
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
      .addCase(Dungeon.get.fulfilled, (state, { payload }) => {
        state.dungeonInfos = { ...state.dungeonInfos, ...payload };
      })
      .addCase(Dungeon.open.fulfilled, (state, { payload }) => {
        state.currentDungeon = payload;
      })
      .addCase(Dungeon.close.fulfilled, (state) => {
        state.currentDungeon = undefined;
      });
  },
});

export const selectDungeonInfos = (
  state: RootState,
  mapID?: number,
  dungeonID?: number
) =>
  mapID && dungeonID
    ? state.map.dungeonInfos[`${mapID}.${dungeonID}`]
    : undefined;

export const selectCurrentMap = (state: RootState) =>
  state.map.maps[state.map.currentMap];

export const selectCurrentDungeon = (state: RootState) =>
  state.map.currentDungeon;

const selectMaps = (state: RootState) => state.map.maps;

const selectNPC = (state: RootState) =>
  state.map.npc[selectCurrentMap(state).id];

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

export function useDungeon() {
  const map = useAppSelector(selectCurrentMap);
  const dungeonID = useAppSelector(selectCurrentDungeon);

  return useAppSelector((state) =>
    selectDungeonInfos(state, map.id, dungeonID)
  );
}
