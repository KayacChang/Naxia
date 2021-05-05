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
import { toTask } from "utils";
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

  const [backgroundLoad, setBackgroundLoadEnable] = useState(false);

  useEffect(() => {
    dispatch(join());
    dispatch(addAssets(toTask(Assets.Room)));

    return () => void dispatch(leave());
  }, []);

  useEffect(() => {
    if (backgroundLoad || loading) return;

    setBackgroundLoadEnable(
      Boolean(token && user && items && dungeon && isJoin && boss)
    );
  }, [backgroundLoad, loading, token, user, items, dungeon, isJoin, boss]);

  if (!backgroundLoad) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Game>
        <GameView />
      </Game>

      <GameUI user={user} info={dungeon!.info} rounds={dungeon!.rounds} />

      <GameEffect />

      <GameResult />
    </>
  );
}
