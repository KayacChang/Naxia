import React from "react";
import { useState, ReactNode } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Modal } from "components/lobby/Modal";
import SideButton from "./SideButton";

type SystemModalProps = {
  title?: string;
  button?: string;
  onConfirm?: () => void;
};
function SystemModal({ title, button, onConfirm }: SystemModalProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex justify-center items-center">
        <img
          className="w-3/4"
          src={Assets.Common.Announcement_Background}
          alt="modal announcement background"
        />

        <TextFancyShadow
          className={clsx(
            "absolute top-10 lg:top-20",
            "font-bold tracking-wide",
            "text-3xl lg:text-5xl"
          )}
        >
          {title}
        </TextFancyShadow>

        <div
          className={clsx(
            "absolute top-1/4",
            "w-1/3 h-2/3 py-4 lg:py-8",
            "text-xl lg:text-3xl",
            "grid place-content-evenly gap-6 lg:gap-9"
          )}
        >
          <TextFancyShadow className="w-full">今日福利活動</TextFancyShadow>
          <TextFancyShadow className="w-full">超額回饋玩家</TextFancyShadow>
          <TextFancyShadow className="w-full">
            200%爆率 500%經驗
          </TextFancyShadow>

          {button && (
            <div className="w-full flex justify-center items-start">
              <button
                className={clsx(
                  "relative flex justify-center items-center",
                  "w-32 lg:w-48",
                  "text-base lg:text-2xl"
                )}
                onClick={onConfirm}
              >
                <img src={Assets.Common.Modal_Button} alt="button" />

                <span className="absolute text-white font-noto tracking-widest">
                  {button}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type TextFancyShadowProps = {
  className?: string;
  children: ReactNode;
};
function TextFancyShadow({ className, children }: TextFancyShadowProps) {
  return (
    <div className={className}>
      <div className={clsx("flex justify-center relative")}>
        <div className="text-2d">{children}</div>
        <div className="text-fansy absolute top-0">{children}</div>
        <style>{`
      .text-2d{
        color: #fdde63;
        text-shadow: 0px -0.5px 0px #FFFFFF, 2px 2px 0px #673409;
      }
      `}</style>
      </div>
    </div>
  );
}

const icon = {
  key: "announcement",
  icons: {
    normal: Assets.Common.Sidebar_Announcement,
  },
  href: "#",
};
export function Announcement() {
  const [isAnnouncementOpen, setAnnouncementOpen] = useState(false);

  return (
    <>
      <SideButton
        label="公告"
        img={icon.icons.normal}
        onClick={() => setAnnouncementOpen(true)}
      />

      {isAnnouncementOpen && (
        <Modal onClose={() => setAnnouncementOpen(false)}>
          <SystemModal
            title="公告"
            button="確認"
            onConfirm={() => setAnnouncementOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
