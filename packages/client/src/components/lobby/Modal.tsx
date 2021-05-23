import clsx from "clsx";
import { ReactNode } from "react";
import { getViewPort } from "utils";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};
export function Modal({ children, className, onClose }: ModalProps) {
  const { width, height } = getViewPort();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full z-50 flex justify-center",
        className
      )}
    >
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className="relative"
      >
        <div
          className="bg-black bg-opacity-75 absolute top-0 w-full h-full pointer-events-auto -z-10"
          onClick={onClose}
        ></div>

        {children}
      </div>
    </div>
  );
}
