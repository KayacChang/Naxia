import { ReactNode } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Modal } from "components/lobby/Modal";
import { Location } from "components";
import { ItemDataProps } from "types";
import Item from "./Item";

const mockItem: ItemDataProps[] = [
  {
    title: "哥布林碎片",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 25,
    gemTotalNumber: 20,
    cardCurrentNumber: 20,
    cardTotalNumber: 20,
  },
  {
    title: "藍色行星",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 25,
    gemTotalNumber: 20,
    cardCurrentNumber: 5,
    cardTotalNumber: 20,
  },
  {
    title: "聖騎士的首飾",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 25,
    gemTotalNumber: 20,
    cardCurrentNumber: 20,
    cardTotalNumber: 20,
  },
  {
    title: "大天使的呼吸",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 25,
    gemTotalNumber: 20,
    cardCurrentNumber: 0,
    cardTotalNumber: 20,
  },
  {
    title: "風險骰子",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 25,
    gemTotalNumber: 20,
    cardCurrentNumber: 0,
    cardTotalNumber: 20,
  },
  {
    title: "魔女的回春藥",
    itemImg: Assets.Lobby.Store_Mob_01,
    cardImg: Assets.Lobby.Store_Item_Card,
    gemCurrentNumber: 20,
    gemTotalNumber: 20,
    cardCurrentNumber: 5,
    cardTotalNumber: 5,
  },
];

type SystemModalProps = {
  children?: ReactNode;
  className?: string;
};
function SystemModal({ children, className }: SystemModalProps) {
  return (
    <div
      className={clsx("flex h-full justify-center pt-10 pb-16 pr-3", className)}
    >
      <div className="w-126 relative flex justify-center pointer-events-auto ">
        <img src={Assets.Lobby.Store_Frame_Bg} alt="store frame bg" />

        <div className="absolute top-0 w-full px-18 mt-12 text-2xl">
          <div className="h-48 w-full overflow-y-auto flex flex-col space-y-1">
            {children}
          </div>
        </div>
        <div className="absolute bottom-6 w-full px-14">
          <img
            src={Assets.Lobby.Store_Frame_Top_Mask}
            alt="store frame top mask"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

type StoreProps = {
  className: string;
};
export default function Store({ className }: StoreProps) {
  return (
    <div className={clsx("absolute w-full h-full left-0 top-0", className)}>
      <div
        className="absolute top-0 w-full flex justify-center"
        style={{ zIndex: 31 }}
      >
        <Location value="兌換商店" />
      </div>
      <Modal className="z-0" onClose={() => {}}>
        <SystemModal>
          {mockItem.map((item, index) => {
            return <Item key={index} item={item}></Item>;
          })}
        </SystemModal>
      </Modal>
    </div>
  );
}
