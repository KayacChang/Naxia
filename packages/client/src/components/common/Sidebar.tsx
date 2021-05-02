import { Link } from "components";
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
      {links.map(({ key, icons: { normal }, href }) => (
        <Link key={key} to={href}>
          <img src={normal} alt={key} />
        </Link>
      ))}
    </aside>
  );
}
