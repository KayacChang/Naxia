import { Button } from "components/Button";
import { Item } from "types";
import { useState } from "react";
import { Modal } from "components";
import Assets from "./assets";
import clsx from "clsx";

type ItemGridProps = Item & {
  onClick?: () => void;
};
function ItemGrid({ onClick, count, name, img }: ItemGridProps) {
  return (
    <button className="relative text-white" onClick={onClick}>
      <img src={Assets.Repo_Item_Epic} alt="Item frame" />

      <img className="absolute top-0" src={img} alt={name} />

      <span className="absolute bottom-0 right-0 text-xs mx-1">{count}</span>
    </button>
  );
}

type DetailProps = Item & {
  onConfirm?: () => void;
  onClose?: () => void;
};
function Detail({ name, img, onConfirm, onClose }: DetailProps) {
  return (
    <div className="text-white flex justify-center">
      <div className="flex flex-col space-y-2 absolute top-1/3 w-1/3">
        <div className="flex w-20 h-20 bg-white mx-auto">
          {/* <img src={IMG(img)} alt="items" /> */}
        </div>

        <div className="text-center space-y-1">
          <h3 className="bg-black bg-opacity-50">{name}</h3>

          <p className="bg-black bg-opacity-50">
            <span>Count: </span>
            <span>30</span>
          </p>
        </div>
      </div>

      <div className="p-4 space-x-4 flex justify-end absolute bottom-0 right-0">
        <Button className="bg-white text-black w-24" onClick={onConfirm}>
          Exchange
        </Button>
        <Button className="bg-white text-black w-24" onClick={onClose}>
          Back
        </Button>
      </div>
    </div>
  );
}

type ExchangeProps = Item & {
  onConfirm?: () => void;
  onClose?: () => void;
};
function Exchange({ name, onConfirm, onClose }: ExchangeProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-white w-2/3 h-2/3 flex flex-col items-center p-4">
        <h3>Confirm</h3>
        <h4>{name}</h4>

        <form className="flex-1 flex flex-col justify-center">
          <div>
            <label htmlFor="count">Count</label>
            <input type="range" name="count" id="count" />
          </div>

          <div>
            <label htmlFor="points">Points</label>
            <input type="text" name="points" id="points" />
          </div>
        </form>

        <div className="flex justify-center space-x-4">
          <Button className="border" onClick={onConfirm}>
            Confirm
          </Button>
          <Button className="border" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

type TabProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};
function Tab({ label, active, onClick }: TabProps) {
  return (
    <button className="w-16 text-white text-xs relative z-20" onClick={onClick}>
      <img className="w-full" src={Assets.Repo_Tab_Normal} alt="tab normal" />

      {active && (
        <img
          className="absolute top-1/2 left-0 transform -translate-y-1/2"
          src={Assets.Repo_Tab_Active}
          alt="tab active"
        />
      )}

      <span className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {label}
      </span>
    </button>
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
  const [exchange, setExchange] = useState<Item | undefined>();

  return (
    <>
      <article className={clsx("relative", className)}>
        <img src={Assets.Repo_Frame_Outer} alt="repository frame outer" />

        <div className="absolute top-0 w-full h-full pt-10 pb-6 px-6">
          <nav>
            {filters.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.label}
                active={tab.key === active.key}
                onClick={() => setActive(tab)}
              />
            ))}
          </nav>

          <div className="relative">
            <img src={Assets.Repo_Frame_Inner} alt="repository frame inner" />

            <div className="absolute top-0 w-full max-h-full overflow-y-auto pointer-events-auto grid grid-cols-7 gap-1 p-1">
              {items.filter(active.cond).map((item) => (
                <ItemGrid key={item.id} {...item} />
              ))}
            </div>

            <img
              className="absolute bottom-0"
              src={Assets.Repo_HR}
              alt="repository frame horizontal row"
            />

            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent opacity-75"></div>
          </div>
        </div>
      </article>

      {item && (
        <Modal className="z-20">
          <Detail
            {...item}
            onConfirm={() => setExchange(item)}
            onClose={() => setItem(undefined)}
          />
        </Modal>
      )}

      {exchange && (
        <Modal className="z-20">
          <Exchange {...exchange} onClose={() => setExchange(undefined)} />
        </Modal>
      )}
    </>
  );
}
