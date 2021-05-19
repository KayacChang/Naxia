import { Button } from "components/Button";
import { Item } from "types";
import { useState } from "react";
import { Modal, Tab } from "components";
import clsx from "clsx";
import Assets from "assets";

function qualityCheck(quality: number) {
  // 這裡要重新設定 quality 對應 顏色

  switch (quality) {
    case 0:
      return { img: Assets.Lobby.Repo_Item_Epic, color: "BlueViolet" };
    case 1:
      return {
        img: Assets.Lobby.Repo_Item_Legendary,
        color: "Orange",
      };
    case 2:
      return { img: Assets.Lobby.Repo_Item_Rare, color: "DeepSkyBlue" };
    case 3:
      return { img: Assets.Lobby.Repo_Item_Uncommon, color: "GreenYellow" };
    default:
      return { img: Assets.Lobby.Repo_Item_Normal, color: "black" };
  }
}

type ItemGridProps = Item & {
  onClick?: () => void;
};
function ItemGrid({ onClick, count, name, img, quality }: ItemGridProps) {
  return (
    <button className="relative text-white" onClick={onClick}>
      <img src={qualityCheck(quality).img} alt="Item frame" />

      <img className="absolute top-0" src={img} alt={name} />

      <span className="absolute bottom-0 right-0 text-xs mx-1">{count}</span>
    </button>
  );
}

type DetailProps = Item & {
  onConfirm?: () => void;
  onClose?: () => void;
};
function Detail({ name, img, point, quality, description }: DetailProps) {
  return (
    <div className="text-white flex justify-center">
      <div className="flex flex-col h-full space-y-1 absolute justify-center items-center w-2/3">
        <div className="relative flex w-20 h-20 mx-auto">
          <img src={qualityCheck(quality).img} alt="items frame" />
          <div className="absolute p-2">
            <img src={img} alt="items" />
          </div>
        </div>

        <div className="relative w-1/2">
          <img src={Assets.Lobby.Repo_Item_Detail_Bg} alt="items detail bg" />
          <div
            className="absolute top-0 w-full text-center pt-1 px-3
          "
          >
            <h3
              className="text-lg mb-1"
              style={{ color: qualityCheck(quality).color }}
            >
              {name}
            </h3>

            <p className="text-sm mb-3">
              <span>擁有: </span>
              <span className="ml-2 text-yellow-500">{point}</span>
            </p>

            <p className="w-full text-left text-xs text-gray-500">
              {description || "未知的物品。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type RepositoryProps = {
  className?: string;
  items: Item[];
};
export default function Repository({ className, items }: RepositoryProps) {
  const filters = [
    { key: "all", label: "全部", cond: () => true },
    { key: "card", label: "卡牌", cond: () => true },
    { key: "chip", label: "碎片", cond: () => true },
  ];
  const [active, setActive] = useState(filters[0]);

  const [item, setItem] = useState<Item | undefined>();

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Lobby.Repo_Frame_Outer} alt="repository frame outer" />

        <div className="absolute top-0 w-full h-full pt-10 pb-6 px-6">
          <nav>
            {filters.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.label}
                normalImage={Assets.Lobby.Repo_Tab_Normal}
                activeImage={Assets.Lobby.Repo_Tab_Active}
                active={tab.key === active.key}
                onClick={() => setActive(tab)}
              />
            ))}
          </nav>

          <div className="relative">
            <img
              src={Assets.Lobby.Repo_Frame_Inner}
              alt="repository frame inner"
            />

            <div className="absolute top-0 w-full max-h-full overflow-y-auto pointer-events-auto grid grid-cols-7 gap-1 p-1">
              {items.filter(active.cond).map((item) => (
                <ItemGrid
                  key={item.id}
                  {...item}
                  onClick={() => setItem(item)}
                  quality={item.quality}
                />
              ))}
            </div>

            <img
              className="absolute bottom-0"
              src={Assets.Lobby.Repo_HR}
              alt="repository frame horizontal row"
            />

            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          </div>
        </div>
      </article>

      {item && (
        <Modal className="z-20" onClose={() => setItem(undefined)}>
          <Detail {...item} onClose={() => setItem(undefined)} />
        </Modal>
      )}
    </>
  );
}
