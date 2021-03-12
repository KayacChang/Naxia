import { Link } from "core";

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
import { useLocation } from "react-router";

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
    <nav className="flex justify-end py-2 px-4 space-x-2">
      {links.map(({ key, icons: { active, normal }, href }) => (
        <Link key={key} to={href} className="w-16">
          <img src={location.pathname === href ? active : normal} alt={key} />
        </Link>
      ))}
    </nav>
  );
}
