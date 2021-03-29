import { Link } from "core";

import IMG_Announcement_Normal from "assets/sidebar/announcement_normal.png";
import IMG_Mail_Normal from "assets/sidebar/mail_normal.png";
import IMG_Setting_Normal from "assets/sidebar/setting_normal.png";

// import IMG_Announcement_Active from "assets/sidebar/announcement_active.png";
// import IMG_Mail_Active from "assets/sidebar/mail_active.png";
// import IMG_Setting_Active from "assets/sidebar/setting_active.png";

const links = [
  {
    key: "announcement",
    icons: {
      normal: IMG_Announcement_Normal,
    },
    href: "#",
  },
  {
    key: "setting",
    icons: {
      normal: IMG_Setting_Normal,
    },
    href: "#",
  },
  {
    key: "mail",
    icons: {
      normal: IMG_Mail_Normal,
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
