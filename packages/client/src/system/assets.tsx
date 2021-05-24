import { Loader, ILoaderResource } from "pixi.js";
import { Resource } from "resource-loader";
import { SpineParser } from "@pixi-spine/loader-3.8";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "system";
import { Tasks } from "types";

SpineParser.registerLoaderPlugin();

const loader = Loader.shared;

function mapping(res: ILoaderResource) {
  if (res.type === Resource.TYPE.IMAGE && res.texture) {
    return res.texture;
  }

  if (res.type === Resource.TYPE.JSON && res.spritesheet) {
    return res.spritesheet;
  }

  // for spine
  if (res.type === Resource.TYPE.JSON && res.spineData) {
    return res.spineData;
  }
  if (res.type === Resource.TYPE.TEXT && res.extension === "atlas") {
    return res.data;
  }

  if (res.type === Resource.TYPE.TEXT && res.extension === "fnt") {
    return res.data;
  }

  console.log(res);

  throw new Error(
    `Can't load [${res.name} / ${res.url}]: not support this resource type.`
  );
}

const selectLoadedTasks = (state: RootState) => state.assets.loaded;
const selectNotLoadedTasks = (state: RootState, tasks: Tasks) => {
  const loaded = selectLoadedTasks(state);

  const notExist = (name: string) =>
    loaded.every((assets) => assets.name !== name);

  return tasks.filter(({ name }) => notExist(name));
};

export const addAssets = createAsyncThunk<
  Tasks,
  Tasks,
  { dispatch: AppDispatch; state: RootState }
>("assets/add", async (tasks, { getState }) => {
  const newTasks = selectNotLoadedTasks(getState(), tasks);

  await new Promise<void>((resolve) => loader.add(newTasks).load(resolve));

  return newTasks;
});

export interface AssetsState {
  loading: boolean;
  loaded: Tasks;
}

const initialState: AssetsState = {
  loading: false,
  loaded: [],
};

const slice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAssets.fulfilled, (state, { payload: newTasks }) => {
        state.loaded = [...state.loaded, ...newTasks];
        state.loading = false;
      });
  },
});

export const selectAssets = (state: RootState) => state.assets;
export const selectAssetIsLoading = (state: RootState) => state.assets.loading;

function getAssets(name: string) {
  const existed = name in loader.resources;

  if (!existed) throw new Error(`resource name: ${name} not existed`);

  return mapping(loader.resources[name]);
}

export const selectAssetsByName = createSelector(selectAssets, () => getAssets);

export default slice.reducer;
