import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDungeonsInMap,
  getAllMaps,
  getConditionsByDungeonID,
  getInfoByDungeonID,
  getNPCInMap,
  getRoundsByDungeonID,
  unlock,
} from "api";
import { useEffect, useMemo } from "react";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "system";
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
  npc: createAsyncThunk<
    { [id: string]: NPC },
    { mapID: number },
    { state: RootState }
  >("map/npc", async ({ mapID }, { getState }) => {
    const token = selectToken(getState());
    invariant(token, "Unauthorized");

    const npc = await getNPCInMap(token, mapID);

    return { [mapID]: npc };
  }),
  dungeons: createAsyncThunk<
    { [id: string]: IDungeon },
    { mapID: number },
    { state: RootState }
  >("map/dungeons", async ({ mapID }, { getState }) => {
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

      await dispatch(Map.dungeons({ mapID }));
    }
  ),
};

export type TDungeon = {
  conditions: Condition[];
  rounds: Round[];
  info: DungeonInfo;
};

type MapState = {
  npc: { [id: string]: NPC };
  maps: TMap[];
  dungeons: { [id: string]: IDungeon };
  dungeonInfos: { [id: string]: TDungeon };
};

const initialState: MapState = {
  npc: {},
  maps: [],
  dungeons: {},
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
      });
  },
});

const selectMaps = (state: RootState) => state.map.maps;
const selectDungeons = (state: RootState) => state.map.dungeons;
const selectDungeonInfos = (state: RootState) => state.map.dungeonInfos;
const selectNPC = (state: RootState) => state.map.npc;

export default mapSlice.reducer;

export function useMaps() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Map.all());
  }, [dispatch]);

  const maps = useAppSelector(selectMaps);

  return maps.length ? maps : undefined;
}

export function useNPC(mapID?: number) {
  const dispatch = useAppDispatch();
  const map = useAppSelector(selectNPC);

  useEffect(() => {
    if (!mapID) return;

    dispatch(Map.npc({ mapID }));
  }, [dispatch, mapID]);

  if (!mapID) return;

  return map[mapID];
}

export function useDungeons(mapID?: number) {
  const dispatch = useAppDispatch();
  const dungeons = useAppSelector(selectDungeons);

  useEffect(() => {
    if (!mapID) return;

    dispatch(Map.dungeons({ mapID }));
  }, [dispatch, mapID]);

  if (!mapID) return;

  return Object.entries(dungeons)
    .filter(([key]) => key.split(".")[0] === String(mapID))
    .map(([, dungeon]) => dungeon);
}

export function useDungeon(mapID?: number, dungeonID?: number) {
  const dispatch = useAppDispatch();
  const dungeons = useAppSelector(selectDungeonInfos);

  useEffect(() => {
    if (!mapID || !dungeonID) return;

    dispatch(Dungeon.get({ mapID, dungeonID }));
  }, [mapID, dungeonID, dispatch]);

  const dungeon = useMemo(() => {
    if (!mapID || !dungeonID) return;

    return dungeons[`${mapID}.${dungeonID}`];
  }, [mapID, dungeonID, dungeons]);

  return dungeon;
}
