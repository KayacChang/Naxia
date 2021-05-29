import { memo, useEffect } from "react";
import { Sprite } from "@inlet/react-pixi";

import {
  useDungeons,
  useAppDispatch,
  BGM,
  useViewport,
  getAssets,
  Dungeon as DungeonSystem,
  useMap,
} from "system";
import { Game, UI } from "layers";
import {
  Navbar,
  Profile,
  Status,
  Sidebar,
  Switch,
  Route,
  Camera,
  Location,
} from "components";

import Repository from "./Repository";
import Ranking from "./Ranking";
import Achievement from "./Achievement";
import Dungeon from "./Dungeon";
import NPC from "./NPC";

import Store from "./Store";
import Sound from "assets/sound";
import { useRouteMatch } from "react-router";
import { DungeonDetail } from "./Map";

const LobbyUI = memo(() => {
  const isStore = useRouteMatch("/lobby/store");

  return (
    <UI className="flex flex-col">
      <header className="h-12 relative">
        <Profile />

        <Location />

        <Status />
      </header>

      <main className="flex-1 flex justify-end">
        {isStore?.isExact || <NPC />}

        <Switch>
          <Route exact path="/lobby">
            <div className="w-3/5"></div>

            <DungeonDetail />

            {/* {dungeon && (
            <Modal className="z-20">
              {!dungeon.lock ? (
                <DungeonDetail
                  mapID={map.id}
                  dungeonID={dungeon.id}
                  onCancel={() => setDungeon(undefined)}
                />
              ) : (
                <DungeonCondition
                  mapID={map.id}
                  dungeonID={dungeon.id}
                  onConfirm={() => {
                    setShowLockAnim(dungeon.id);
                    setDungeon(undefined);
                    dispatch(Effect.play(Sound.Lobby.Unlock));
                  }}
                  onCancel={() => setDungeon(undefined)}
                />
              )}
            </Modal>
          )} */}
          </Route>

          <Route path="/lobby/repository">
            <Repository className="w-3/5" />
          </Route>

          <Route path="/lobby/achievement">
            <Achievement className="w-3/5" />
          </Route>

          <Route path="/lobby/ranking">
            <Ranking className="w-3/5" />
          </Route>

          <Route path="/lobby/store">
            <Store className="w-full" />
          </Route>
        </Switch>

        <Sidebar className="w-12 mr-2" />
      </main>

      <Navbar />
    </UI>
  );
});

const LobbyView = memo(() => {
  const { width, height } = useViewport();
  const map = useMap();
  const dungeons = useDungeons();
  const dispatch = useAppDispatch();

  return (
    <>
      <Game>
        <Camera screenWidth={width} screenHeight={height}>
          <Sprite texture={getAssets(`Map.${map.id}`)} />

          {dungeons.map((dungeon) => (
            <Dungeon
              key={dungeon.id}
              id={dungeon.id}
              title={dungeon.name}
              x={1920 * (dungeon.location.x / 100)}
              y={1080 * (dungeon.location.y / 100)}
              lock={dungeon.lock}
              onClick={() => dispatch(DungeonSystem.open(dungeon.id))}
            />
          ))}
        </Camera>
      </Game>
    </>
  );
});

export default function Lobby() {
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(BGM.play(Sound.Lobby.BGM)), [dispatch]);

  return (
    <>
      <LobbyView />

      <LobbyUI />
    </>
  );
}
