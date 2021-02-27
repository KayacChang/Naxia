import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  open?: boolean;
};
export function Modal({ children, open = true }: ModalProps) {
  if (!open) {
    return <></>;
  }

  return (
    <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50">
      {children}
    </div>
  );
}
