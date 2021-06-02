import React from "react";
import clsx from "clsx";
import Assets from "assets";

import { ItemDataProps } from "types";

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
    <div className={clsx("relative h-6 flex items-center", className)}>
      <img
        className="h-4 ml-3"
        src={Assets.Lobby.Store_Number_Frame_Bg}
        alt="store number frame"
      />
      <div className="absolute w-6">
        <img src={icon} alt="store gem sm" />
      </div>
      <div className="absolute text-green-500 text-xxs font-bold right-0.5">
        <span className={clsx(currentNumber < totalNumber && "text-red-600")}>
          {currentNumber}
        </span>
        <span>/{totalNumber}</span>
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
    <div className="h-7 w-16">
      <button className="h-full relative flex items-center" onClick={onClick}>
        <img
          className="h-full w-full"
          src={
            alive
              ? Assets.Lobby.Store_Button_Regular
              : Assets.Lobby.Store_Button_Disable
          }
          alt="store button"
        />

        <p className="absolute w-full text-center text-xxs font-kai mb-px">
          兌換
        </p>
      </button>
    </div>
  );
}

type ItemProps = {
  item: ItemDataProps;
};
export default function Item({ item }: ItemProps) {
  const isAlive =
    item.cardCurrentNumber >= item.cardTotalNumber &&
    item.gemCurrentNumber >= item.gemTotalNumber
      ? true
      : false;

  return (
    <div className="relative h-12 flex justify-center items-center">
      <div className="m-1">
        <img src={Assets.Lobby.Store_Item_Bar_Bg} alt="store item bar bg" />
      </div>

      <div className="absolute w-full flex space-x-2 px-2">
        <div className="w-14">
          <img src={item.itemImg} alt="store item img" />
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-1/4">
            <p className="font-kai text-fansy text-xs">{item.title}</p>
          </div>

          <div className="w-3/4 flex justify-between items-center">
            <ItemCollectionBox
              currentNumber={item.gemCurrentNumber}
              totalNumber={item.gemTotalNumber}
            />

            <ItemCollectionBox
              className="ml-4"
              icon={item.cardImg}
              currentNumber={item.cardCurrentNumber}
              totalNumber={item.cardTotalNumber}
            />

            <ItemButton alive={isAlive} />
          </div>
        </div>
      </div>
    </div>
  );
}
