import React, { Component }  from 'react';
import { useState, ReactNode } from "react";
import clsx from "clsx";
import Assets from "assets";
import { Modal } from "components/lobby/Modal";

type SystemModalProps = {
  title?: string;
  button?: string;
  onConfirm?: () => void;
};
function SystemModal({ title, button, onConfirm }: SystemModalProps) {
  return (
    <div className="flex h-full justify-center">
      <div className="w-full relative flex justify-center items-center">
        <img
          className="w-3/4"
          src={Assets.Common.Announcement_Background}
          alt="modal announcement background"
        />

        <div className="absolute top-0 flex flex-col italic h-full w-60 my-16 space-y-8 pointer-events-auto">
          <TextFancyShadow className="w-full text-3xl font-bold tracking-wide">
            {title}
          </TextFancyShadow>

          <div className="w-full h-full flex-1 flex flex-col space-y-6">
            <TextFancyShadow className="w-full text-2xl">
              今日福利活動
            </TextFancyShadow>
            <TextFancyShadow className="w-full text-2xl">
              超額回饋玩家
            </TextFancyShadow>
            <TextFancyShadow className="w-full text-xl">
              200%爆率 500%經驗
            </TextFancyShadow>

            {button && (
              <div className="w-full flex justify-center items-start">
                <button
                  className="w-32 relative flex justify-center items-center"
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
    </div>
  );
}

type TextFancyShadowProps = {
  className?: string;
  children: ReactNode;
};
function TextFancyShadow({ className, children }: TextFancyShadowProps) {
  return (
    <div className={clsx("flex justify-center relative", className)}>
      <div className="text-2d">{children}</div>
      <div className="text-fansy absolute top-0">{children}</div>
      <style>{`
      .text-2d{
        color: #fdde63;
        text-shadow: 0px -0.5px 0px #FFFFFF, 2px 2px 0px #673409;
      }
      `}</style>
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
      <div className="relative">
        <div className="absolute text-yellow-100 text-shadow tracking-wider bottom-2 right-0 text-sm">
          公告
        </div>
        <button onClick={() => setAnnouncementOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>

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
