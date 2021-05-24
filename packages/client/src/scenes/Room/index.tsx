import { useEffect, useState } from "react";
import {
  useDungeon,
  useMaps,
  useAppDispatch,
  selectRoomIsJoin,
  useAppSelector,
  selectAssetIsLoading,
  room,
  useUser,
  selectRoomBossCurrent,
} from "system";
import { Loading } from "components";
import { Game, UI } from "layers";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";
import GameEffect from "./Effect";
import Assets from "assets";

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

    return () => void dispatch(room.leave());
  }, [dungeon?.info.room, dispatch]);

  useEffect(() => {
    if (backgroundLoad || loading) return;

    setBackgroundLoadEnable(Boolean(user && dungeon && isJoin && boss));
  }, [backgroundLoad, loading, user, dungeon, isJoin, boss]);

  if (!backgroundLoad) {
    return <Loading></Loading>;
  }

  if (!user || !dungeon || !boss) {
    return <Loading />;
  }

  return (
    <>
      <UI className="flex flex-col">
        <img src={Assets.Room.Room_Background} alt="background" />
      </UI>

      <Game className="absolute top-0">
        <GameView />
      </Game>

      <GameUI
        user={user}
        info={dungeon.info}
        rounds={dungeon.rounds}
        boss={boss}
      />

      <GameEffect />

      <GameResult />
    </>
  );
}
