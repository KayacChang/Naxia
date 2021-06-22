import clsx from "clsx";
import { UI } from "layers";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};
export function Modal({ children, className, onClose }: ModalProps) {
  const isiPad = document.querySelector("html")?.classList.contains("isIpad");
  
  return (
    <UI className={clsx("flex items-center justify-center", isiPad && 'set_iPad_style', className)}>
      <div
        className="bg-black bg-opacity-75 absolute w-full h-full top-0 pointer-events-auto -z-10"
        onClick={onClose}
      ></div>

      {children}
    </UI>
  );
}
