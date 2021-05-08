import { useEffect, useState } from "react";
import {
  useDungeon,
  useMaps,
  useAppDispatch,
  selectRoomIsJoin,
  useAppSelector,
  selectAssetIsLoading,
  addAssets,
  room,
  useUser,
  selectRoomBossCurrent,
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
  const boss = useAppSelector(selectRoomBossCurrent);

  const user = useUser();

  const { data: maps } = useMaps();
  const dungeon = useDungeon(maps?.[0].id, 1);

  const [backgroundLoad, setBackgroundLoadEnable] = useState(false);

  useEffect(() => {
    if (!dungeon?.info.room) return;

    dispatch(room.join(dungeon.info.room));
    dispatch(addAssets(toTask(Assets.Room)));

    return () => void dispatch(room.leave());
  }, [dungeon?.info.room, dispatch]);

  useEffect(() => {
    if (backgroundLoad || loading) return;

    setBackgroundLoadEnable(Boolean(user && dungeon && isJoin && boss));
  }, [backgroundLoad, loading, user, dungeon, isJoin, boss]);

  if (!backgroundLoad) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Game>
        <GameView />
      </Game>

      <GameUI user={user!} info={dungeon!.info} rounds={dungeon!.rounds} />

      <GameEffect />

      <GameResult />
    </>
  );
}
