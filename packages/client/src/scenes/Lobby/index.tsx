import { Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { identity } from "ramda";
import { useRouteMatch } from "react-router";
import { Sprite, Container, Text } from "@inlet/react-pixi";
import clsx from "clsx";

import {
  useAuth,
  useUser,
  useMaps,
  useDungeons,
  useAppSelector,
  selectAssetIsLoading,
  selectAssetsByName,
  useAppDispatch,
  addAssets,
} from "system";
import { useViewport, currency, toTask } from "utils";
import { Game, UI } from "layers";
import {
  Modal,
  Loading,
  Navbar,
  Profile,
  Location,
  Status,
  Sidebar,
  Switch,
  Route,
  Camera,
} from "components";

import Assets from "assets";

import { DungeonDetail } from "./Map";
import Repository from "./Repository";

type DungeonProps = {
  frame: Texture;
  img: Texture;
  title: string;
  x: number;
  y: number;
  onClick?: () => void;
};
function Dungeon({ x, y, frame, img, title, onClick }: DungeonProps) {
  const [imageWidth, setImageWidth] = useState(0);

  return (
    <Container
      x={x}
      y={y}
      interactive={true}
      buttonMode={true}
      pointerdown={onClick || identity}
    >
      <Sprite ref={(ref) => setImageWidth(ref?.width || 0)} texture={img} />

      <Sprite x={-68} y={-16} texture={frame} />

      <Text
        anchor={{ x: 0.5, y: 0 }}
        x={imageWidth / 2}
        y={202}
        style={{ fill: "#ffffff" }}
        text={title}
      />
    </Container>
  );
}

export default function Lobby() {
  const loading = useAppSelector(selectAssetIsLoading);
  const assets = useAppSelector(selectAssetsByName);
  const dispatch = useAppDispatch();

  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { data: maps } = useMaps(token);

  const map = maps?.[0];

  const { data: dungeons } = useDungeons(token, map?.id);

  const { width, height } = useViewport();
  const [dungeonID, setDungeonID] = useState<number | undefined>(undefined);
  const match = useRouteMatch("/lobby");

  useEffect(() => {
    dispatch(addAssets(toTask(Assets.Lobby)));
  }, []);

  if (loading || !token || !user || !items || !map || !dungeons) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Game className={clsx(match?.isExact || "pointer-events-none")}>
        <Camera
          screenWidth={width}
          screenHeight={height}
          pause={!match?.isExact}
        >
          <Sprite texture={assets("Map")} />

          {dungeons.map((dungeon) => (
            <Dungeon
              key={dungeon.id}
              x={1920 * (dungeon.location.x / 100)}
              y={1080 * (dungeon.location.y / 100)}
              frame={assets("Dungeon_Frame")}
              img={assets(`Dungeon_${dungeon.id}`)}
              title={dungeon.name}
              onClick={() => setDungeonID(dungeon.id)}
            />
          ))}
        </Camera>
      </Game>

      <UI className="flex flex-col">
        <header className="h-12 relative z-50">
          <Profile user={user} />
          <Location value="娜希雅大陸" />
          <Status value={currency(user.balance)} />
        </header>

        <main className="flex-1 flex justify-end space-x-2">
          <Switch>
            <Route exact path="/lobby">
              {dungeonID && (
                <Modal className="z-20">
                  <DungeonDetail
                    token={token}
                    mapID={map.id}
                    dungeonID={dungeonID}
                    onCancel={() => setDungeonID(undefined)}
                  />
                </Modal>
              )}
            </Route>
            <Route path="/lobby/repository">
              <Repository items={items} className=" w-3/5" />
            </Route>
            <Route path="/lobby/book"></Route>
            <Route path="/lobby/rank"></Route>
            <Route path="/lobby/shop"></Route>
          </Switch>

          <Sidebar className="w-12" />
        </main>

        <Navbar />
      </UI>
    </>
  );
}
