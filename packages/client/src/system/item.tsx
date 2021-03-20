import { ReactNode } from "react";

type ItemServiceProps = {
  children: ReactNode;
};
export default function ItemSerivce({ children }: ItemServiceProps) {
  return <>{children}</>;
}
