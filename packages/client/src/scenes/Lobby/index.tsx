import {
  AssetsLoader,
  Game,
  useViewport,
  Switch,
  Route,
  UI,
  Camera,
} from "core";
import { Sprite, Container } from "react-pixi-fiber";
import { Spritesheet, Texture } from "pixi.js";

import {
  Status,
  Profile,
  Navbar,
  Sidebar,
  Location,
  Chatbox,
} from "components";

import Repository from "./Repo";
import Book from "./Book";

import BG from "assets/map.png";
import Tachie from "assets/tachie.png";
import IMG_Avatar from "assets/profile/avatar.png";

function Header() {
  return (
    <header className="h-10">
      <Profile avatar={IMG_Avatar} name="名稱" level="LV.42" />

      <Location value="娜希雅大陸" />

      <Status value="666,666,666.66" />
    </header>
  );
}

function Main() {
  return (
    <main className="flex-1">
      <Switch>
        <Route path="/lobby/repository">
          <Repository />
        </Route>
        <Route path="/lobby/book">
          <Book />
        </Route>
        <Route path="/lobby/rank">Rank</Route>
        <Route path="/lobby/shop">Shop</Route>
      </Switch>
    </main>
  );
}

type MapProps = {
  resources: Record<string, Texture | Spritesheet>;
};
function Map({ resources }: MapProps) {
  const { width, height } = useViewport();

  return (
    <>
      <Camera screenWidth={width} screenHeight={height}>
        <Sprite texture={resources[BG] as Texture} />
      </Camera>

      <Container>
        <Sprite
          y={height}
          anchor={{ x: 0, y: 1 }}
          texture={resources[Tachie] as Texture}
          scale={1 / window.devicePixelRatio}
        />
      </Container>
    </>
  );
}

export function Lobby() {
  return (
    <AssetsLoader tasks={[BG, Tachie]}>
      {({ status, resources }) => {
        if (status !== "resolved") {
          return <></>;
        }

        return (
          <>
            <Game>
              <Map resources={resources} />
            </Game>

            <UI className="flex flex-col">
              <Header />

              <div className="flex-1 flex justify-end">
                <Chatbox from="勝利天使" message="你就是那傳說中的勇者嗎?" />

                <Main />

                <Sidebar />
              </div>

              <Navbar />
            </UI>
          </>
        );
      }}
    </AssetsLoader>
  );
}
