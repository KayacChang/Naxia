import { useSubscript } from "network";
import { ReactNode, useEffect } from "react";

type ErrorServiceProps = {
  children: ReactNode;
};
export default function ErrorService({ children }: ErrorServiceProps) {
  const error = useSubscript("error");

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return <>{children}</>;
}
