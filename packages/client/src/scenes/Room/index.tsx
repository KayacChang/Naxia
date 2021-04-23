import { Sprite } from "react-pixi-fiber";

import { useViewport, Spine } from "core";
import { Game, UI } from "layers";
import { useAssets, useAuth, useUser, useDungeon, useMaps } from "system";
import { assets, currency, toTask } from "utils";

import {
  Sidebar,
  Profile,
  Location,
  Status,
  Road,
  Button,
  Loading,
} from "components";

import Assets from "./assets";
import RoomStatus from "./RoomStatus";
import BetSection from "./BetSection";
import { useHistory } from "react-router";

export default function Room() {
  const [{ token }] = useAuth();
  const { user, items } = useUser(token);
  const { width, height } = useViewport();
  const { data: maps } = useMaps(token);
  const dungeon = useDungeon(token, maps?.[0].id, 1);

  const { isCompleted, resources } = useAssets(
    toTask({ ...Assets, Boss: assets(`/room/gugaiwu1/guaiwu1.json`) })
  );
  const history = useHistory();

  if (!isCompleted || !token || !user || !items || !dungeon) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Game>
        <Sprite
          width={width}
          height={height}
          texture={resources["Background"]}
        />

        <Spine
          x={width / 2}
          y={height / 2}
          data={resources["Boss"]}
          scale={{
            x: 1 / window.devicePixelRatio,
            y: 1 / window.devicePixelRatio,
          }}
        />
      </Game>

      <UI className="flex flex-col text-white">
        <header className="h-10 relative">
          <Profile
            name={user.name}
            level={`LV.${user.level}`}
            avatar={assets(`/avatar/${user.avatar.padStart(2, "0")}.png`)}
            frame={Assets.Profile}
          />
          <Location frame={Assets.Location} value="娜希雅大陸" />
          <Status frame={Assets.Balance} value={currency(user.balance)} />
        </header>

        <div className="flex-1 flex">
          <div className="w-2/3 flex flex-col justify-between p-2">
            <RoomStatus className="w-52 mt-8" />

            <Button
              type="img"
              img={Assets.Back}
              className="w-8"
              onClick={() => history.replace("/lobby")}
            />

            <Road
              rounds={dungeon.rounds}
              frame={Assets.Road_Frame}
              resultImages={{
                Player: Assets.Road_Blue,
                Banker: Assets.Road_Red,
                Tie: Assets.Road_Blue,
                PlayerPair: Assets.Road_Blue,
                BankPair: Assets.Road_Red,
              }}
            />
          </div>

          <div className="w-1/3 flex flex-col">
            <div className="flex flex-row justify-end space-x-4 mt-2">
              <div className="space-y-2 flex flex-col font-noto w-24">
                <Button
                  type="img"
                  img={Assets.Control_Confirm_Normal}
                  className="relative flex justify-end items-center"
                >
                  <div className="absolute px-4">{"確認"}</div>
                </Button>

                <Button
                  type="img"
                  img={Assets.Control_Cancel_Normal}
                  className="relative flex justify-end items-center"
                >
                  <div className="absolute px-4">{"歸零"}</div>
                </Button>

                <Button
                  type="img"
                  img={Assets.Control_Redo_Normal}
                  className="relative flex justify-end items-center"
                >
                  <div className="absolute px-4">{"重複"}</div>
                </Button>
              </div>

              <Sidebar className="w-12" />
            </div>

            <BetSection />
          </div>
        </div>
      </UI>
    </>
  );
}
