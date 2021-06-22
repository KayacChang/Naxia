import Assets from "assets";
import clsx from "clsx";
import { cond } from "ramda";
import { useState, useEffect } from "react";
import { SkillOption, RoomStatus } from "types";
import { Modal } from "components";
import {
  Dungeon,
  selectRoomStatusCurrent,
  useAppSelector,
  useDungeon,
  useMap,
} from "system";
import { useDispatch } from "react-redux";
import { RoadLarge } from "./RoadLarge";
import { MarkerRoad } from "./MarkerRoad";

type RoomRoadProps = {
  className?: string;
};
export function RoomRoad({ className }: RoomRoadProps) {
  const [open, setOpen] = useState(false);

  const map = useMap();
  const { rounds, info } = useDungeon();

  const countByResult = (result: SkillOption) => 
      rounds?.slice(0, 53).filter(({ results }) => results.includes(result))
      .length;
      // rounds?.slice(-1 * 9 * 6).filter(({ results }) => results.includes(result))
      // .length;

  const dispatch = useDispatch();
  const status = useAppSelector(selectRoomStatusCurrent);

  useEffect(() => {
    if (!map || !info) return;

    status === RoomStatus.Result &&
      dispatch(Dungeon.get.rounds({ mapID: map.id, dungeonID: info.id }));
  }, [status, map, info, dispatch]);

  const skillOptions: SkillOption[] = [
    "banker",
    "player",
    "tie",
    "bank_pair",
    "player_pair",
  ];

  if (!rounds) return <></>;

  return (
    <>
      <button
        className={clsx("relative", className)}
        onClick={() => setOpen(true)}
      >
        <img src={Assets.Room.Road_Frame_Small} alt="background" />

        <div
          className={clsx(
            "absolute top-0 w-full h-full flex font-kai",
            "py-1 px-2",
            "lg:py-2 lg:px-3",
            "xl:py-4 xl:px-5"
          )}
        >
          <div className={clsx("flex flex-col", "w-8", "lg:text-2xl lg:w-1/8")}>
            {/* <div className="flex-1 flex justify-center items-center">莊</div>
            <div className="flex-1 flex justify-center items-center">閒</div> */}
          </div>

          <MarkerRoad
            rounds={rounds}
            className={clsx(
              "flex-1 mt-0.5 ml-0.5",
              "lg:-mb-1.5 lg:ml-1 lg:mt-1"
            )}
          />

          <div
            className={clsx(
              "flex flex-col text-xs",
              "w-12 lg:w-1/5",
              "text-xs lg:text-lg xl:text-xl",
              "p-0.5 lg:px-2 xl:px-4 lg:-ml-1.5 -mb-1 lg:-mb-2"
            )}
          >
            {skillOptions.map((type) => (
              <div
                key={type}
                className={clsx(
                  "flex-1 flex justify-between items-center",
                  cond<SkillOption, string>([
                    [(type) => type === "banker", () => "text-fire"],
                    [(type) => type === "player", () => "text-ice"],
                    [(type) => type === "tie", () => "text-wind"],
                    [(type) => type === "player_pair", () => "text-light"],
                    [(type) => type === "bank_pair", () => "text-dark"],
                  ])(type)
                )}
              >
                <img src={
                  cond<SkillOption, string>([
                    [(type) => type === "banker", () => Assets.Room.Icon_Fire],
                    [(type) => type === "player", () => Assets.Room.Icon_Ice],
                    [(type) => type === "tie", () => Assets.Room.Icon_Wind],
                    [(type) => type === "player_pair", () => Assets.Room.Icon_Light],
                    [(type) => type === "bank_pair", () => Assets.Room.Icon_Dark],
                  ])(type)
                } alt="background" style={{width: '40%'}}/>
                <span>{countByResult(type)}</span>
              </div>
            ))}
          </div>
        </div>
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <RoadLarge rounds={rounds} />
        </Modal>
      )}
    </>
  );
}
