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
      <div className="w-full relative flex justify-center pointer-events-auto my-4 mx-28">
        <img
          className="absolute top-0 w-full h-4/5"
          src={Assets.Common.Announcement_Background}
          alt="modal announcement background"
        />

        <div className="w-full h-full my-6 flex flex-col italic z-50">
          <TextFancyShadow className="w-full text-3xl font-bold tracking-wide">
            {title}
          </TextFancyShadow>

          <div className="w-full h-full flex-1 flex flex-wrap justify-between content-between text-center pt-10 pb-20">
            <TextFancyShadow className="w-full text-2xl">
              今日福利活動
            </TextFancyShadow>
            <TextFancyShadow className="w-full text-2xl">
              超額回饋玩家
            </TextFancyShadow>
            <TextFancyShadow className="w-full text-xl">
              200%爆率 500%經驗
            </TextFancyShadow>

            <TextFancyShadow className="w-full h-6"> </TextFancyShadow>

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
    <div className={clsx("flex justify-center", className)}>
      <div className="absolute text-fansy">{children}</div>
      <div className="text-2d">{children}</div>
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
        <div className="absolute text-fansy bottom-2 right-0">公告</div>
        <button className="" onClick={() => setAnnouncementOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>
      <div className="absolute left-0">
        {isAnnouncementOpen && (
          <Modal onClose={() => setAnnouncementOpen(false)}>
            <SystemModal
              title="公告"
              button="確認"
              onConfirm={() => setAnnouncementOpen(false)}
            ></SystemModal>
          </Modal>
        )}
      </div>
    </>
  );
}
