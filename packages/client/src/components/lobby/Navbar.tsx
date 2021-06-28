import { Link } from "components";
import { useLocation } from "react-router";
import Assets from "assets";
import clsx from "clsx";
import { useAppDispatch, Map } from "system";

const links = [
  {
    key: "dungeon",
    name: "世界地圖",
    icons: {
      normal: Assets.Lobby.Navbar_Dungeon_Normal,
      active: Assets.Lobby.Narbar_Dungeon_Active,
    },
    href: "/lobby",
  },
  {
    key: "repository",
    name: "道具背包",
    icons: {
      normal: Assets.Lobby.Navbar_Repository_Normal,
      active: Assets.Lobby.Navbar_Repository_Active,
    },
    href: "/lobby/repository",
  },
  {
    key: "achievement",
    name: "圖鑒成就",
    icons: {
      normal: Assets.Lobby.Navbar_Achievement_Normal,
      active: Assets.Lobby.Navbar_Achievement_Active,
    },
    href: "/lobby/achievement",
  },
  {
    key: "ranking",
    name: "排行榜",
    icons: {
      normal: Assets.Lobby.Navbar_Ranking_Normal,
      active: Assets.Lobby.Navbar_Ranking_Active,
    },
    href: "/lobby/ranking",
  },
  {
    key: "store",
    name: "兌換商店",
    icons: {
      normal: Assets.Lobby.Navbar_Store_Normal,
      active: Assets.Lobby.Navbar_Store_Active,
    },
    href: "/lobby/store",
  },
];

export function Navbar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  return (
    <nav className={`relative z-20 ${isiPad && 'set_iPad_style'}`}>
      <div className="transform lg:translate-y-1/3">
        <img src={Assets.Lobby.Narbar_Frame} alt="nav frame" />
      </div>

      <button
        onClick={() => dispatch(Map.previous())}
        className={clsx(
          "absolute bottom-0 left-0 w-32",
          "transform origin-bottom-left lg:scale-150"
        )}
      >
        <img src={Assets.Lobby.Narbar_Back} alt="back to home" />
      </button>

      <div
        className={clsx(
          "absolute bottom-0 w-full pr-5 pb-1 flex justify-end space-x-2",
          "transform origin-bottom-right lg:scale-150"
        )}
      >
        {links.map(({ key, icons, href, name }) => (
          <Link
            key={key}
            to={href}
            className="w-16 relative flex justify-center"
          >
            <div>
              <img
                src={location.pathname === href ? icons.active : icons.normal}
                alt={key}
              />
            </div>

            <span className="absolute bottom-0 font-kai text-fansy text-shadow-xl filter contrast-125">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
