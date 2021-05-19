import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Howl } from "howler";
import { RootState } from "system";
import { Tasks } from "types";

const sounds: { [name: string]: Howl } = {};

export const selectBGM = (state: RootState) => state.sounds.bgm.name;
export const selectBGMVolume = (state: RootState) => state.sounds.bgm.volume;
export const selectEffectVolume = (state: RootState) =>
  state.sounds.effect.volume;

export const addSounds = createAsyncThunk<Tasks, Tasks>(
  "sound/add",
  async (tasks) => {
    await Promise.all(
      tasks.map(({ url }) => {
        const howl = new Howl({ src: [url] });

        return (
          new Promise<void>((resolve) => howl.once("load", resolve))
            //
            .then(() => (sounds[url] = howl))
        );
      })
    );

    return tasks;
  }
);

export const BGM = {
  play: createAsyncThunk<string, string, { state: RootState }>(
    "sound/bgm/play",
    (audio, { getState }) => {
      const volume = selectBGMVolume(getState());

      const sound = sounds[audio];
      sound.play();
      sound.loop(true);
      sound.volume(volume);

      return audio;
    }
  ),
  volume: createAsyncThunk<number, number, { state: RootState }>(
    "sound/bgm/volume",
    (volume, { getState }) => {
      const audio = selectBGM(getState());

      if (audio) {
        const sound = sounds[audio];
        sound.volume(volume);
      }

      return volume;
    }
  ),
};

export const Effect = {
  play: createAsyncThunk<string, string, { state: RootState }>(
    "sound/effect/play",
    (audio, { getState }) => {
      const volume = selectEffectVolume(getState());

      const sound = sounds[audio];
      sound.play();
      sound.volume(volume);

      return audio;
    }
  ),
  volume: createAction<number>("sound/effect/volume"),
};

export interface SoundState {
  bgm: {
    name?: string;
    volume: number;
  };
  effect: {
    volume: number;
  };
  loaded: string[];
}
const initialState: SoundState = {
  bgm: {
    volume: 1,
  },
  effect: {
    volume: 1,
  },
  loaded: [],
};
const slice = createSlice({
  name: "sounds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSounds.fulfilled, (state, { payload }) => {
        state.loaded = [...state.loaded, ...payload.map(({ name }) => name)];
      })
      .addCase(BGM.play.fulfilled, (state, { payload }) => {
        state.bgm.name = payload;
      })
      .addCase(BGM.volume.fulfilled, (state, { payload }) => {
        state.bgm.volume = payload;
      })
      .addCase(Effect.volume, (state, { payload }) => {
        state.effect.volume = payload;
      });
  },
});

export default slice.reducer;
