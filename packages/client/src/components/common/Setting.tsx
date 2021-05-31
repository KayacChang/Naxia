import React from "react";
import { useState } from "react";
import Assets from "assets";
import { Modal, SystemModal } from "components";
import { Range } from "react-range";
import {
  selectBGMVolume,
  selectEffectVolume,
  useAppDispatch,
  useAppSelector,
  BGM,
  Effect,
} from "system";

type InputRangeProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};
function InputRange({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: InputRangeProps) {
  return (
    <div className="flex-1 flex items-center space-x-8">
      <p className="whitespace-nowrap">{label}</p>

      <div className="relative flex items-center">
        <img src={Assets.Common.Setting_Volume_Bottom} alt="background" />

        <Range
          step={step}
          min={min}
          max={max}
          values={[value]}
          onChange={([value]) => onChange(value)}
          renderTrack={({ props, children }) => (
            <div className="absolute">
              <div
                {...props}
                className="relative mx-1.5"
                style={{
                  ...props.style,
                }}
              >
                <img
                  style={{
                    transform: `translate(0, 1px)`,
                    clipPath: `inset(0 ${100 - value}% 0 0)`,
                  }}
                  src={Assets.Common.Setting_Volume_Bar}
                  alt="bar"
                />

                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <img
              {...props}
              className="absolute top-0 w-5 pointer-events-auto"
              src={Assets.Common.Setting_Volume_Controller}
              alt="controller"
            />
          )}
        />
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
  const dispatch = useAppDispatch();
  const effectVolume = useAppSelector(selectEffectVolume);
  const bgmVolume = useAppSelector(selectBGMVolume);

  function resetVolume() {
    dispatch(BGM.volume(0.8));
    dispatch(Effect.volume(0.8));
  }

  return (
    <>
      <div className="relative">
        <div className="absolute text-yellow-100 text-shadow tracking-wider bottom-2 right-0 text-sm">
          設定
        </div>

        <button onClick={() => setSettingOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>

      {isSettingOpen && (
        <Modal onClose={() => setSettingOpen(false)}>
          <SystemModal
            title="設定"
            button="確認"
            subButton="還原預設"
            onConfirm={() => setSettingOpen(false)}
            customFunc={resetVolume}
            onClose={() => setSettingOpen(false)}
          >
            <div className="h-full flex flex-col font-kai text-yellow-300 p-10">
              <InputRange
                label="音樂音量"
                value={bgmVolume * 100}
                onChange={(value) => dispatch(BGM.volume(value / 100))}
              />

              <InputRange
                label="音效音量"
                value={effectVolume * 100}
                onChange={(value) => dispatch(Effect.volume(value / 100))}
              />
            </div>
          </SystemModal>
        </Modal>
      )}
    </>
  );
}
