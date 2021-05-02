import {
  useAssets,
  useAuth,
  useUser,
  useDungeon,
  useMaps,
  useRoomJoin,
} from "system";
import { assets, toTask } from "utils";
import { Loading } from "components";
import Assets from "assets";

import GameUI from "./UI";
import GameView from "./Game";
import GameResult from "./Result";

export default function Room() {
  useRoomJoin();
  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { data: maps } = useMaps(token);
  const dungeon = useDungeon(token, maps?.[0].id, 1);
  const { isCompleted, resources } = useAssets(
    toTask({ ...Assets.Room, Boss: assets(`/room/gugaiwu1/guaiwu1.json`) })
  );

  if (!isCompleted || !token || !user || !items || !dungeon) {
    return <Loading></Loading>;
  }

  return (
    <>
      <GameView resources={resources} />

      <GameUI user={user} info={dungeon.info} rounds={dungeon.rounds} />

      <GameResult resources={resources} />
    </>
  );
}
