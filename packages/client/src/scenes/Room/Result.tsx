import { UI } from "layers";
import {
  selectRoomResult,
  useAppSelector,
  Effect,
  selectRoomStatusCurrent,
} from "system";
import { wait } from "utils";
import Assets from "assets";
import { Item, RoomStatus } from "types";
import { useEffect, useState } from "react";
import { Continue } from "./Continue";
import { useDispatch } from "react-redux";
import Sound from "assets/sound";

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

export default function GameResult() {
  const dispatch = useDispatch();

  const status = useAppSelector(selectRoomStatusCurrent);
  const result = useAppSelector(selectRoomResult);

  const [skip, setSkip] = useState(status !== RoomStatus.Result);

  useEffect(() => {
    if (status === RoomStatus.Result) {
      wait(3000).then(() => {
        setSkip(false);

        dispatch(Effect.play(Sound.Room.Reward));
      });

      return;
    }

    setSkip(true);
  }, [status, dispatch, setSkip]);

  if (skip) {
    return <></>;
  }

  return (
    <UI
      className="absolute top-0 flex flex-col justify-center items-center pointer-events-auto z-50"
      onClick={() => setSkip(true)}
    >
      <img
        className="absolute w-4/5"
        src={
          result!.result === "lose"
            ? Assets.Room.Result_Failed
            : Assets.Room.Result_Success
        }
        alt="background"
      />

      <div className="relative mt-12 flex flex-col items-center space-y-4">
        <div className="relative text-yellow-200">
          <img src={Assets.Room.Result_Frame} alt="result's frame" />

          <div className="absolute top-0 w-full h-full pt-8 flex flex-col justify-center items-center">
            <RewardItems items={result!.items} />
          </div>
        </div>

        <Continue text="點擊開始" />
      </div>
    </UI>
  );
}
