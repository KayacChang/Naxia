import { useState } from "react";
import Assets from "assets";
import { Modal, SystemModal } from "components";
import SideButton from "./SideButton";
import clsx from "clsx";
import { useDungeonInfo } from "system";

const icon = {
  key: "information",
  icons: {
    normal: Assets.Common.Sidebar_Information,
  },
  href: "#",
};
export function Information() {
  const info = useDungeonInfo();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SideButton
        label="資訊"
        img={icon.icons.normal}
        onClick={() => setOpen(true)}
      />

      {isOpen && (
        <Modal onClose={() => setOpen(false)}>
          <SystemModal
            title="牌桌資訊"
            button="確認"
            onConfirm={() => setOpen(false)}
          >
            <div className="relative flex justify-center items-center my-auto">
              <img src={Assets.Common.Modal_Frame_Information} alt="frame" />

              <div
                className={clsx(
                  "absolute font-kai",
                  "w-full h-full gap-2",
                  "flex flex-col",
                  "pt-2 pb-5",
                  "lg:pt-4 lg:pb-8",
                  "lg:text-2xl"
                )}
              >
                <div className="flex-1 flex justify-center items-center gap-2">
                  <span className="text-fansy text-shadow-xl filter contrast-150">
                    桌台編號:
                  </span>
                  <span className="text-white">
                    百家樂-{info?.roomInfo?.table}
                  </span>
                </div>

                <div className="flex-1 px-1/16 text-shadow-lg flex items-center gap-4">
                  <span className="text-yellow-200">荷官名稱: </span>
                  <span className="text-yellow-500">
                    {info?.roomInfo?.dealer}
                  </span>
                </div>

                <div className="flex-1 px-1/16 text-shadow-lg flex items-center gap-4">
                  <span className="text-yellow-200">遊戲局號: </span>
                  <span className="text-yellow-500">
                    {info?.roomInfo?.roundNumber}
                  </span>
                </div>

                <div className="flex-1 px-1/16 text-shadow-lg flex items-center gap-4">
                  <span className="text-yellow-200">遊戲編號: </span>
                  <span className="text-yellow-500">
                    {info?.roomInfo?.roundID}
                  </span>
                </div>

                <div className="flex-1 px-1/16 text-shadow-lg flex items-center gap-4">
                  <span className="text-yellow-200">下注限紅: </span>
                  <span className="text-yellow-500">
                    {info?.roomInfo?.limit}
                  </span>
                </div>
              </div>
            </div>
          </SystemModal>
        </Modal>
      )}
    </>
  );
}
