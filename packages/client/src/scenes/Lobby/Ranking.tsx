import React from "react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Tab } from "components";
import { currency } from "utils";
import { getRank } from "api";
import { selectToken, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { Ranking } from "types";

type RankingItemProps = {
  rank: number;
  userName: string;
  point: number;
};
function RankingItem({ rank, userName, point }: RankingItemProps) {
  return (
    <div className="relative text-white text-xs">
      <img
        src={Assets.Lobby.Ranking_Item_Background}
        alt="ranking item background"
      />

      <div className="absolute top-0 w-full h-full">
        <div className="relative w-full h-full flex items-center pr-3">
          <div className="absolute w-10 transform -translate-x-1/2">
            <img
              src={
                rank > 3
                  ? Assets.Lobby.Ranking_OtherNo
                  : Assets.Lobby[`Ranking_No${rank}`]
              }
              alt="Ranking"
            />
          </div>

          <div className="relative w-7 ml-5 flex justify-center items-center">
            <img
              src={Assets.Lobby.Ranking_Avatar_Background}
              alt="background"
            />

            <img
              className="absolute w-full p-0.5"
              src={Assets.Lobby.Ranking_Avatar}
              alt="avatar"
            />
          </div>

          <p className="font-kai flex-1 mx-2">{userName}</p>

          <p className="flex-1 flex justify-end text-fansy">
            {currency(point)}
          </p>
        </div>
      </div>
    </div>
  );
}

type Filter = {
  key: "achievement" | "sp" | "exp";
  label: string;
};
type RankingProps = {
  className?: string;
};

export default function Rank({ className }: RankingProps) {
  const filters: Filter[] = [
    { key: "achievement", label: "成就排名" },
    { key: "sp", label: "SP排名" },
    { key: "exp", label: "Exp排名" },
  ];
  const [active, setActive] = useState(filters[0]);

  const [ranking, setRanking] = useState<Ranking>();

  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorization");

    getRank(token).then(setRanking);
  }, [token]);

  const data = ranking?.[active.key].data;
  const current = ranking?.[active.key].current;
  const updated = ranking?.[active.key].updated;

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Lobby.Ranking_Background} alt="ranking background" />

        <div className="absolute top-0 w-full h-full pt-10 pb-18 px-8 flex flex-col">
          <nav className="relative flex justify-between">
            <div className="flex">
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
            </div>

            <div className="relative flex justify-center items-center w-24 text-xxs font-kai text-yellow-700">
              <img
                src={Assets.Lobby.Ranking_UpdateTime_background}
                alt="ranking updateTime background"
              />

              <div className="absolute">更新時間: {updated?.split(" ")[0]}</div>
            </div>
          </nav>

          <div className="relative flex-1">
            <div
              className="w-full space-y-2 py-2 pl-6 pr-2 overflow-scroll pointer-events-auto"
              style={{ height: `9.5rem` }}
            >
              {data?.map((user, index) => (
                <RankingItem
                  key={user.name}
                  rank={user.rank}
                  userName={user.name}
                  point={user.value}
                />
              ))}
            </div>

            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75"></div>

            {current && (
              <div className="absolute bottom-0 transform translate-y-full py-2 pl-6 pr-2">
                <RankingItem
                  rank={current.rank}
                  userName={current.name}
                  point={current.value}
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
