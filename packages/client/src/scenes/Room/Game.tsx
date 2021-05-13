import { Sprite, BitmapText, Container, Text } from "@inlet/react-pixi";
import {
  useAppSelector,
  selectRoomStatus,
  selectRoomStatusCurrent,
  selectAssetsByName,
  selectRoomBossCurrent,
} from "system";
import { useViewport } from "utils";
import { RoomStatus } from "types";
import { cond, SafePred } from "ramda";
import { Container as TContainer } from "pixi.js";
import anime from "animejs";
import { memo, useMemo } from "react";
import { Spine } from "@pixi-spine/all-3.8";

type FadeProps = {
  targets: any | any[];
  alpha: [number, number];
};
function fade({ targets, alpha }: FadeProps) {
  anime({
    targets,
    alpha,
    duration: 500,
    direction: "alternate",
    easing: "linear",
  });
}

function CountDown() {
  const { width, height } = useViewport();
  const { current: status, countdown } = useAppSelector(selectRoomStatus);
  const assets = useAppSelector(selectAssetsByName);

  if (status !== RoomStatus.Start) {
    return <Container></Container>;
  }

  return (
    <Container x={width / 2} y={height / 2 + 30}>
      <Sprite
        y={18}
        scale={0.4}
        anchor={0.5}
        texture={assets("CountDown_Frame")}
        ref={(ref: TContainer | null) => {
          if (!ref) return;

          fade({ targets: ref, alpha: [0.5, 1] });
        }}
      />

      <BitmapText
        anchor={0.5}
        text={String(countdown)}
        style={{ fontName: "countdown", fontSize: 9 }}
        ref={(ref: TContainer | null) => {
          if (!ref) return;

          fade({ targets: ref, alpha: [0.9, 1] });
        }}
      />
    </Container>
  );
}

const Boss = memo(() => {
  const { width, height } = useViewport();
  const boss = useAppSelector(selectRoomBossCurrent);
  const assets = useAppSelector(selectAssetsByName);
  const status = useAppSelector(selectRoomStatusCurrent);

  const spine = useMemo(() => {
    if (boss?.id === undefined) return;

    return new Spine(assets(String(boss.id)));
  }, [boss?.id]);

  return (
    <Container
      x={width / 2}
      y={height / 2}
      scale={1 / window.devicePixelRatio}
      ref={(ref: TContainer | null) => {
        if (!ref || !spine) return;

        ref.addChild(spine);

        if (status === RoomStatus.Change) {
          anime({
            targets: spine,
            alpha: [0, 1],
            duration: 1000,
            easing: "easeOutCubic",
          });
        }
      }}
    />
  );
});

function equals<T>(a: T): SafePred<T> {
  return (b: T) => a === b;
}

function RoundStatus() {
  const { width, height } = useViewport();
  const { current: status } = useAppSelector(selectRoomStatus);
  const assets = useAppSelector(selectAssetsByName);

  return (
    <Container x={width / 2} y={height / 6}>
      <Sprite scale={0.4} anchor={0.5} texture={assets("Round_Status_Frame")} />

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

function Background() {
  const { width, height } = useViewport();
  const assets = useAppSelector(selectAssetsByName);

  return (
    <Sprite width={width} height={height} texture={assets("Background")} />
  );
}

export default function GameView() {
  return (
    <>
      <Background />

      <Boss />

      <CountDown />

      <RoundStatus />
    </>
  );
}
