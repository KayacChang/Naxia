import { Link } from "core";
import { assets } from "utils";

const links = [
  {
    key: "announcement",
    icons: {
      normal: assets("/sidebar/announcement.png"),
    },
    href: "#",
  },
  {
    key: "setting",
    icons: {
      normal: assets("/sidebar/setting.png"),
    },
    href: "#",
  },
  {
    key: "mail",
    icons: {
      normal: assets("/sidebar/mail.png"),
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
