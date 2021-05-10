import { useHistory } from "react-router";
import { UI } from "layers";
import { currency } from "utils";
import { Sidebar, Profile, Location, Status, Road, Button } from "components";

import RoomStatus from "./RoomStatus";
import BetSection from "./BetSection";
import Assets from "assets";
import { Round, User, DungeonInfo, RoomStatus as TRoomStatus } from "types";
import {
  useAppDispatch,
  room,
  useAppSelector,
  selectRoomOrder,
  selectRoomStatusCurrent,
  selectRoomHasSubmitted,
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
  const order = useAppSelector(selectRoomOrder);
  const status = useAppSelector(selectRoomStatusCurrent);
  const hasSubmitted = useAppSelector(selectRoomHasSubmitted);

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
          <div className="flex flex-row justify-end space-x-4 mt-2 mr-2">
            <div
              className={clsx(
                "space-y-2 flex flex-col font-noto w-24",
                "transition-opacity duration-500 opacity-0",
                status === TRoomStatus.Start && !hasSubmitted && "opacity-100"
              )}
            >
              <Button
                type="img"
                img={Assets.Room.Control_Confirm_Normal}
                className="relative flex justify-end items-center"
                onClick={() => dispatch(room.order.submit(order))}
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
                onClick={() => dispatch(room.order.redo())}
              >
                <div className="absolute px-4">{"重複"}</div>
              </Button>
            </div>

            <Sidebar className="w-12" />
          </div>

          <BetSection skills={info.skills} bets={info.bets} />
        </div>
      </div>
    </UI>
  );
}
