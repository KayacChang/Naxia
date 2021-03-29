import { Link } from "core";
import { useLocation } from "react-router";

import IMG_Frame from "assets/navbar/frame.png";
import IMG_Back from "assets/navbar/back.png";

import IMG_Dungeon_Normal from "assets/navbar/dungeon_normal.png";
import IMG_Ranking_Normal from "assets/navbar/ranking_normal.png";
import IMG_Repository_Normal from "assets/navbar/repository_normal.png";
import IMG_Achievement_Normal from "assets/navbar/achievement_normal.png";
import IMG_Store_Normal from "assets/navbar/store_normal.png";

import IMG_Dungeon_Active from "assets/navbar/dungeon_active.png";
import IMG_Repository_Active from "assets/navbar/repository_active.png";
import IMG_Achievement_Active from "assets/navbar/achievement_active.png";
import IMG_Ranking_Active from "assets/navbar/ranking_active.png";
import IMG_Store_Active from "assets/navbar/store_active.png";

const links = [
  {
    key: "dungeon",
    icons: {
      normal: IMG_Dungeon_Normal,
      active: IMG_Dungeon_Active,
    },
    href: "/lobby",
  },
  {
    key: "repository",
    icons: {
      normal: IMG_Repository_Normal,
      active: IMG_Repository_Active,
    },
    href: "/lobby/repository",
  },
  {
    key: "achievement",
    icons: {
      normal: IMG_Achievement_Normal,
      active: IMG_Achievement_Active,
    },
    href: "/lobby/achievement",
  },
  {
    key: "ranking",
    icons: {
      normal: IMG_Ranking_Normal,
      active: IMG_Ranking_Active,
    },
    href: "/lobby/ranking",
  },
  {
    key: "store",
    icons: {
      normal: IMG_Store_Normal,
      active: IMG_Store_Active,
    },
    href: "/lobby/store",
  },
];

export function Navbar() {
  const location = useLocation();
  return (
    <nav className="relative z-10">
      <img src={IMG_Frame} alt="nav frame" />

      <Link to="#" className="absolute bottom-0 left-0 w-28">
        <img src={IMG_Back} alt="back to home" />
      </Link>

      <div className="absolute bottom-0 w-full px-2 flex justify-end space-x-2">
        {links.map(({ key, icons, href }) => (
          <Link key={key} to={href} className="w-16">
            <img
              src={location.pathname === href ? icons.active : icons.normal}
              alt={key}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
