import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import invariant from "tiny-invariant";

type WebSocketStatus = "connect" | "close";
type WebSocketAction =
  | { type: "connect" }
  | { type: "subscript"; message: string }
  | { type: "close"; message: string };
type WebSocketState = {
  status: WebSocketStatus;
  message?: string;
  error?: string;
};
type WebSocketSend = (data: string) => void;

const WebSocketContext = createContext<
  [WebSocketState | undefined, WebSocketSend | undefined]
>([undefined, undefined]);

function WebSocketReducer(
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState {
  if (action.type === "connect") {
    return { status: "connect" };
  }

  if (action.type === "subscript") {
    return { ...state, message: action.message };
  }

  if (action.type === "close") {
    return { status: "close", error: action.message };
  }

  return state;
}

export function useWebSocket(): [WebSocketState, WebSocketSend] {
  const [state, send] = useContext(WebSocketContext);

  invariant(
    state && send,
    "useWebSocketState must be used within a WebSocketProvider"
  );

  return [state, send];
}

type WebSocketProviderProps = {
  url: string;
  children: ReactNode;
};
export function WebSocketProvider({ url, children }: WebSocketProviderProps) {
  const [ws] = useState(() => new WebSocket(url));
  const [state, dispatch] = useReducer(WebSocketReducer, { status: "close" });

  useEffect(() => {
    ws.addEventListener("open", () => dispatch({ type: "connect" }));

    ws.addEventListener("message", (event) =>
      dispatch({ type: "subscript", message: event.data })
    );

    ws.addEventListener("error", () =>
      dispatch({ type: "close", message: "WebSocket connection failed" })
    );

    ws.addEventListener("close", (event) =>
      dispatch({ type: "close", message: event.reason })
    );

    return () => ws.close();
  }, [ws]);

  function send(data: string) {
    ws.send(data);
  }

  return (
    <WebSocketContext.Provider value={[state, send]}>
      {children}
    </WebSocketContext.Provider>
  );
}
