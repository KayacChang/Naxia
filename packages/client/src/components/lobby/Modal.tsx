import React, { Component }  from 'react';
import clsx from "clsx";
import { ReactNode } from "react";
import { useViewport } from "system";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};
export function Modal({ children, className, onClose }: ModalProps) {
  const { width, height } = useViewport();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full z-50 flex justify-center",
        className
      )}
    >
      <div
        className="relative"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div
          className="bg-black bg-opacity-75 absolute w-full h-full top-0 pointer-events-auto -z-10"
          onClick={onClose}
        ></div>

        {children}
      </div>
    </div>
  );
}
