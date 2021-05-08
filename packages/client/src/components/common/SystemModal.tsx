import { ReactNode } from "react";
import Assets from "assets";
import clsx from "clsx";
type SystemModalProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  button?: string;
  onConfirm?: () => void;
  subButton?: string;
  customFunc?: () => void;
};
export default function SystemModal({
  title,
  children,
  className,
  button,
  onConfirm,
  subButton,
  customFunc,
}: SystemModalProps) {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="w-96 relative flex justify-center pointer-events-auto m-2">
        <img src={Assets.Common.Modal_Frame_Outer} alt="modal frame outer" />

        <div className="absolute top-0 w-full h-full flex flex-col p-2">
          <div
            className={clsx(
              "relative pb-1",
              button || subButton ? "h-4/5" : "h-full"
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
            {subButton && (
              <div className="flex-1 flex justify-center items-center">
                <button
                  className="w-32 relative flex justify-center items-center"
                  onClick={customFunc}
                >
                  <img src={Assets.Common.Setting_Reset_Button} alt="button" />

                  <span className="absolute text-white font-noto tracking-widest">
                    {subButton}
                  </span>
                </button>
              </div>
            )}

            {button && (
              <div className="flex-1 flex justify-center items-center">
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
