import { useEffect } from "react";
import {
  useAppDispatch,
  BGM,
  ViewportProvider,
  room,
  useDungeonInfo,
} from "system";
import { Game, UI } from "layers";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";
import GameEffect from "./Effect";
import Assets from "assets";
import Sound from "assets/sound";

export default function Room() {
  const dispatch = useAppDispatch();
  const info = useDungeonInfo();

  useEffect(() => {
    if (!info) return;

    dispatch(room.join(info.room));

    return () => void dispatch(room.leave());
  }, [dispatch, info]);

  useEffect(() => void dispatch(BGM.play(Sound.Room.BGM)), [dispatch]);

  return (
    <ViewportProvider>
      <UI className="flex flex-col">
        <img src={Assets.Room.Room_Background} alt="background" />
      </UI>

      <Game className="fixed top-0">
        <GameView />
      </Game>

      <GameUI />

      <GameEffect />

      <GameResult />
    </ViewportProvider>
  );
}
