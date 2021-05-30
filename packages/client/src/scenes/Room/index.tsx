import React from "react";
import { useEffect } from "react";
import { useAppDispatch, BGM, room } from "system";
import { Game, UI } from "layers";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";
import GameEffect from "./Effect";
import Assets from "assets";
import Sound from "assets/sound";

export default function Room() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => void dispatch(room.leave());
  }, [dispatch]);

  useEffect(() => void dispatch(BGM.play(Sound.Room.BGM)), [dispatch]);

  return (
    <>
      <UI className="flex flex-col">
        <img src={Assets.Room.Room_Background} alt="background" />
      </UI>

      <Game className="absolute top-0">
        <GameView />
      </Game>

      <GameUI />

      <GameEffect />

      <GameResult />
    </>
  );
}
