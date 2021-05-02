import clsx from "clsx";
import { ReactNode } from "react";
import { useViewport } from "utils";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};
export function Modal({ children, className, onClose }: ModalProps) {
  const { width, height } = useViewport();

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={clsx("fixed top-0 z-30", className)}
    >
      <div
        className="bg-black bg-opacity-75 absolute top-0 w-full h-full pointer-events-auto -z-10"
        onClick={onClose}
      ></div>

      {children}
    </div>
  );
}
