import clsx from "clsx";
import Assets from "assets";
import { Tab } from "components";
import { useState } from "react";

type AchievementProps = {
  className?: string;
};
export default function Achievement({ className }: AchievementProps) {
  const filters = [
    { key: "book", label: "卡片圖鑑", cond: () => true },
    { key: "special", label: "特殊成就", cond: () => true },
  ];
  const [active, setActive] = useState(filters[0]);

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Lobby.Achievement_Frame} alt="frame" />

        <div className="absolute top-0 w-full h-full pt-3 px-8 pb-8 flex flex-col">
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

          <div className="flex-1"></div>
        </div>
      </article>
    </>
  );
}
