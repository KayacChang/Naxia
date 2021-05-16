import { useState } from "react";
import { identity } from "ramda";
import { useRouteMatch } from "react-router";
import { Sprite, Container, Text } from "@inlet/react-pixi";
import clsx from "clsx";

import {
  useMaps,
  useDungeons,
  useAppSelector,
  selectAssetsByName,
  selectUser,
  selectUserItems,
} from "system";
import { useViewport, currency } from "utils";
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
  Spine,
} from "components";

import { DungeonDetail, DungeonCondition } from "./Map";
import Repository from "./Repository";
import Ranking from "./Ranking";

import Store from "./Store";
import { filters } from "pixi.js";
import { Dungeon as TDungeon } from "types";

type DungeonProps = {
  id: number;
  title: string;
  x: number;
  y: number;
  lock?: boolean;
  onClick?: () => void;
  showLockAnim?: boolean;
  onClear?: () => void;
};
function Dungeon({
  id,
  x,
  y,
  title,
  lock,
  onClick,
  showLockAnim = false,
  onClear,
}: DungeonProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const assets = useAppSelector(selectAssetsByName);

  const colorMatrix = new filters.ColorMatrixFilter();
  colorMatrix.blackAndWhite(true);

  return (
    <Container
      x={x}
      y={y}
      interactive={true}
      buttonMode={true}
      pointerdown={onClick || identity}
    >
      <Container filters={lock ? [colorMatrix] : []}>
        <Sprite
          ref={(ref) => {
            setWidth(ref?.width || 0);
            setHeight(ref?.height || 0);
          }}
          texture={assets(`Dungeon_${id}`)}
        />

        <Sprite x={-68} y={-16} texture={assets("Dungeon_Frame")} />
      </Container>

      {lock && (
        <Sprite
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          texture={assets("Lock")}
        />
      )}

      {showLockAnim && (
        <Spine
          x={width / 2}
          y={height / 2}
          data={assets("Lock_Anim")}
          mount={(spine) => {
            spine.state.setAnimation(0, "animation", false);
            spine.state.addListener({
              complete: onClear,
            });
          }}
        />
      )}

      <Text
        anchor={{ x: 0.5, y: 0 }}
        x={width / 2}
        y={202}
        style={{
          fill: lock ? ["#ffffff"] : ["#fef3c7", "#fde68a", "#fbbf24"],
          fontFamily: "kai",
        }}
        text={title}
      />
    </Container>
  );
}

export default function Lobby() {
  const assets = useAppSelector(selectAssetsByName);
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectUserItems);

  const { data: maps } = useMaps();
  const map = maps?.[0];

  const { data: dungeons } = useDungeons(map?.id);

  const { width, height } = useViewport();
  const [dungeon, setDungeon] = useState<TDungeon | undefined>(undefined);
  const [showLockAnimID, setShowLockAnim] = useState<number | undefined>(
    undefined
  );

  const matchLobby = useRouteMatch("/lobby");
  const matchStory = useRouteMatch("/lobby/store");

  if (!user || !items || !map || !dungeons) {
    return <Loading />;
  }

  return (
    <>
      <Game className={clsx(matchLobby?.isExact || "pointer-events-none")}>
        <Camera
          screenWidth={width}
          screenHeight={height}
          pause={!matchLobby?.isExact}
        >
          <Sprite texture={assets("Map")} />

          {dungeons.map((dungeon) => (
            <Dungeon
              key={dungeon.id}
              id={dungeon.id}
              title={dungeon.name}
              x={1920 * (dungeon.location.x / 100)}
              y={1080 * (dungeon.location.y / 100)}
              onClick={() => setDungeon(dungeon)}
              lock={dungeon.lock}
              showLockAnim={showLockAnimID === dungeon.id}
              onClear={() => setShowLockAnim(undefined)}
            />
          ))}
        </Camera>
      </Game>

      <UI className="flex flex-col">
        <header className="h-12 relative">
          <Profile user={user} />
          <Location value={matchStory?.isExact ? "兌換商店" : map.name} />
          <Status value={currency(user.balance)} />
        </header>

        <main className="flex-1 flex justify-end">
          <Switch>
            <Route exact path="/lobby">
              {dungeon && (
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
                      }}
                      onCancel={() => setDungeon(undefined)}
                    />
                  )}
                </Modal>
              )}
            </Route>
            <Route path="/lobby/repository">
              <Repository items={items} className="w-3/5" />
            </Route>
            <Route path="/lobby/book"></Route>

            <Route path="/lobby/ranking">
              <Ranking className=" w-3/5" />
            </Route>

            <Route path="/lobby/store">
              <Store className="w-full" />
            </Route>
          </Switch>

          <Sidebar className="w-12 mr-2" />
        </main>

        <Navbar />
      </UI>
    </>
  );
}
