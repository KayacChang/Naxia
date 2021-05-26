import { useHistory } from "react-router";
import { UI } from "layers";
import { currency } from "utils";
import {
  Sidebar,
  Profile,
  Location,
  Status,
  Button,
  RoomRoad as Road,
} from "components";

import RoomStatus from "./RoomStatus";
import BetSection from "./BetSection";
import Assets from "assets";
import { RoomStatus as TRoomStatus } from "types";
import {
  useAppDispatch,
  room,
  useAppSelector,
  selectRoomOrder,
  selectRoomStatusCurrent,
  selectRoomHasSubmitted,
  useUser,
  selectRoomBossCurrent,
  TDungeon,
  selectRoomStatus,
} from "system";
import clsx from "clsx";
import { ReactNode, useState } from "react";

type ControlButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  img: string;
};
function ControlButton({ img, children, onClick }: ControlButtonProps) {
  const [active, setActive] = useState(false);

  return (
    <Button
      type="img"
      img={img}
      className={clsx(
        "relative flex justify-end items-center",
        active && "filter brightness-75"
      )}
      onClick={onClick}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
    >
      <span className="absolute px-4">{children}</span>
    </Button>
  );
}

function CountDown() {
  const { current, countdown } = useAppSelector(selectRoomStatus);

  if (current !== TRoomStatus.Start) return <></>;

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-16 animate-pulse">
        <img src={Assets.Room.CountDown_Frame} alt="frame" />
      </div>

      <span className="absolute text-3xl text-fansy">{countdown}</span>
    </div>
  );
}

function RoundStatus() {
  const status = useAppSelector(selectRoomStatusCurrent);

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-28">
        <img src={Assets.Room.Round_Status_Frame} alt="frame" />
      </div>

      <span className="absolute text-lg font-kai text-yellow-100">
        {status === TRoomStatus.Change
          ? "洗牌中"
          : status === TRoomStatus.Start
          ? "開始下注"
          : status === TRoomStatus.Stop
          ? "停止下注"
          : status === TRoomStatus.Result
          ? "開牌結果"
          : ""}
      </span>
    </div>
  );
}

type GameUIProps = {
  dungeon: TDungeon;
};
export default function GameUI({ dungeon }: GameUIProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useUser();
  const order = useAppSelector(selectRoomOrder);
  const status = useAppSelector(selectRoomStatusCurrent);
  const hasSubmitted = useAppSelector(selectRoomHasSubmitted);
  const boss = useAppSelector(selectRoomBossCurrent);

  if (!user || !boss) return <></>;

  return (
    <UI className="flex flex-col text-white">
      <header className="h-10 relative">
        <Profile user={user} />
        <Location value={boss.name} />
        <Status value={currency(user.balance)} />
      </header>

      <div className="flex-1 flex relative">
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CountDown />
        </div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RoundStatus />
        </div>

        <div className="w-2/3 flex flex-col justify-between px-2 mt-8">
          <RoomStatus className="w-52" skills={dungeon.info.skills} />

          <Button
            type="img"
            img={Assets.Room.Room_Back}
            className="w-8"
            onClick={() => history.replace("/lobby")}
          />

          <Road className="w-3/5" rounds={dungeon.rounds} />
        </div>

        <div className="w-1/3 flex flex-col">
          <div className="flex flex-row justify-end space-x-4 mt-2 mr-2">
            <div
              className={clsx(
                "space-y-2 flex flex-col font-noto w-24",
                "transition-opacity duration-500",
                status === TRoomStatus.Start && !hasSubmitted
                  ? "opacity-100"
                  : "opacity-0"
              )}
            >
              <ControlButton
                img={Assets.Room.Control_Confirm_Normal}
                onClick={() => dispatch(room.order.submit(order))}
              >
                確認
              </ControlButton>

              <ControlButton
                img={Assets.Room.Control_Cancel_Normal}
                onClick={() => dispatch(room.order.clear())}
              >
                歸零
              </ControlButton>

              <ControlButton
                img={Assets.Room.Control_Redo_Normal}
                onClick={() => dispatch(room.order.redo())}
              >
                重複
              </ControlButton>
            </div>

            <Sidebar className="w-12" />
          </div>

          <BetSection skills={dungeon.info.skills} bets={dungeon.info.bets} />
        </div>
      </div>
    </UI>
  );
}
