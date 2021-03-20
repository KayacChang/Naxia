import { ReactNode } from "react";

type ServiceProps = {
  children: ReactNode;
};
export default function Area({ children }: ServiceProps) {
  return <>{children}</>;
}
