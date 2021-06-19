import { useEffect } from "react";
import {
  useAppDispatch,
  BGM,
  ViewportProvider,
  room,
  useDungeonInfo,
  useAppSelector,
  selectRoomStream,
} from "system";
import { Game, UI } from "layers";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";
import GameEffect from "./Effect";
import Assets from "assets";
import Sound from "assets/sound";
import clsx from "clsx";

function Background() {
  const info = useDungeonInfo();
  const isStream = useAppSelector(selectRoomStream);

  return (
    <UI className="flex flex-col z-0">
      {isStream ? (
        <video className="w-full h-full" autoPlay>
          <source src={info?.stream} />

          <span>Sorry, your browser doesn't support embedded videos.</span>
        </video>
      ) : (
        <img
          src={info?.dungeonImg || Assets.Room.Room_Background}
          alt="background"
        />
      )}
    </UI>
  );
}

export default function Room() {
  const dispatch = useAppDispatch();
  const isStream = useAppSelector(selectRoomStream);
  const info = useDungeonInfo();

  useEffect(() => {
    if (!info) return;

    dispatch(room.join(info.room));

    return () => void dispatch(room.leave());
  }, [dispatch, info]);

  useEffect(() => void dispatch(BGM.play(Sound.Room.BGM)), [dispatch]);

  return (
    <ViewportProvider>
      <Background />

      <Game className={clsx(isStream && "hidden")}>
        <GameView />
      </Game>

      <GameUI />

      <GameEffect />

      <GameResult />
    </ViewportProvider>
  );
}
