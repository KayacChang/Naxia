import { useState } from "react";
import { identity } from "ramda";
import { Sprite, Container, Text } from "react-pixi-fiber";
import { Texture } from "pixi.js";

import { Camera } from "core";
import { Game, UI } from "layers";
import { Assets as IAssets, useDungeon } from "system";
import {
  Modal,
  Navbar,
  Sidebar,
  Profile,
  Location,
  Status,
  Button,
  Road,
} from "components";
import { assets, currency } from "utils";
import { User as IUser, Dungeon as IDungeon, Map as IMap } from "types";

import Assets from "./assets";
import { useHistory } from "react-router";

type DungeonDetailProps = {
  token: string;
  mapID: number;
  dungeonID: number;
  onCancel?: () => void;
};
function DungeonDetail({
  token,
  mapID,
  dungeonID,
  onCancel,
}: DungeonDetailProps) {
  const dungeon = useDungeon(token, mapID, dungeonID);
  const history = useHistory();

  if (!dungeon) return <></>;

  return (
    <div className="flex flex-col h-full relative font-noto text-white">
      <div className="flex mt-8 relative">
        <img src={Assets.Dungeon_Info_Background} alt="info background" />

        <div className="absolute top-0 h-full w-full py-8 flex">
          <div className="w-5/6 h-full flex items-center">
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

          <div className="w-1/3 h-full flex flex-col pl-2 pr-4">
            <div className="mt-1 relative p-3 flex justify-center items-center">
              <img src={Assets.Dungeon_Info_Preview_1} alt="preview" />

              <img
                className="absolute top-0"
                src={Assets.Dungeon_Info_Preview_Frame}
                alt="preview frame"
              />
            </div>

            <div className="relative flex justify-center items-center text-yellow-500">
              <img src={Assets.Dungeon_Info_Name_Frame} alt="name background" />

              <div className="absolute -mb-1">{dungeon.info.name}</div>
            </div>
          </div>
        </div>
      </div>

      <footer className=" absolute bottom-0 flex h-20 text-white ">
        <div className="flex w-1/2 ml-auto mr-8 my-4">
          <Button
            type="img"
            img={Assets.Dungeon_Info_Btn_Back}
            className="relative flex items-center"
            onClick={onCancel}
          >
            <div className="absolute w-full mb-1">{"返回"}</div>
          </Button>

          <Button
            type="img"
            img={Assets.Dungeon_Info_Btn_Join}
            className="relative flex items-center"
            onClick={() => history.push("/room")}
          >
            <div className="absolute w-full mb-1">{"進入場景"}</div>
          </Button>
        </div>
      </footer>
    </div>
  );
}

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

type MapProps = {
  token: string;
  width: number;
  height: number;
  resources: IAssets;
  map: IMap;
  dungeons: IDungeon[];
  user: IUser;
};
export default function Map({
  token,
  width,
  height,
  resources,
  map,
  dungeons,
  user,
}: MapProps) {
  const [dungeonID, setDungeonID] = useState<number | undefined>(undefined);

  return (
    <>
      <Game>
        <Camera screenWidth={width} screenHeight={height}>
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

        <main className="flex-1 flex justify-end space-x-2">
          <div className="w-1/3"></div>

          <section className="flex-1"></section>

          <Sidebar />
        </main>

        <Navbar />

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
      </UI>
    </>
  );
}
