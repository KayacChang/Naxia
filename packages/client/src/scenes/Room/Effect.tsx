import {
  selectAssetsByName,
  selectRoomStatusCurrent,
  SkeletonData,
  useAppSelector,
} from "system";
import { useViewport, wait } from "utils";
import { useEffect, useState } from "react";
import { Spine } from "components";
import { RoomStatus } from "types";

export default function Effect() {
  const { width, height } = useViewport();
  const status = useAppSelector(selectRoomStatusCurrent);
  const assets = useAppSelector(selectAssetsByName);
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    async function run() {
      const data = assets("Skill_Fire") as SkeletonData;

      setVisiable(true);

      await wait(data.animations[0].duration * 1000);

      setVisiable(false);
    }

    if (status === RoomStatus.Result) run();
  }, [status]);

  if (!visiable) {
    return <></>;
  }

  return (
    <Spine
      data={assets("Skill_Fire")}
      x={width / 2}
      y={height / 2}
      scale={1 / window.devicePixelRatio}
    />
  );
}
