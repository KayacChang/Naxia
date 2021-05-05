import { Sprite, BitmapText, Container, Text } from "@inlet/react-pixi";
import {
  SkeletonData,
  useAppSelector,
  selectRoomStatus,
  selectRoomStatusCurrent,
  selectAssetsByName,
  selectRoomBoss,
} from "system";
import { useViewport } from "utils";
import { Spine } from "components";
import { RoomStatus } from "types";
import { cond, SafePred } from "ramda";
import { Texture } from "@pixi/core";
import { Spine as TSpine } from "@pixi-spine/all-3.8";
import anime from "animejs";

type CountDownProps = {
  x: number;
  y: number;
  texture: Texture;
};
function CountDown({ x, y, texture }: CountDownProps) {
  const { current: status, countdown } = useAppSelector(selectRoomStatus);

  if (status !== RoomStatus.Start) {
    return <Container></Container>;
  }

  return (
    <Container x={x} y={y}>
      <Sprite y={18} scale={0.4} anchor={0.5} texture={texture} />

      <BitmapText
        anchor={0.5}
        text={String(countdown)}
        style={{ fontName: "countdown", fontSize: 9 }}
      />
    </Container>
  );
}

type BossProps = {
  x: number;
  y: number;
  data: SkeletonData;
};
function Boss({ x, y, data }: BossProps) {
  const status = useAppSelector(selectRoomStatusCurrent);

  return (
    <Spine
      x={x}
      y={y}
      data={data}
      scale={1 / window.devicePixelRatio}
      ref={(ref: TSpine | null) => {
        if (!ref) return;

        console.log(ref);

        if (status === RoomStatus.Change) {
          anime({
            targets: ref,
            alpha: [0, 1],
            duration: 1000,
            easing: "easeInCubic",
          });

          return;
        }

        if (status === RoomStatus.Result) {
          anime({
            targets: ref,
            alpha: [1, 0],
            delay: 2000,
            duration: 1000,
            easing: "easeOutCubic",
          });

          return;
        }
      }}
    />
  );
}

function equals<T>(a: T): SafePred<T> {
  return (b: T) => a === b;
}

type RoundStatusProps = {
  x: number;
  y: number;
  texture: Texture;
};
function RoundStatus({ x, y, texture }: RoundStatusProps) {
  const { current: status } = useAppSelector(selectRoomStatus);

  return (
    <Container x={x} y={y}>
      <Sprite scale={0.4} anchor={0.5} texture={texture} />

      <Text
        anchor={0.5}
        text={cond<RoomStatus, string>([
          [equals<RoomStatus>(RoomStatus.Change), () => "洗牌中"],
          [equals<RoomStatus>(RoomStatus.Start), () => "開始下注"],
          [equals<RoomStatus>(RoomStatus.Stop), () => "停止下注"],
          [equals<RoomStatus>(RoomStatus.Result), () => "開牌結果"],
        ])(status)}
        style={{ fontFamily: "Noto Serif TC", fill: 0xffffff, fontSize: 16 }}
      />
    </Container>
  );
}

export default function GameView() {
  const { width, height } = useViewport();
  const boss = useAppSelector(selectRoomBoss);
  const assets = useAppSelector(selectAssetsByName);

  return (
    <>
      <Sprite width={width} height={height} texture={assets("Background")} />

      {boss && (
        <Boss data={assets(String(boss.id))} x={width / 2} y={height / 2} />
      )}

      <CountDown
        x={width / 2}
        y={height / 2}
        texture={assets("CountDown_Frame")}
      />

      <RoundStatus
        x={width / 2}
        y={height / 2 + 58}
        texture={assets("Round_Status_Frame")}
      />
    </>
  );
}
