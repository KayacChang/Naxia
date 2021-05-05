import { useEffect, useState } from "react";
import {
  useAuth,
  useUser,
  useDungeon,
  useMaps,
  join,
  useAppDispatch,
  selectRoomIsJoin,
  useAppSelector,
  leave,
  selectRoomBoss,
  selectAssetIsLoading,
  addAssets,
} from "system";
import { assets, toTask } from "utils";
import { Loading } from "components";
import Assets from "assets";
import { Game } from "layers";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";
import GameEffect from "./Effect";

export default function Room() {
  const dispatch = useAppDispatch();
  const isJoin = useAppSelector(selectRoomIsJoin);
  const loading = useAppSelector(selectAssetIsLoading);
  const boss = useAppSelector(selectRoomBoss);

  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { data: maps } = useMaps(token);
  const dungeon = useDungeon(token, maps?.[0].id, 1);

  useEffect(() => {
    dispatch(join());
    dispatch(addAssets(toTask(Assets.Room)));

    return () => void dispatch(leave());
  }, []);

  if (!token || !user || !items || !dungeon || !isJoin || !boss || loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Game>
        <GameView />
      </Game>

      <GameUI user={user} info={dungeon.info} rounds={dungeon.rounds} />

      <Game className="absolute top-0">
        <GameEffect />
      </Game>

      <GameResult />
    </>
  );
}
