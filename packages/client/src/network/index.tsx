import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useWebSocket, WebSocketProvider, ReadyState } from "./websocket";

const queryClient = new QueryClient();

type NetworkProviderProps = {
  children: ReactNode;
};
export function NetworkProvider({ children }: NetworkProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider url={process.env.REACT_APP_WS || ""}>
        {children}
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export function useSubscript(type: string) {
  const {
    state: { readyState, lastMessage },
  } = useWebSocket();

  if (readyState !== ReadyState.OPEN || !lastMessage) {
    return;
  }

  const res = JSON.parse(lastMessage);
  if (res.type !== type) {
    return;
  }

  if (res.type === "error") {
    return res.error;
  }

  return res.data;
}

export function useNetwork() {
  const {
    state: { readyState },
    send,
  } = useWebSocket();

  if (readyState !== ReadyState.OPEN) {
    return;
  }

  return send;
}
