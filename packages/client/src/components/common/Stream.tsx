import Assets from "assets";
import { useAppDispatch } from "system";
import { room } from "system/room";
import SideButton from "./SideButton";

const icon = {
  key: "stream",
  icons: {
    normal: Assets.Common.Sidebar_Stream,
  },
};
export function Stream() {
  const dispatch = useAppDispatch();

  return (
    <SideButton
      label="直播"
      img={icon.icons.normal}
      onClick={() => dispatch(room.stream())}
    />
  );
}
