import { useHistory } from "react-router";
import { UI } from "layers";
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
  selectRoomStatus,
} from "system";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { useEffect } from "react";

type ControlButtonProps = {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  img: string;
};
function ControlButton({
  className,
  disabled,
  img,
  children,
  onClick,
}: ControlButtonProps) {
  const [active, setActive] = useState(false);

  return (
    <Button
      type="img"
      img={img}
      className={clsx(
        "relative flex justify-center items-center",
        active && "filter brightness-75",
        disabled ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
      onClick={onClick}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
    >
      <span className="absolute ml-1/4">{children}</span>
    </Button>
  );
}

function CountDown() {
  const { current, countdown } = useAppSelector(selectRoomStatus);

  if (current !== TRoomStatus.Start) return <></>;

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-1/3 lg:w-1/2 xl:w-2/3 animate-pulse">
        <img src={Assets.Room.CountDown_Frame} alt="frame" />
      </div>

      <span className="absolute text-2xl lg:text-3xl xl:text-5xl text-fansy">
        {countdown}
      </span>
    </div>
  );
}

function RoundStatus() {
  const status = useAppSelector(selectRoomStatusCurrent);

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-1/2 lg:w-2/3 xl:w-auto">
        <img src={Assets.Room.Round_Status_Frame} alt="frame" />
      </div>

      <span
        className={clsx(
          "absolute text-lg lg:text-xl xl:text-3xl font-kai text-yellow-100"
        )}
      >
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

export default function GameUI() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useUser();
  const order = useAppSelector(selectRoomOrder);
  const status = useAppSelector(selectRoomStatusCurrent);
  const hasSubmitted = useAppSelector(selectRoomHasSubmitted);
  const boss = useAppSelector(selectRoomBossCurrent);

  const enable = status === TRoomStatus.Start && !hasSubmitted;
  const [submitEnable, setSubmitEnable] = useState(true);

  useEffect(() => {
    if (status === TRoomStatus.Change) setSubmitEnable(true);
  }, [status, setSubmitEnable]);

  if (!user || !boss) return <></>;

  return (
    <UI className="flex flex-col text-white">
      <header className="h-10 relative">
        <Profile />
        <Location>{boss.name}</Location>
        <Status />
      </header>

      <div className="flex-1 flex relative">
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CountDown />
        </div>

        <div className="-translate-x-1/2 absolute bottom-1/4 left-1/2 transform translate-y-1/2">
          <RoundStatus />
        </div>

        <div className="w-2/3 flex flex-col justify-between px-2 mt-1/24 lg:mt-1/16">
          <RoomStatus className="w-1/2" />

          <Button
            type="img"
            img={Assets.Room.Room_Back}
            className="w-1/16"
            onClick={() => history.replace("/lobby")}
          />

          <Road className="w-3/5" />
        </div>

        <div className="w-1/3 flex flex-col">
          <div className="flex-1 flex flex-row justify-end space-x-4 mt-1/24 pr-1/24">
            <div
              className={clsx(
                "space-y-2 flex flex-col font-noto",
                "transition-opacity duration-500",
                "lg:mt-1/16",
                "text-xs lg:text-lg xl:text-2xl",
                "w-1/2 lg:w-1/3",
                enable ? "opacity-100" : "opacity-0"
              )}
            >
              <ControlButton
                className={clsx(
                  submitEnable || "opacity-50 pointer-events-none"
                )}
                disabled={!(enable && submitEnable)}
                img={Assets.Room.Control_Confirm_Normal}
                onClick={() => {
                  if (!submitEnable) return;

                  setSubmitEnable(false);
                  dispatch(room.order.submit(order));
                }}
              >
                確認
              </ControlButton>

              <ControlButton
                disabled={!enable}
                img={Assets.Room.Control_Cancel_Normal}
                onClick={() => dispatch(room.order.clear())}
              >
                歸零
              </ControlButton>

              <ControlButton
                disabled={!enable}
                img={Assets.Room.Control_Redo_Normal}
                onClick={() => dispatch(room.order.redo())}
              >
                重複
              </ControlButton>
            </div>

            <Sidebar />
          </div>

          <div className="flex-1">
            <BetSection />
          </div>
        </div>
      </div>
    </UI>
  );
}
