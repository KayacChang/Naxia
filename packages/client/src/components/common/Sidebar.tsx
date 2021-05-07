import { Link, Setting } from "components";
import Assets from "assets";

const links = [
  {
    key: "announcement",
    icons: {
      normal: Assets.Common.Sidebar_Announcement,
    },
    href: "#",
  },
  {
    key: "setting",
    icons: {
      normal: Assets.Common.Sidebar_Setting,
    },
    href: "#",
  },
];

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <Link to={links[0].href}>
        <img src={links[0].icons.normal} alt={links[0].key} />
      </Link>

      <Setting />
    </aside>
  );
}
