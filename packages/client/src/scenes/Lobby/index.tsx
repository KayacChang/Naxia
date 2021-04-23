import { Texture } from "pixi.js";
import { useState } from "react";
import { identity } from "ramda";
import { useHistory, useRouteMatch } from "react-router";
import { Sprite, Container, Text } from "react-pixi-fiber";

import { useViewport, Switch, Route, Camera } from "core";
import { useAuth, useAssets, useUser, useMaps, useDungeons } from "system";
import { toTask } from "utils";
import { Game, UI } from "layers";
import {
  Modal,
  Loading,
  Navbar,
  Profile,
  Location,
  Status,
  Sidebar,
} from "components";
import { assets, currency } from "utils";

import Assets from "./assets";
import { DungeonDetail } from "./Map";
import Repository from "./Repository";
import clsx from "clsx";

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

  const textPos = imageWidth / 2;

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
        x={textPos}
        y={202}
        style={{ fill: "#ffffff" }}
        text={title}
      />
    </Container>
  );
}

const Tasks = toTask(Assets);

export default function Lobby() {
  const { isCompleted, resources } = useAssets(Tasks);
  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { data: maps } = useMaps(token);
  const { data: dungeons } = useDungeons(token, maps?.[0].id);
  const { width, height } = useViewport();
  const [dungeonID, setDungeonID] = useState<number | undefined>(undefined);
  const match = useRouteMatch("/lobby");

  if (!isCompleted || !token || !user || !items || !maps || !dungeons) {
    return <Loading></Loading>;
  }

  const map = maps[0];

  return (
    <>
      <Game className={clsx(match?.isExact || "pointer-events-none")}>
        <Camera
          screenWidth={width}
          screenHeight={height}
          pause={!match?.isExact}
        >
          <Sprite texture={resources["Map"]} />

          {dungeons.map((dungeon) => (
            <Dungeon
              key={dungeon.id}
              x={1920 * (dungeon.location.x / 100)}
              y={1080 * (dungeon.location.y / 100)}
              frame={resources["Dungeon_Frame"]}
              img={resources[`Dungeon_${dungeon.id}`]}
              title={dungeon.name}
              onClick={() => setDungeonID(dungeon.id)}
            />
          ))}
        </Camera>
      </Game>

      <UI className="flex flex-col">
        <header className="h-12 relative">
          <Profile
            name={user.name}
            level={`LV.${user.level}`}
            avatar={assets(`/avatar/${user.avatar.padStart(2, "0")}.png`)}
            frame={Assets.Profile}
          />
          <Location frame={Assets.Location} value="娜希雅大陸" />
          <Status frame={Assets.Balance} value={currency(user.balance)} />
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
