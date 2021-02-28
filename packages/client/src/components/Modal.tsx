import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};
export function Modal({ children }: ModalProps) {
  return (
    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 pointer-events-auto">
      {children}
    </div>
  );
}
