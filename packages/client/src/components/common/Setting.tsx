import { useState } from "react";
import Assets from "assets";
import { Modal } from "components/lobby/Modal";
import SystemModal from "./SystemModal";

type SliderBarProps = {
  title: string;
  value: number;
  setValue: any;
};
function SliderBar({ title, value, setValue }: SliderBarProps) {
  function soundValueHandler(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(parseInt(event.currentTarget.value));
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

  function resetVolume() {
    setSoundValue(80);
    setMusicValue(80);
    setSettingOpen(false);
  }

  return (
    <>
      <div className="relative">
        <div className="absolute text-yellow-100 text-shadow tracking-wider bottom-2 right-0 text-sm">
          設定
        </div>
        <button className="" onClick={() => setSettingOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>
      <div className="absolute left-0">
        {isSettingOpen && (
          <Modal onClose={() => setSettingOpen(false)}>
            <SystemModal
              title="設定"
              button="確認"
              subButton="還原預設"
              onConfirm={() => setSettingOpen(false)}
              customFunc={resetVolume}
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
