import { useHistory } from "react-router";
import { UI } from "layers";
import { currency } from "utils";
import { Sidebar, Profile, Location, Status, Road, Button } from "components";

import RoomStatus from "./RoomStatus";
import BetSection from "./BetSection";
import Assets from "assets";
import {
  Round,
  User,
  DungeonInfo,
  Order,
  SkillSet,
  RoomStatus as TRoomStatus,
} from "types";
import { useEffect, useState } from "react";
import { bet } from "api";
import { selectRoomStatusCurrent, useAppSelector, useAuthState } from "system";
import { add } from "ramda";
import clsx from "clsx";

function toOrder(skills: SkillSet) {
  return Object.keys(skills).reduce(
    (obj, skill) => ({ ...obj, [skill]: 0 }),
    {}
  ) as Order;
}

type GameUIProps = {
  user: User;
  rounds: Round[];
  info: DungeonInfo;
};
export default function GameUI({ user, rounds, info }: GameUIProps) {
  const history = useHistory();
  const { token } = useAuthState();
  const status = useAppSelector(selectRoomStatusCurrent);

  const [hasSubmit, setSubmit] = useState(false);
  const [order, setOrder] = useState(toOrder(info.skills));

  useEffect(() => {
    if (status === TRoomStatus.Start) {
      setOrder(toOrder(info.skills));
    }

    if (status === TRoomStatus.Result) {
      setSubmit(false);
    }
  }, [status]);

  const onOrderSubmit = () => {
    if (Object.values(order).reduce(add) <= 0) return;

    bet(token!, {
      room_id: info.room,
      uid: user.uid,
      options: Object.entries(order).map(([cmd, val]) => ({ cmd, val })),
    }).then(({ status, data }) => {
      if (status !== "success") throw new Error(data);

      setSubmit(true);
    });
  };

  const enable = status === TRoomStatus.Start && !hasSubmit;

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
                onClick={onOrderSubmit}
              >
                <div className="absolute px-4">{"確認"}</div>
              </Button>

              <Button
                type="img"
                img={Assets.Room.Control_Cancel_Normal}
                className="relative flex justify-end items-center"
                onClick={() => setOrder(toOrder(info.skills))}
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
            setOrder={setOrder}
          />
        </div>
      </div>
    </UI>
  );
}
