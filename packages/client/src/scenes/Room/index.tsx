import { Game, UI, useAssetsLoader, useViewport } from "core";
import { Texture } from "pixi.js";
import { Sprite } from "react-pixi-fiber";

import {
  Header,
  Sidebar,
  ConfirmSection,
  BetSection,
  RoomStatus,
} from "components";

import BG from "assets/room/background/fight-bg.png";
import IMG_AVATAR from "assets/profile/avatar.png";
import HISTORY from "assets/room/background/history.png";

function Left() {
  return (
    <div className="flex-1 flex flex-col justify-between p-2">
      <RoomStatus className="w-52 mt-8" />

      <div className="w-full">
        <img src={HISTORY} alt="history frame" />
      </div>
    </div>
  );
}

function Right() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-row justify-end space-x-4 mt-2">
        <ConfirmSection />

        <Sidebar />
      </div>

      <BetSection />
    </div>
  );
}

export function Room() {
  const { width, height } = useViewport();
  const { status, resources } = useAssetsLoader([BG]);

  if (status !== "resolved") {
    return <></>;
  }

  return (
    <>
      <Game>
        <Sprite
          width={width}
          height={height}
          texture={resources[BG] as Texture}
        />
      </Game>

      <UI className="flex flex-col">
        <Header
          avatar={IMG_AVATAR}
          name={"username"}
          level={"LV.42"}
          balance={"666,666,666.66"}
          boss={"美杜莎"}
        />

        <div className="flex-1 flex">
          <Left />

          <Right />
        </div>
      </UI>
    </>
  );
}
