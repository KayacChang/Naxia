import { Modal } from "components/lobby/Modal";
import { useState, ReactNode } from "react";
import Assets from "assets";
import clsx from "clsx";

type SystemModalProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  confirmButton?: string;
  resetButton?: string;
  onConfirm?: () => void;
};
function SystemModal({
  title,
  children,
  className,
  confirmButton,
  resetButton,
  onConfirm,
}: SystemModalProps) {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="w-96 relative flex justify-center pointer-events-auto m-2">
        <img src={Assets.Common.Modal_Frame_Outer} alt="modal frame outer" />

        <div className="absolute top-0 w-full h-full flex flex-col p-2">
          <div
            className={clsx(
              "relative pb-1",
              confirmButton || resetButton ? "h-4/5" : "h-full"
            )}
          >
            <img
              src={Assets.Common.Modal_Frame_Inner}
              alt="modal frame inner"
              className="w-full h-full"
            />

            <div
              className={clsx(
                "absolute top-0 w-full h-full flex flex-col",
                className
              )}
            >
              {children}
            </div>
          </div>

          <div className="flex-1 flex justify-between items-center">
            {resetButton && (
              <div className="flex-1 flex justify-center items-center">
                <button
                  className="w-32 relative flex justify-center items-center"
                  onClick={onConfirm}
                >
                  <img src={Assets.Common.Setting_Reset_Button} alt="button" />

                  <span className="absolute text-white font-noto tracking-widest">
                    {resetButton}
                  </span>
                </button>
              </div>
            )}

            {confirmButton && (
              <div className="flex-1 flex justify-center items-center">
                <button
                  className="w-32 relative flex justify-center items-center"
                  onClick={onConfirm}
                >
                  <img src={Assets.Common.Modal_Button} alt="button" />

                  <span className="absolute text-white font-noto tracking-widest">
                    {confirmButton}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {title && (
          <div className="absolute -top-4 w-40">
            <div className="relative flex justify-center items-center">
              <img src={Assets.Common.Modal_Title} alt="modal frame title" />

              <h2 className="absolute font-noto text-yellow-300 mt-1 tracking-widest">
                {title}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type SliderBarProps = {
  title: string;
  value: number;
  setValue: any;
};
function SliderBar({ title, value, setValue }: SliderBarProps) {
  function soundValueHandler(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const temp = event.currentTarget.value;
    setValue(parseInt(temp));
  }
  return (
    <div className="flex-1 text-base text-yellow-400 flex justify-between">
      <p>{title}</p>
      <div className="flex justify-center items-center">
        <div className="w-40 relative flex justify-center items-center">
          <img
            className="w-40"
            src={Assets.Common.Setting_Volume_Bottom}
            alt="setting volume bottom"
          />
          <div
            className="absolute h-full left-0 overflow-hidden bg-no-repeat bg-auto"
            style={{
              top: "15%",
              left: "0.24rem",
              width: value < 60 ? value + "%" : value - 5 + "%",
              height: "90%",
              backgroundImage: "url(" + Assets.Common.Setting_Volume_Bar + ")",
              backgroundSize: "auto 100%",
            }}
          ></div>
          <div className="absolute">
            <input
              className="w-40"
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => soundValueHandler(e)}
            />
          </div>
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
export function Setting() {
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [soundValue, setSoundValue] = useState(80);
  const [musicValue, setMusicValue] = useState(80);

  return (
    <>
      <div className="">
        <button className="" onClick={() => setSettingOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>
      <div className="absolute left-0">
        {isSettingOpen && (
          <Modal onClose={() => setSettingOpen(false)}>
            <SystemModal
              title="設定"
              confirmButton="確認"
              resetButton="還原預設"
            >
              <div className="h-full flex font-noto text-xs text-white">
                <div className="flex-1 flex flex-wrap justify-center items-center px-14 py-10">
                  <SliderBar
                    title="音效音量"
                    value={soundValue}
                    setValue={setSoundValue}
                  />

                  <SliderBar
                    title="音樂音量"
                    value={musicValue}
                    setValue={setMusicValue}
                  />
                </div>
              </div>
            </SystemModal>
          </Modal>
        )}
        <style>
          {`
          input[type="range"] {
            -webkit-appearance: none;
            background: none;
            outline: none;
            border-radius: 0;
            overflow: hidden;
            cursor: pointer;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            margin-top:0.2rem;
            width: 1rem;
            height: 1rem;
            background-image:
                              url(` +
            Assets.Common.Setting_Volume_Controller +
            `);
            background-size:100%;
            background-repeat: no-repeat;
          }
        `}
        </style>
      </div>
    </>
  );
}
