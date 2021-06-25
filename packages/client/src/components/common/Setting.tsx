import { useState, useEffect } from "react";
import Assets from "assets";
import { Modal, SystemModal } from "components";
import { Range } from "react-range";
import {
  selectIsShowNPC,
  selectBGMVolume,
  selectEffectVolume,
  useAppDispatch,
  useAppSelector,
  NPC,
  BGM,
  Effect,
} from "system";
import SideButton from "./SideButton";

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
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  return (
    <div className="flex-1 flex items-center space-x-8">
      <p className="whitespace-nowrap lg:text-2xl">{label}</p>

      <div className="relative flex items-center">
        <img src={Assets.Common.Setting_Volume_Bottom} alt="background" />

        {
          isiPad ? (
            <div className="absolute custom_range_container mx-1.5 w-11/12 h-full">
              <img
                className="absolute top-1/2 set_transform h-full"
                style={{
                  clipPath: `inset(0 ${100 - value}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - value}% 0 0)`,
                }}
                src={Assets.Common.Setting_Volume_Bar}
                alt="bar"
              />
              <img
                alt="controller"
                src={Assets.Common.Setting_Volume_Controller}
                className="absolute top-1/2 transform -translate-y-1/2 pointer-events-auto w-5 lg:w-10"
                style={{
                  left: `${
                    value > 5 ? value - 5 : value
                  }%`
                }}
              />
              <input
                max={max}
                min={min}
                step={step}
                type="range"
                value={value}
                className="custom_range absolute w-full h-full top-1/2 set_transform"
                onChange={({target}) => onChange(Number(target.value))}
              />
            </div>
          ) : (
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
                      className="transform translate-y-px lg:translate-y-2px"
                      style={{
                        clipPath: `inset(0 ${100 - value}% 0 0)`,
                        WebkitClipPath: `inset(0 ${100 - value}% 0 0)`,
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
                  className="absolute top-0  pointer-events-auto w-5 lg:w-10"
                  src={Assets.Common.Setting_Volume_Controller}
                  alt="controller"
                />
              )}
            />
          )
        }
      </div>
    </div>
  );
}

type CheckBoxProps = {
  label: string;
  isShow: boolean;
  onChange: (isShow: boolean) => void;
};
function CheckBox({ label, isShow, onChange }: CheckBoxProps) {
  return (
    <div className="flex-1 flex items-center space-x-8">
      <p className="whitespace-nowrap lg:text-2xl">{label}</p>

      <button
        className="relative flex items-center outline-none focus:outline-none"
        style={{ background: "none", border: 0 }}
        onClick={() => onChange(!isShow)}
      >
        <img
          className="w-6 block"
          src={Assets.Common.Setting_Check_Box_BG}
          alt="Setting_Check_Box_BG"
        />
        {isShow ? (
          <img
            className="w-7 absolute max-w-none"
            style={{ bottom: "10%", right: "-5%" }}
            src={Assets.Common.Setting_Check_Box_Icon}
            alt="Setting_Check_Box_Icon"
          />
        ) : null}
      </button>
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
  const isShowNPC = useAppSelector(selectIsShowNPC);

  function resetVolume() {
    dispatch(NPC.isShow(true));
    dispatch(BGM.volume(0.8));
    dispatch(Effect.volume(0.8));
  }

  const [reset, setReset] = useState(false);

  const isiPad = document.querySelector("html")?.classList.contains("isIpad");

  useEffect(() => {
    if (reset || !isiPad) return;
    setReset(true);
    setTimeout(() => setReset(false), 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingOpen, isiPad]);

  useEffect(() => {
    if (!reset || !isiPad) return;
    dispatch(BGM.volume(bgmVolume));
    dispatch(Effect.volume(effectVolume));
    dispatch(NPC.isShow(isShowNPC));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <>
      <SideButton
        label="設定"
        img={icon.icons.normal}
        onClick={() => setSettingOpen(true)}
      />

      {isSettingOpen && (
        <Modal className="z-10" onClose={() => setSettingOpen(false)}>
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

              <CheckBox
                label="NPC顯示"
                isShow={isShowNPC}
                onChange={(value) => dispatch(NPC.isShow(value))}
              />
            </div>
          </SystemModal>
        </Modal>
      )}
    </>
  );
}
