import { ReadyState, useWebSocket } from "api";
import { ReactNode, useEffect } from "react";

type ErrorServiceProps = {
  children: ReactNode;
};
export default function ErrorService({ children }: ErrorServiceProps) {
  const ws = useWebSocket();
  const readyState = ws.state.readyState;
  const lastMessage = ws.state.lastMessage;

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) {
      return;
    }

    console.error(lastMessage);
  }, [ws, readyState, lastMessage]);

  return <>{children}</>;
}
