import React from "react";
import { ReactNode } from "react";
import Assets from "assets";
import clsx from "clsx";

type TitleProps = {
  children: ReactNode;
};
function Title({ children }: TitleProps) {
  return (
    <div className={clsx("absolute -top-4 w-40", "transform lg:scale-150")}>
      <div className="relative flex justify-center items-center">
        <img src={Assets.Common.Modal_Title} alt="modal frame title" />

        <h2 className="absolute font-noto text-yellow-300 mt-1 tracking-widest">
          {children}
        </h2>
      </div>
    </div>
  );
}

type SystemModalProps = {
  type?: "default" | "history";
  title?: string;
  children?: ReactNode;
  className?: string;
  button?: string;
  disalbeButton?: boolean;
  onConfirm?: () => void;
  subButton?: string;
  customFunc?: () => void;
  onClose?: () => void;
};
function Default({
  title,
  children,
  className,
  button,
  disalbeButton,
  onConfirm,
  subButton,
  customFunc,
  onClose,
}: SystemModalProps) {
  return (
    <div className={"flex justify-center pointer-events-auto"}>
      <div className="relative w-8/12 m-2 flex justify-center">
        <div>
          <img src={Assets.Common.Modal_Frame_Outer} alt="modal frame outer" />
        </div>

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
                <Button
                  img={Assets.Common.Setting_Reset_Button}
                  disabled={disalbeButton}
                  onClick={customFunc}
                >
                  {subButton}
                </Button>
              </div>
            )}

            {button && (
              <div className="flex-1 flex justify-center items-center">
                <Button
                  img={Assets.Common.Modal_Button}
                  disabled={disalbeButton}
                  onClick={onConfirm}
                >
                  {button}
                </Button>
              </div>
            )}
          </div>
        </div>

        {title && <Title>{title}</Title>}

        {onClose && <Close onClick={onClose} />}
      </div>
    </div>
  );
}

type CloseProps = {
  onClick: () => void;
};
function Close({ onClick }: CloseProps) {
  return (
    <button
      className={clsx(
        "absolute -top-5 -right-5 w-12",
        "transform lg:scale-150"
      )}
      onClick={onClick}
    >
      <img src={Assets.Common.Modal_Close} alt="close button" />
    </button>
  );
}

type ButtonProps = {
  img: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
function Button({ img, children, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        "w-32 relative flex justify-center items-center",
        "transform lg:scale-150",
        disabled && "pointer-events-none filter grayscale"
      )}
      onClick={onClick}
    >
      <img src={img} alt="button" />

      <span className="absolute text-white font-kai tracking-widest">
        {children}
      </span>
    </button>
  );
}

function History({
  children,
  title,
  onClose,
  button,
  onConfirm,
}: SystemModalProps) {
  return (
    <div className="w-11/12 relative flex justify-center pointer-events-auto m-2">
      <img src={Assets.Common.Avatar_History_Frame} alt="modal frame outer" />

      <div className="absolute top-0 w-full h-full flex flex-col">
        {children}
      </div>

      {button && (
        <div className="absolute bottom-0 flex-1 flex justify-center items-center transform translate-y-1/2">
          <Button img={Assets.Common.Modal_Button} onClick={onConfirm}>
            {button}
          </Button>
        </div>
      )}

      {title && <Title>{title}</Title>}

      {onClose && <Close onClick={onClose} />}
    </div>
  );
}

export function SystemModal({ type = "default", ...props }: SystemModalProps) {
  return (
    <>
      {type === "default" && <Default {...props} />}

      {type === "history" && <History {...props} />}
    </>
  );
}
