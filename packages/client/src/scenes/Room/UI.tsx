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

      <div className="flex-1 flex">
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
