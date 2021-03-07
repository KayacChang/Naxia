import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useWebSocket, WebSocketProvider } from "./websocket";

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

interface Response<T> {
  type: string;
  data: T;
}

export function useSubscript<T>(type: string) {
  const [{ status, message }] = useWebSocket();

  if (status === "close" || !message) {
    return;
  }

  const res = JSON.parse(message) as Response<T>;
  if (res.type !== type) {
    return;
  }

  return res.data;
}

export function useNetwork() {
  const [{ status }, send] = useWebSocket();

  if (status === "close") {
    return;
  }

  return send;
}
