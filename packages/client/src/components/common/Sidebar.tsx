import { Announcement, RoomRoad, Setting } from "components";

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <Announcement />

      <Setting />

      {/* <RoomRoad className="w-full h-full" rounds={[]} /> */}
    </aside>
  );
}
