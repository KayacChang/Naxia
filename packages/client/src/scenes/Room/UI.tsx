import { useHistory } from "react-router";
import { UI } from "layers";
import { currency } from "utils";
import { Sidebar, Profile, Location, Status, Road, Button } from "components";

import RoomStatus from "./RoomStatus";
import BetSection from "./BetSection";
import Assets from "assets";
import { Round, User, DungeonInfo, RoomStatus as TRoomStatus } from "types";
import { useEffect } from "react";
import {
  selectRoomStatusCurrent,
  useAppDispatch,
  useAppSelector,
  selectRoomOrder,
  room,
} from "system";
import clsx from "clsx";

type GameUIProps = {
  user: User;
  rounds: Round[];
  info: DungeonInfo;
};
export default function GameUI({ user, rounds, info }: GameUIProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectRoomStatusCurrent);
  const order = useAppSelector(selectRoomOrder);

  useEffect(() => {
    if (status === TRoomStatus.Start) {
      // setOrder(toOrder(info.skills));
    }

    if (status === TRoomStatus.Result) {
      // setSubmit(false);
    }
  }, [status]);

  const enable = status === TRoomStatus.Start;

  return (
    <UI className="flex flex-col text-white">
      <header className="h-10 relative">
        <Profile user={user} />
        <Location value="娜希雅大陸" />
        <Status value={currency(user.balance)} />
      </header>

      <div className="flex-1 flex">
        <div className="w-2/3 flex flex-col justify-between p-2">
          <RoomStatus className="w-52 mt-8" skills={info.skills} />

          <Button
            type="img"
            img={Assets.Room.Back}
            className="w-8"
            onClick={() => history.replace("/lobby")}
          />

          <Road rounds={rounds} />
        </div>

        <div className="w-1/3 flex flex-col">
          <div className="flex flex-row justify-end space-x-4 mt-2">
            <div
              className={clsx(
                "space-y-2 flex flex-col font-noto w-24",
                enable
                  ? "pointer-events-auto"
                  : "pointer-events-none opacity-50"
              )}
            >
              <Button
                type="img"
                img={Assets.Room.Control_Confirm_Normal}
                className="relative flex justify-end items-center"
              >
                <div className="absolute px-4">{"確認"}</div>
              </Button>

              <Button
                type="img"
                img={Assets.Room.Control_Cancel_Normal}
                className="relative flex justify-end items-center"
                onClick={() => dispatch(room.order.clear())}
              >
                <div className="absolute px-4">{"歸零"}</div>
              </Button>

              <Button
                type="img"
                img={Assets.Room.Control_Redo_Normal}
                className="relative flex justify-end items-center"
              >
                <div className="absolute px-4">{"重複"}</div>
              </Button>
            </div>

            <Sidebar className="w-12" />
          </div>

          <BetSection
            enable={enable}
            skills={info.skills}
            bets={info.bets}
            order={order}
            onSkillClick={(order) => dispatch(room.order.add(order))}
          />
        </div>
      </div>
    </UI>
  );
}
