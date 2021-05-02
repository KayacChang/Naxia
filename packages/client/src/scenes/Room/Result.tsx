import { Game, UI } from "layers";
import { Assets as TAssets, useRoomStatus, useRoundResult } from "system";
import { Container, Sprite } from "@inlet/react-pixi";
import { useViewport } from "utils";
import Assets from "assets";
import { RoomStatus, Item } from "types";
import { useEffect } from "react";
import { cond, equals } from "ramda";
import { Texture } from "@pixi/core";

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

type ContinueProps = {
  text: string;
};
function Continue({ text }: ContinueProps) {
  return (
    <div className="w-60 relative flex justify-center items-center">
      <img src={Assets.Room.Result_Continue} alt="continue background" />

      <span className="absolute text-white font-noto text-xl">{text}</span>
    </div>
  );
}

type GameEffectProps = {
  resources: TAssets;
};
export default function GameResult({ resources }: GameEffectProps) {
  const { width, height } = useViewport();
  const status = useRoomStatus();
  const [result, setResult] = useRoundResult();

  useEffect(() => {
    status !== RoomStatus.Result && setResult(undefined);
  }, [status]);

  if (status !== RoomStatus.Result || !result) {
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
              [equals("win"), () => resources["Result_Success"]],
              [equals("lose"), () => resources["Result_Failed"]],
            ])(result.result)}
          />
        </Container>
      </Game>

      <UI
        className="absolute top-0 flex flex-col justify-center items-center pointer-events-auto z-50"
        onClick={() => setResult(undefined)}
      >
        <div className="relative mt-12 flex flex-col items-center space-y-4">
          <div className="relative text-yellow-200">
            <img src={Assets.Room.Result_Frame} alt="result's frame" />

            <div className="absolute top-0 w-full h-full pt-8 flex flex-col justify-center items-center">
              <RewardItems items={result.items} />
            </div>
          </div>

          <Continue text="點擊開始" />
        </div>
      </UI>
    </>
  );
}
