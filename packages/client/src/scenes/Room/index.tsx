import { Game, UI, useAssetsLoader, useViewport } from "core";
import { Texture } from "pixi.js";
import { Sprite } from "react-pixi-fiber";

import {
  Header,
  Sidebar,
  Control,
  CircleLayout,
  Radian,
  Bet,
  Skill,
} from "components";

import BG from "assets/room/background/fight-bg.png";
import IMG_AVATAR from "assets/profile/avatar.png";
import BET_INFORMATION from "assets/room/background/bet-information.png";
import HISTORY from "assets/room/background/history.png";
import BET_BG from "assets/room/bet/background.png";

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

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col justify-between p-2">
            <div className="w-2/3 mt-8">
              <img src={BET_INFORMATION} alt="bet information" />
            </div>

            <div className="w-full">
              <img src={HISTORY} alt="history frame" />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-row justify-end space-x-4 mt-2">
              <Control />

              <Sidebar />
            </div>

            <div className="relative w-full h-full">
              <div className="w-24 absolute bottom-0 right-0">
                <img src={BET_BG} alt={BET_BG} />
              </div>

              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                <CircleLayout radius={5.2}>
                  <Radian radian={Math.PI * 1.06}>
                    <Bet value={500} />
                  </Radian>

                  <Radian radian={Math.PI * 1.25}>
                    <Bet value={500} active />
                  </Radian>

                  <Radian radian={Math.PI * 1.44}>
                    <Bet value={500} />
                  </Radian>
                </CircleLayout>
              </div>

              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                <CircleLayout radius={8.4}>
                  <Radian radian={Math.PI * 1.15}>
                    <Skill type="blizzard" />
                  </Radian>

                  <Radian radian={Math.PI * 1.33}>
                    <Skill type="flamethrower" />
                  </Radian>
                </CircleLayout>
              </div>

              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                <CircleLayout radius={12}>
                  <Radian radian={Math.PI * 1.35}>
                    <Skill type="flareblitz" />
                  </Radian>

                  <Radian radian={Math.PI * 1.24}>
                    <Skill type="hurricane" />
                  </Radian>

                  <Radian radian={Math.PI * 1.12}>
                    <Skill type="icebeam" />
                  </Radian>
                </CircleLayout>
              </div>
            </div>
          </div>
        </div>
      </UI>
    </>
  );
}
