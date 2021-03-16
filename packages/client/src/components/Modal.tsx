import clsx from "clsx";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  className?: string;
};
export function Modal({ children, className }: ModalProps) {
  return (
    <div
      className={clsx(
        "absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 pointer-events-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
