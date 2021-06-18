import clsx from "clsx";
import Assets from "assets";
import { StoreItem } from "types";
import numeral from "numeral";

type ItemCollectionBoxProps = {
  className?: string;
  icon?: string;
  item?: any;
  totalNumber: number;
  currentNumber: number;
};

function ItemCollectionBox({
  className = "",
  item,
  icon = Assets.Lobby.Store_Gem_Sm,
  totalNumber,
  currentNumber,
}: ItemCollectionBoxProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center text-xxs lg:text-base 2xl:text-xl",
        className
      )}
    >
      <img
        className="ml-4"
        src={Assets.Lobby.Store_Number_Frame_Bg}
        alt="store number frame"
      />

      <div className="absolute w-6 lg:w-1/2 xl:w-auto">
        <img src={icon} alt="store gem sm" />
      </div>

      <div
        className={clsx(
          "absolute text-green-500 font-bold",
          "-right-2 xl:right-0 2xl:right-4 xl:space-x-1"
        )}
      >
        <span className={clsx(currentNumber < totalNumber && "text-red-600")}>
          {numeral(Math.min(currentNumber, totalNumber)).format("0 a")}
        </span>

        <span>/</span>

        <span>{numeral(totalNumber).format("0 a")}</span>
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
                  item={item}
                  icon={
                    type === "item"
                      ? item.item_img?.toString()
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
