import React from "react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Tab, Avatar } from "components";
import { currency } from "utils";
import { getRank } from "api";
import { selectToken, useAppSelector } from "system";
import invariant from "tiny-invariant";
import { Ranking, RankingRecord } from "types";

function RankingItem({ rank, name, value, avatar }: RankingRecord) {
  return (
    <div className="relative text-white text-xs lg:text-2xl">
      <img
        src={Assets.Lobby.Ranking_Item_Background}
        alt="ranking item background"
      />

      <div className="absolute top-0 w-full h-full">
        <div className="relative w-full h-full flex items-center pr-1/16">
          <div
            className={clsx(
              "absolute transform -translate-x-1/2",
              "w-10 lg:w-auto"
            )}
          >
            <img
              src={
                rank > 3
                  ? Assets.Lobby.Ranking_OtherNo
                  : Assets.Lobby[`Ranking_No${rank}`]
              }
              alt="Ranking"
            />
          </div>

          <div
            className={clsx(
              "relative flex justify-center items-center",
              "ml-1/16",
              "w-7 lg:w-1/12"
            )}
          >
            <Avatar id={String(avatar)} />
          </div>

          <p className="font-kai flex-1 mx-2">{name}</p>

          <p className="flex-1 flex justify-end text-fansy">
            {currency(value)}
          </p>
        </div>
      </div>
    </div>
  );
}

function useRanking() {
  const [ranking, setRanking] = useState<Ranking>();

  const token = useAppSelector(selectToken);

  useEffect(() => {
    invariant(token, "Unauthorization");

    getRank(token).then(setRanking);
  }, [token]);

  return ranking;
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
  const ranking = useRanking();

  const data = ranking?.[active.key].data;
  const current = ranking?.[active.key].current;
  const updated = ranking?.[active.key].updated;

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Lobby.Ranking_Background} alt="ranking background" />

        <div
          className="absolute top-0 w-full h-full flex flex-col pt-1/10 pb-18 lg:pb-1/4"
          style={{
            paddingLeft: `${7.25}%`,
            paddingRight: `${7.25}%`,
          }}
        >
          <nav className="relative flex justify-between">
            <div className="flex">
              {filters.map((tab) => (
                <Tab
                  className="w-1/4 lg:w-auto"
                  key={tab.key}
                  label={tab.label}
                  normalImage={Assets.Lobby.Ranking_Tab_Normal}
                  activeImage={Assets.Lobby.Ranking_Tab_Active}
                  active={tab.key === active.key}
                  onClick={() => setActive(tab)}
                />
              ))}
            </div>

            <div
              className={clsx(
                "relative flex justify-center items-center font-kai text-yellow-700",
                "text-xxs lg:text-xl",
                "w-48 lg:w-1/4"
              )}
            >
              <img
                src={Assets.Lobby.Ranking_UpdateTime_background}
                alt="ranking updateTime background"
              />

              <div className="absolute">更新時間: {updated?.split(" ")[0]}</div>
            </div>
          </nav>

          <div className="relative flex-1">
            <div
              className={clsx(
                "w-full space-y-2 py-2 pl-1/16 pr-2 overflow-scroll pointer-events-auto",
                "h-40 lg:h-96"
              )}
            >
              {data?.map((user) => (
                <RankingItem key={user.name} {...user} />
              ))}
            </div>

            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75"></div>

            {current && (
              <div className="absolute bottom-0 transform translate-y-full py-2 pl-6 pr-2">
                <RankingItem {...current} />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
