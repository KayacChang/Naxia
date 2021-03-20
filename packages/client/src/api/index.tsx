import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { WebSocketProvider } from "./websocket";

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

export * from "./websocket";
