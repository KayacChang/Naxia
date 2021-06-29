import { memo, useEffect } from "react";
import { Container, Sprite } from "@inlet/react-pixi";
import {
  useDungeons,
  useAppDispatch,
  BGM,
  useViewport,
  getAssets,
  Dungeon as DungeonSystem,
  useMap,
  isMobile,
  ViewportProvider,
  useAppSelector,
  selectToken,
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
  SwapMap,
  Marquee,
  Spine,
  Continue,
} from "components";

import Repository from "./Repository";
import Ranking from "./Ranking";
import Achievement from "./Achievement";
import Dungeon from "./Dungeon";
import NPC from "./NPC";

import Store from "./Store";
import Sound from "assets/sound";
import { matchPath, useHistory } from "react-router";
import { DungeonDetail, DungeonCondition } from "./Map";
import { throttle } from "utils";
import anime from "animejs";
import { getUserNewAchievement } from "api";
import invariant from "tiny-invariant";
import { useState } from "react";
import { Achievement as TAchievement } from "types";
import { useCallback } from "react";

const LobbyUI = memo(() => {
  const map = useMap();
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  return (
    <UI className="flex flex-col">
      <header className={`h-12 relative ${isiPad && "set_iPad_style"}`}>
        <Profile />

        <Location>{map.name}</Location>

        <Status />
      </header>

      <main
        className={`flex-1 flex justify-end relative ${
          isiPad && "set_iPad_style"
        }`}
      >
        <NPC />

        <Switch>
          <Route exact path="/lobby">
            <div className="w-3/5"></div>

            <DungeonDetail />

            <DungeonCondition />
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

        <Sidebar />

        <SwapMap />

        <Marquee />
      </main>

      <Navbar />
    </UI>
  );
});

const Dungeons = memo(() => {
  const dungeons = useDungeons();
  const dispatch = useAppDispatch();

  return (
    <Container>
      {dungeons.map((dungeon) => (
        <Dungeon
          key={dungeon.id}
          id={dungeon.id}
          title={dungeon.name}
          x={1920 * (dungeon.location.x / 100)}
          y={1080 * (dungeon.location.y / 100)}
          lock={dungeon.lock}
          onClick={throttle(300, () => {
            !dungeon.lock
              ? dispatch(DungeonSystem.modal.detail(dungeon.id))
              : dispatch(DungeonSystem.modal.condition(dungeon.id));
          })}
        />
      ))}
    </Container>
  );
});

const LobbyView = () => {
  const { width, height } = useViewport();
  const map = useMap();

  const history = useHistory();
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  return (
    <Game>
      <Camera
        screenWidth={width}
        screenHeight={height}
        mount={(viewport) => {
          function updatePause() {
            const match = matchPath(history.location.pathname, {
              path: "/lobby",
              exact: true,
            });

            viewport.pause = !Boolean(match);
          }

          updatePause();
          history.listen(updatePause);
        }}
      >
        <Sprite
          scale={isMobile() && !isiPad ? 1 : 2}
          texture={getAssets(`Map.${map.id}`)}
        />

        <Dungeons />
      </Camera>
    </Game>
  );
};

function LobbyEffect() {
  const { width, height, scale } = useViewport();

  const [achievements, setAchievements] = useState<TAchievement[]>();
  const [achievement, setAchievement] = useState<TAchievement>();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorized");

    getUserNewAchievement(token).then(([achievement, ...achievements]) => {
      setAchievement(achievement);
      setAchievements(achievements);
    });
  }, [token, setAchievements, setAchievement]);

  const next = useCallback(() => {
    if (!achievements || !achievements.length) {
      setAchievement(undefined);

      return;
    }

    const achievement = achievements.shift();

    if (!achievement) return;

    setAchievement(achievement);
  }, [achievements, setAchievement]);

  if (!achievement) return <></>;

  return (
    <>
      <UI className="bg-black opacity-80 pointer-events-auto" onClick={next}>
        <div className="relative w-full h-full flex justify-center">
          <div
            className="absolute top-1/2 transform -translate-y-1/2 scale-75"
            ref={(ref) => {
              anime({
                targets: ref,
                opacity: [0, 1],
                delay: 1000,
                duration: 300,
                easing: "easeOutCubic",
              });
            }}
          >
            <img src={achievement.img} alt="achievement" />
          </div>

          <Continue text="點擊繼續" className="absolute top-1/4" />
        </div>
      </UI>

      <Game className="pointer-events-none">
        <Spine
          x={width / 2}
          y={height / 2}
          scale={scale}
          data={getAssets(`Achievement_Spine`)}
          mount={(spine) => spine.state.setAnimation(0, "fangda", false)}
        />

        <Sprite
          x={width / 2}
          y={height / 5}
          anchor={0.5}
          scale={scale}
          texture={getAssets("Achievement_Title")}
          ref={(ref) => {
            anime({
              targets: ref,
              alpha: [0, 1],
              delay: 1000,
              duration: 300,
              easing: "easeOutCubic",
            });
          }}
        />
      </Game>
    </>
  );
}

export default function Lobby() {
  const dispatch = useAppDispatch();

  useEffect(() => void dispatch(BGM.play(Sound.Lobby.BGM)), [dispatch]);

  return (
    <ViewportProvider>
      <LobbyView />

      <LobbyUI />

      <LobbyEffect />
    </ViewportProvider>
  );
}
