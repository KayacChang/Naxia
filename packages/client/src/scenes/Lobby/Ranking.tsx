import React, { Component }  from 'react';
import { useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Tab } from "components";

const fakeUser = [
  {
    rank: 1,
    username: "test1",
    point: 1232,
  },
  {
    rank: 2,
    username: "test2",
    point: 12321,
  },
  {
    rank: 3,
    username: "test3",
    point: 23321,
  },
  {
    rank: 4,
    username: "test4",
    point: 2232,
  },
  {
    rank: 5,
    username: "test5",
    point: 232,
  },
  {
    rank: 6,
    username: "test6",
    point: 32,
  },
  {
    rank: 7,
    username: "test7",
    point: 565,
  },
  {
    rank: 8,
    username: "test8",
    point: 6654,
  },
  {
    rank: 9,
    username: "test9",
    point: 555555,
  },
];

function splitRankNumber(rank: number) {
  return String(rank).split("");
}

function formatPoint(point: number): string {
  return String(point)
    .split("")
    .reverse()
    .map((char, index) => (index !== 0 && index % 3 === 0 ? [",", char] : char))
    .flat()
    .reverse()
    .join("");
}

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
        <div className="relative w-full h-full flex items-center">
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
        </div>
      </div>

      {/* <div className="absolute w-10 h-full top-0 left-0 transform -translate-x-1/2 flex justify-center items-center">

        {rank > 3 && (
          <div className="absolute flex transform -translate-y-1">
            {splitRankNumber(rank).map((char) => (
              <img
                key={`${char} in ${rank}`}
                className="w-2"
                src={Assets.Lobby[`Ranking_Number${char}`]}
                alt="Ranking"
              />
            ))}
          </div>
        )}
      </div> */}

      {/* <div className="absolute w-7 top-1/2 transform -translate-y-1/2 left-6 flex justify-center items-center">
        <img
          className="absolute"
          src={Assets.Lobby.Ranking_Avatar_Background}
          alt="background"
        />

        <img
          className="absolute"
          src={Assets.Lobby.Ranking_Avatar}
          alt="avatar"
        />
      </div>

      <div className="absolute font-kai top-1/2 transform -translate-y-1/2 left-16">
        {userName}
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 left-56 text-fansy flex justify-center items-center">
        {formatPoint(point)}
      </div> */}
    </div>
  );
}

type RankingProps = {
  className?: string;
};

export default function Ranking({ className }: RankingProps) {
  const filters = [
    { key: "achievement", label: "成就排名", cond: () => true },
    { key: "sp", label: "SP排名", cond: () => true },
    { key: "exp", label: "Exp排名", cond: () => true },
  ];
  const [active, setActive] = useState(filters[0]);

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

              <div className="absolute">更新時間:2021/03/03</div>
            </div>
          </nav>

          <div className="relative flex-1 overflow-scroll pointer-events-auto">
            <div className="w-full h-full space-y-2 py-2 pl-8 pr-2">
              {fakeUser.map((user) => (
                <RankingItem
                  key={user.rank}
                  rank={user.rank}
                  userName={user.username}
                  point={user.point}
                />
              ))}
            </div>

            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          </div>

          {/* <div className="absolute bottom-0 transform -translate-y-7 pl-8 pr-10">
            <RankingItem rank={40} userName={"current user"} point={12312} />
          </div> */}
        </div>
      </article>
    </>
  );
}
