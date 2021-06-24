import { useEffect, useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Tab, Modal, Button, Close } from "components";
import { Achievement } from "types";
import { system, selectToken, useAppSelector, useAppDispatch } from "system";
import invariant from "tiny-invariant";
import { getUserAchievement } from "api";
import { useHistory } from "react-router";

type DetailProps = {
  item: Achievement;
  onClose: () => void;
};
function Detail({ item, onClose }: DetailProps) {
  return (
    <div className="flex items-center h-full font-kai">
      <div className="flex justify-center">
        <div className="flex-1"></div>

        <div className="flex-1 flex justify-center items-center relative">
          <img src={Assets.Lobby.Achievement_Glow} alt="glow" />

          <div className="absolute">
            <img src={item.cardImg} alt="card" />
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10/12 h-full flex flex-col justify-between">
            <div className="m-2 relative">
              <img src={Assets.Lobby.Achievement_Detail} alt="detail" />

              <div className="absolute top-0 w-full h-full flex flex-col">
                <h3
                  className={clsx(
                    "px-3 flex items-center text-yellow-300",
                    "lg:h-1/8",
                    "text-lg lg:text-3xl",
                    "py-1 lg:py-8"
                  )}
                >
                  {item.name}
                </h3>

                <p
                  className={clsx(
                    "p-3 flex-1 text-yellow-50 overflow-auto pointer-events-auto",
                    "text-sm lg:text-lg"
                  )}
                  style={{ textIndent: `2em` }}
                >
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="img"
                img={Assets.Lobby.Dungeon_Info_Btn_Back}
                className="relative flex items-center text-white w-40"
                onClick={onClose}
              >
                <div className="absolute w-full mb-1">{"返回"}</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SpecialProps = {
  items?: Achievement[];
  reset?: boolean;
};
function Special({ items = [], reset }: SpecialProps) {
  return (
    <div className="flex-1 pointer-events-auto overflow-auto mx-2">
      {items.map(({ name, img, count }, index) => (
        <div key={index} className="relative">
          <img src={Assets.Lobby.Achievement_Special} alt="card" />

          <div className="absolute top-0 w-full h-full flex px-1">
            <div
              className={clsx(
                "relative flex justify-center items-center",
                "w-14 lg:w-1/6 lg:pb-1"
              )}
            >
              <img
                src={Assets.Lobby.Achievement_Thumbnail_Frame}
                alt="thumbnail frame"
              />
              <img src={img} alt="thumbnail" className="absolute p-1" />
            </div>

            <div className="flex-1 flex items-center px-2">
              <h3 className="text-fansy font-kai text-base lg:text-2xl xl:text-4xl">
                {name}
              </h3>
            </div>

            <div
              className={clsx(
                "flex flex-col items-end w-1/4",
                "py-2 lg:px-3 lg:py-3 xl:py-4"
              )}
            >
              <h4
                className={clsx(
                  "text-yellow-100 font-kai flex items-center lg:pt-2 h-1/3",
                  "text-xs lg:text-lg xl:text-xl"
                )}
              >
                卡片獲得次數
              </h4>

              <div
                className={clsx(
                  "flex-1",
                  "text-white w-full flex justify-center items-center pt-1",
                  "text-lg lg:text-2xl xl:text-3xl"
                )}
              >
                <span>X</span>
                <span>{count}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function useAchievement() {
  const [achievement, setAchievement] = useState<{
    card: Achievement[];
    other: Achievement[];
  }>();

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorization");
    dispatch(system.loading(true));
    getUserAchievement(token).then((res) => {
      dispatch(system.loading(false));
      setAchievement(res);
    });
  }, [token, setAchievement, dispatch]);

  return achievement;
}

type AchievementProps = {
  className?: string;
};
export default function _Achievement({ className }: AchievementProps) {
  const history = useHistory();

  const filters = [
    { key: "card", label: "卡片圖鑑" },
    { key: "other", label: "特殊成就" },
  ];

  const achievement = useAchievement();

  const [reset, setReset] = useState(false);

  const [active, setActive] = useState(filters[0]);

  const [item, setItem] = useState<Achievement>();

  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  useEffect(() => {
    if (reset || !isiPad) return;
    setReset(true);
    setTimeout(() => setReset(false), 10)
  }, [active])

  return (
    <>
      <article className={clsx("flex justify-center items-center", className)}>
        <div className="relative">
          <div>
            <img src={Assets.Lobby.Achievement_Frame} alt="frame" />
          </div>

          <div className={clsx(
            "absolute top-0 w-full h-full",
            reset && "hidden"
          )}>
            <div className="flex flex-col h-full relative px-1/14 pt-1/24 pb-1/16">
              <nav className={clsx("flex", isiPad && "items-center justify-start")}>
                {filters.map((tab) => (
                  <Tab
                    className="w-2/12"
                    key={tab.key}
                    label={tab.label}
                    normalImage={Assets.Lobby.Ranking_Tab_Normal}
                    activeImage={Assets.Lobby.Ranking_Tab_Active}
                    active={tab.key === active.key}
                    onClick={() => setActive(tab)}
                  />
                ))}
              </nav>

              {active.key === "card" && (
                <div
                  className="overflow-auto m-2 grid grid-cols-3 gap-2 pointer-events-auto">
                  {achievement?.[active.key].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setItem(item)}
                      className="flex"
                    >
                      <img src={item.cardImg} alt="card" />
                    </button>
                  ))}
                </div>
              )}

              {active.key === "other" && (
                <Special items={achievement?.[active.key]} reset={reset}/>
              )}

              <Close
                className="absolute top-0 right-0 mr-1/24"
                onClick={() => history.push("/lobby")}
              />
            </div>
          </div>
        </div>
      </article>

      {item && (
        <Modal className="z-20" onClose={() => setItem(undefined)}>
          <Detail item={item} onClose={() => setItem(undefined)} />
        </Modal>
      )}
    </>
  );
}
