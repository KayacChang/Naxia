import { ReactNode, useState } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Modal } from "components/lobby/Modal";
import { Location } from "components";

type SystemModalProps = {
  children?: ReactNode;
  className?: string;
  onConfirm?: () => void;
};
export function SystemModal({
  children,
  className,
  onConfirm,
}: SystemModalProps) {
  return (
    <div className="flex h-full justify-center pt-10 pb-16 pr-3">
      <div className="w-126 relative flex justify-center pointer-events-auto">
        <img src={Assets.Lobby.Store_Frame_Bg} alt="store frame bg" />

        <div className="absolute top-0 w-full h-full flex flex-col p-2">
          <div className={clsx("relative pb-1", className)}>
            <div
              className={clsx(
                "absolute top-0 w-full h-full flex flex-col",
                className
              )}
            >
              {children}
            </div>
          </div>

          <div className="flex-1 flex justify-between items-center"></div>
        </div>
        <div className="absolute bottom-4 w-full px-5">
          <img
            src={Assets.Lobby.Store_Frame_Top_Mask}
            alt="store frame top mask"
            className=" w-full"
          />
        </div>
      </div>
    </div>
  );
}

const icon = {
  key: "setting",
  icons: {
    normal: Assets.Common.Sidebar_Setting,
  },
  href: "#",
};

type StoreProps = {
  className: string;
};
export default function Store({ className }: StoreProps) {
  return (
    <>
      <div className="absolute w-full h-full left-0 top-0">
        <div
          className="absolute top-0 w-full flex justify-center"
          style={{ zIndex: 31 }}
        >
          <Location value="兌換商店" />
        </div>
        <Modal className="z-0" onClose={() => {}}>
          <SystemModal onConfirm={() => {}}>
            <div className="h-full flex font-noto text-xs text-white">
              <div className="flex-1 flex flex-wrap justify-center items-center px-14 py-10"></div>
            </div>
          </SystemModal>
        </Modal>
      </div>
    </>
  );
}
