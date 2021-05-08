import { Link } from "components";
import { useLocation } from "react-router";
import { assets } from "utils";

const links = [
  {
    key: "dungeon",
    name: "世界地圖",
    icons: {
      normal: assets("/lobby/navbar/dungeon_normal.png"),
      active: assets("/lobby/navbar/dungeon_active.png"),
    },
    href: "/lobby",
  },
  {
    key: "repository",
    name: "道具背包",
    icons: {
      normal: assets("/lobby/navbar/repository_normal.png"),
      active: assets("/lobby/navbar/repository_active.png"),
    },
    href: "/lobby/repository",
  },
  {
    key: "achievement",
    name: "圖鑒成就",
    icons: {
      normal: assets("/lobby/navbar/achievement_normal.png"),
      active: assets("/lobby/navbar/achievement_active.png"),
    },
    href: "/lobby/achievement",
  },
  {
    key: "ranking",
    name: "排行榜",
    icons: {
      normal: assets("/lobby/navbar/ranking_normal.png"),
      active: assets("/lobby/navbar/ranking_active.png"),
    },
    href: "/lobby/ranking",
  },
  {
    key: "store",
    name: "兌換商店",
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
    <nav className="relative z-50">
      <img src={assets("/lobby/navbar/frame.png")} alt="nav frame" />

      <Link to="#" className="absolute bottom-0 left-0 w-28">
        <img src={assets("/lobby/navbar/back.png")} alt="back to home" />
      </Link>

      <div className="absolute bottom-0 w-full px-2 flex justify-end space-x-2">
        {links.map(({ key, icons, href, name }) => (
          <Link
            key={key}
            to={href}
            className="w-16 relative flex justify-center"
          >
            <img
              src={location.pathname === href ? icons.active : icons.normal}
              alt={key}
            />

            <span className="absolute bottom-0 font-kai text-md text-fansy font-bold text-shadow-xl">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
