import { Announcement, Setting } from "components";

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <Announcement />

      <Setting />
    </aside>
  );
}
