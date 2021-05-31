import React, { useEffect } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Tab, Modal, Button } from "components";
import { useState } from "react";
import { range } from "ramda";
import { Achievement } from "types";
import { selectToken, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { getUserAchievement } from "api";

type DetailProps = {
  onClose: () => void;
};
function Detail({ onClose }: DetailProps) {
  return (
    <div className="flex items-center h-full font-kai">
      <div className="flex justify-center">
        <div className="flex-1"></div>

        <div className="flex-1 flex justify-center items-center relative">
          <img src={Assets.Lobby.Achievement_Glow} alt="glow" />

          <div className="absolute p-2">
            <img src={Assets.Lobby.Achievement_Card} alt="card" />
          </div>
        </div>

        <div className="flex-1">
          <div className="w-10/12 h-full flex flex-col justify-between">
            <div className="m-2 relative">
              <img src={Assets.Lobby.Achievement_Detail} alt="detail" />

              <div className="absolute top-0 w-full h-full flex flex-col">
                <h3 className="px-3 py-1 flex items-center text-lg text-yellow-300">
                  食人獸卡片
                </h3>

                <p
                  className="px-3 py-1 flex-1 text-sm text-yellow-50 overflow-scroll pointer-events-auto"
                  style={{ textIndent: `2em` }}
                >
                  瘦高有些駝背, 尖鼻子長著獠牙的怪獸, 身材巨大卻行動敏捷,
                  爪子又尖又長; 更驚人的是, 食人妖有再生的能力,
                  即使失去一隻手或一隻腳, 只要一段時間會再長出來,
                  所以對冒險者來說是一種很大的威脅。
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
};
function Special({ items = [] }: SpecialProps) {
  return (
    <div className="flex-1 overflow-scroll pointer-events-auto mx-2">
      {items.map(({ name, img }, index) => (
        <div key={index} className="relative">
          <img src={Assets.Lobby.Achievement_Special} alt="card" />

          <div className="absolute top-0 w-full h-full flex px-1">
            <div className="relative flex justify-center items-center w-14">
              <img
                src={Assets.Lobby.Achievement_Thumbnail_Frame}
                alt="thumbnail frame"
              />
              <img src={img} alt="thumbnail" className="absolute p-1" />
            </div>

            <div className="flex-1 flex items-center px-2">
              <h3 className="text-fansy font-kai">{name}</h3>
            </div>

            <div className="w-20 flex flex-col items-end px-1">
              <h4 className="text-xs text-yellow-100 font-kai flex items-center pt-2">
                卡片獲得次數
              </h4>

              <div className="text-white text-lg w-full flex justify-center pt-1">
                <span>X</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type BookProps = {
  items?: Achievement[];
  onItemClick: () => void;
};
function Book({ items = [], onItemClick }: BookProps) {
  return (
    <div className="flex-1 overflow-scroll pointer-events-auto m-2 grid grid-cols-3 gap-2">
      {items.map(({ img }, index) => (
        <button key={index} onClick={onItemClick}>
          <img src={img} alt="card" />
        </button>
      ))}
    </div>
  );
}

function useAchievement() {
  const [achievement, setAchievement] = useState<{
    cart: Achievement[];
    other: Achievement[];
  }>();

  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorization");

    getUserAchievement(token).then(setAchievement);
  }, [token, setAchievement]);

  return achievement;
}

type AchievementProps = {
  className?: string;
};
export default function _Achievement({ className }: AchievementProps) {
  const filters = [
    { key: "cart", label: "卡片圖鑑" },
    { key: "other", label: "特殊成就" },
  ];

  const achievement = useAchievement();

  const [active, setActive] = useState(filters[0]);

  const [item, setItem] = useState<boolean>(false);

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Lobby.Achievement_Frame} alt="frame" />

        <div className="absolute top-0 w-full h-full pt-3 px-8 pb-8 ">
          <div className="flex flex-col h-full relative">
            <nav className="flex">
              {filters.map((tab) => (
                <Tab
                  key={tab.key}
                  label={tab.label}
                  normalImage={Assets.Lobby.Ranking_Tab_Normal}
                  activeImage={Assets.Lobby.Ranking_Tab_Active}
                  active={tab.key === active.key}
                  onClick={() => setActive(tab)}
                />
              ))}
            </nav>

            {active.key === "cart" && (
              <Book
                items={achievement?.[active.key]}
                onItemClick={() => setItem(true)}
              />
            )}

            {active.key === "other" && (
              <Special items={achievement?.[active.key]} />
            )}

            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
      </article>

      {item && (
        <Modal className="z-20" onClose={() => setItem(false)}>
          <Detail onClose={() => setItem(false)} />
        </Modal>
      )}
    </>
  );
}
