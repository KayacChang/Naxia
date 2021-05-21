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

function splitRankNumber(rank: number): Array<string> {
  const rankStr = String(rank);
  const rankChar = rankStr.split("");
  return rankChar;
}

function formatPoint(point: number): string {
  const numStr = String(point);
  const numChar = numStr.split("").reverse();
  const newNumArrayRe = numChar.map((char, index) => {
    if (index !== 0 && index % 3 === 0) return [",", char];
    return char;
  });
  const newNumArray = newNumArrayRe.flat().reverse().join("");
  return newNumArray;
}

function RankingItem({
  rank,
  userName,
  point,
}: {
  rank: number;
  userName: string;
  point: number;
}) {
  return (
    <div className="relative mb-2 text-white text-xs ">
      <img
        src={Assets.Lobby.Ranking_Item_Background}
        alt="ranking item background"
      />
      <div className="absolute w-10 h-full top-0 left-0 transform -translate-x-1/2 flex justify-center items-center">
        <img
          className={`absolute ${rank > 3 ? "w-8" : ""}`}
          src={
            rank > 3
              ? Assets.Lobby.Ranking_OtherNo
              : Assets.Lobby[`Ranking_No${rank}`]
          }
          alt="Ranking"
        />
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
      </div>
      <div className="absolute w-7 top-1/2 transform -translate-y-1/2 left-6 flex justify-center items-center">
        <img
          className="absolute"
          src={Assets.Lobby.Ranking_Avatar_Background}
          alt="background"
        />
        <img className="absolute" src={Assets.Lobby.Ranking_Avatar} alt="" />
      </div>
      <div className="absolute font-kai top-1/2 transform -translate-y-1/2 left-16">
        {userName}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-56 text-fansy flex justify-center items-center">
        {formatPoint(point)}
      </div>
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
        <div className="absolute top-0 w-full h-full pt-10 pb-17 px-8">
          <nav className="relative">
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
            <div className="absolute w-24 top-0 right-0 text-xxs font-kai text-yellow-700 whitespace-nowrap">
              <img
                className="w-full h-auto absolute"
                src={Assets.Lobby.Ranking_UpdateTime_background}
                alt="ranking updateTime background"
              />
              <div className="absolute">更新時間:2021/03/03</div>
            </div>
          </nav>

          <div className="relative pl-8 pr-2 h-5/6 overflow-y-scroll pointer-events-auto">
            {fakeUser.map((user) => (
              <RankingItem
                key={user.rank}
                rank={user.rank}
                userName={user.username}
                point={user.point}
              />
            ))}
          </div>
          <div className="w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75 transform -translate-y-6"></div>

          <div className="absolute bottom-0 transform -translate-y-7 pl-8 pr-10">
            <RankingItem rank={40} userName={"current user"} point={12312} />
          </div>
        </div>
      </article>
    </>
  );
}
