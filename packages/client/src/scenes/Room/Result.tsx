import { Game, UI } from "layers";
import {
  selectAssetsByName,
  selectRoomResult,
  selectRoomStatus,
  useAppSelector,
} from "system";
import { Container, Sprite } from "@inlet/react-pixi";
import { useViewport, wait } from "utils";
import Assets from "assets";
import { Item, RoomStatus } from "types";
import { useEffect, useState } from "react";
import { cond, equals } from "ramda";
import { Texture } from "@pixi/core";
import { Continue } from "./Continue";

type RewardItemsProps = {
  items: Item[];
};
function RewardItems({ items }: RewardItemsProps) {
  return (
    <div className="flex space-x-8">
      {items.map(({ id, count, img }) => (
        <div key={id} className="flex flex-col items-center">
          <div className="w-16 relative flex justify-center items-center overflow-hidden">
            <img src={Assets.Lobby.Repo_Item_Epic} alt="frame" />

            <img className="absolute" src={img} alt="item" />
          </div>

          <div className="flex text-xl">
            <span>x</span>

            <span>{count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GameResult() {
  const { width, height } = useViewport();

  const { current: status } = useAppSelector(selectRoomStatus);
  const assets = useAppSelector(selectAssetsByName);
  const result = useAppSelector(selectRoomResult);
  const [currentResult, setCurrentResult] = useState<typeof result>();

  useEffect(() => {
    if (status !== RoomStatus.Start) setCurrentResult(undefined);

    if (status === RoomStatus.Result) {
      wait(3000).then(() => setCurrentResult(result));
    }
  }, [status, result]);

  if (!currentResult) {
    return <></>;
  }

  return (
    <>
      <Game className="absolute top-0" options={{ backgroundAlpha: 0.5 }}>
        <Container x={width / 2} y={height / 2}>
          <Sprite
            y={-20}
            anchor={0.5}
            scale={1 / window.devicePixelRatio}
            texture={cond<string, Texture>([
              [equals("win"), () => assets("Result_Success")],
              [equals("lose"), () => assets("Result_Failed")],
            ])(currentResult!.result)}
          />
        </Container>
      </Game>

      <UI
        className="absolute top-0 flex flex-col justify-center items-center pointer-events-auto z-40"
        onClick={() => setCurrentResult(undefined)}
      >
        <div className="relative mt-12 flex flex-col items-center space-y-4">
          <div className="relative text-yellow-200">
            <img src={Assets.Room.Result_Frame} alt="result's frame" />

            <div className="absolute top-0 w-full h-full pt-8 flex flex-col justify-center items-center">
              <RewardItems items={currentResult!.items} />
            </div>
          </div>

          <Continue text="點擊開始" />
        </div>
      </UI>
    </>
  );
}
