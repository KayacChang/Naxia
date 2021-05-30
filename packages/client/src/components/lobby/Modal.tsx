import React from "react";
import clsx from "clsx";
import { UI } from "layers";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};
export function Modal({ children, className, onClose }: ModalProps) {
  return (
    <UI className={clsx("flex items-center", className)}>
      <div
        className="bg-black bg-opacity-75 absolute w-full h-full top-0 pointer-events-auto -z-10"
        onClick={onClose}
      ></div>

      {children}
    </UI>
  );
}
