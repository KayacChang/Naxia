import { Link } from "components";
import { useLocation } from "react-router";
import { assets } from "utils";

const links = [
  {
    key: "dungeon",
    icons: {
      normal: assets("/lobby/navbar/dungeon_normal.png"),
      active: assets("/lobby/navbar/dungeon_active.png"),
    },
    href: "/lobby",
  },
  {
    key: "repository",
    icons: {
      normal: assets("/lobby/navbar/repository_normal.png"),
      active: assets("/lobby/navbar/repository_active.png"),
    },
    href: "/lobby/repository",
  },
  {
    key: "achievement",
    icons: {
      normal: assets("/lobby/navbar/achievement_normal.png"),
      active: assets("/lobby/navbar/achievement_active.png"),
    },
    href: "/lobby/achievement",
  },
  {
    key: "ranking",
    icons: {
      normal: assets("/lobby/navbar/ranking_normal.png"),
      active: assets("/lobby/navbar/ranking_active.png"),
    },
    href: "/lobby/ranking",
  },
  {
    key: "store",
    icons: {
      normal: assets("/lobby/navbar/store_normal.png"),
      active: assets("/lobby/navbar/store_active.png"),
    },
    href: "/lobby/store",
  },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="relative z-10">
      <img src={assets("/lobby/navbar/frame.png")} alt="nav frame" />

      <Link to="#" className="absolute bottom-0 left-0 w-28">
        <img src={assets("/lobby/navbar/back.png")} alt="back to home" />
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
