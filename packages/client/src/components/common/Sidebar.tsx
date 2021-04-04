import { Link } from "core";

import IMG_Announcement from "assets/sidebar/announcement.png";
import IMG_Mail from "assets/sidebar/mail.png";
import IMG_Setting from "assets/sidebar/setting.png";

const links = [
  {
    key: "announcement",
    icons: {
      normal: IMG_Announcement,
    },
    href: "#",
  },
  {
    key: "setting",
    icons: {
      normal: IMG_Setting,
    },
    href: "#",
  },
  {
    key: "mail",
    icons: {
      normal: IMG_Mail,
    },
    href: "#",
  },
];

export function Sidebar() {
  return (
    <aside className="w-12">
      {links.map(({ key, icons: { normal }, href }) => (
        <Link key={key} to={href}>
          <img src={normal} alt={key} />
        </Link>
      ))}
    </aside>
  );
}
