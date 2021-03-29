import { Game, UI, useAssetsLoader, useViewport } from "core";
import { Texture } from "pixi.js";
import { Sprite } from "react-pixi-fiber";

import { Header, Sidebar, Control } from "components";

import BG from "assets/room/background/fight-bg.png";
import IMG_AVATAR from "assets/profile/avatar.png";
import BET_INFORMATION from "assets/room/background/bet-information.png";
import HISTORY from "assets/room/background/history.png";

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
        />

        <div className="flex-1 flex p-2">
          <div className="flex-1 flex flex-col justify-between">
            <div className="w-2/3 mt-8">
              <img src={BET_INFORMATION} alt="bet information" />
            </div>

            <div className="w-full">
              <img src={HISTORY} alt="history frame" />
            </div>
          </div>

          <div className="flex-1 flex flex-row justify-end space-x-4 mt-2">
            <Control />

            <Sidebar />
          </div>
        </div>
      </UI>
    </>
  );
}
