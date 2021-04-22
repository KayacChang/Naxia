import { useViewport, Switch, Route } from "core";
import { useAuth, useAssets, useUser, useMaps, useDungeons } from "system";
import { toTask } from "utils";
import Assets from "./assets";
import Map from "./Map";
import { Loading } from "components";

const Tasks = toTask(Assets);

export default function Lobby() {
  const { isCompleted, resources } = useAssets(Tasks);
  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { data: maps } = useMaps(token);
  const { data: dungeons } = useDungeons(token, maps?.[0].id);
  const { width, height } = useViewport();

  if (!isCompleted || !token || !user || !items || !maps || !dungeons) {
    return <Loading></Loading>;
  }

  const map = maps[0];

  return (
    <Switch>
      <Route exact path="/lobby">
        <Map {...{ token, width, height, resources, map, dungeons, user }} />
      </Route>
      <Route path="/lobby/repository"></Route>
      <Route path="/lobby/book"></Route>
      <Route path="/lobby/rank"></Route>
      <Route path="/lobby/shop"></Route>
    </Switch>
  );
}
