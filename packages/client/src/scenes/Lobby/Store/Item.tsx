import clsx from "clsx";
import Assets from "assets";

import { StoreItem } from "types";

type ItemCollectionBoxProps = {
  className?: string;
  icon?: string;
  totalNumber: number;
  currentNumber: number;
};

function ItemCollectionBox({
  className = "",
  icon = Assets.Lobby.Store_Gem_Sm,
  totalNumber,
  currentNumber,
}: ItemCollectionBoxProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center text-xxs lg:text-xl",
        className
      )}
    >
      <img
        className="ml-3 w-12 lg:w-auto"
        src={Assets.Lobby.Store_Number_Frame_Bg}
        alt="store number frame"
      />

      <div className="absolute w-6 lg:w-auto">
        <img src={icon} alt="store gem sm" />
      </div>

      <div
        className={clsx(
          "absolute text-green-500 font-bold",
          "right-2 lg:right-4 lg:space-x-1"
        )}
      >
        <span className={clsx(currentNumber < totalNumber && "text-red-600")}>
          {currentNumber}
        </span>

        <span>/</span>

        <span>{totalNumber}</span>
      </div>
    </div>
  );
}
type ItemButtonProps = {
  alive: boolean;
  onClick?: () => void;
};
function ItemButton({ alive, onClick }: ItemButtonProps) {
  return (
    <div className="w-1/4 text-xs lg:text-xl">
      <button
        className={clsx(
          "h-full relative flex items-center",
          alive ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={onClick}
      >
        <img
          className="h-full w-full"
          src={
            alive
              ? Assets.Lobby.Store_Button_Regular
              : Assets.Lobby.Store_Button_Disable
          }
          alt="store button"
        />

        <p className="absolute w-full text-center font-kai mb-px">兌換</p>
      </button>
    </div>
  );
}

type ItemProps = {
  item: StoreItem;
  onExchange: () => void;
};
export default function Item({ item, onExchange }: ItemProps) {
  const alive = item.requirements.every(
    ({ count, accumulate }) => accumulate >= count
  );

  return (
    <div className="relative flex justify-center items-center">
      <img src={Assets.Lobby.Store_Item_Bar_Bg} alt="store item bar bg" />

      <div className="absolute w-full flex space-x-2 px-4">
        <div className="relative flex justify-center items-center w-1/8 lg:w-1/6">
          <img
            className="p-0.5 lg:p-1"
            src={item.item_img || Assets.Lobby.Store_Mob_01}
            alt="store item img"
          />

          <img
            className="absolute"
            src={Assets.Lobby.Store_Item_Frame}
            alt="store item frame"
          />
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-1/4">
            <p className="font-kai text-fansy text-xs lg:text-2xl">
              {item.name}
            </p>
          </div>

          <div className="w-3/4 flex justify-between items-center space-x-4">
            <div className="flex-1 grid grid-cols-2 gap-4">
              {item.requirements.map(({ type, count, accumulate }) => (
                <ItemCollectionBox
                  key={type}
                  icon={
                    type === "item"
                      ? Assets.Lobby.Store_Item_Card
                      : Assets.Lobby.Store_Gem_Sm
                  }
                  currentNumber={accumulate}
                  totalNumber={count}
                />
              ))}
            </div>

            <ItemButton alive={alive} onClick={onExchange} />
          </div>
        </div>
      </div>
    </div>
  );
}
