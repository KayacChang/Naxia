import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useContext,
} from "react";
import invariant from "tiny-invariant";

export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export enum Event {
  OPEN = "open",
  MESSAGE = "message",
  ERROR = "error",
  CLOSE = "close",
}

function toReadyState(readyState: number): ReadyState {
  switch (readyState) {
    case 0:
      return ReadyState.CONNECTING;
    case 1:
      return ReadyState.OPEN;
    case 2:
      return ReadyState.CLOSING;
    case 3:
      return ReadyState.CLOSED;
    default:
      throw new Error(`ReadyState ${readyState} not support`);
  }
}

type WebSocketAction =
  | { type: Event.OPEN; readyState: ReadyState }
  | { type: Event.MESSAGE; readyState: ReadyState; message: string }
  | { type: Event.ERROR; readyState: ReadyState; error: Error }
  | { type: Event.CLOSE; readyState: ReadyState; code: number };

type WebSocketState = {
  readyState: ReadyState;
  lastMessage?: any;
  error?: Error;
  number?: number;
};

type WebSocketSendFunction = (
  data: string | ArrayBufferLike | Blob | ArrayBufferView | Object
) => void;

type WebSocketCloseFunction = (
  code?: number | undefined,
  reason?: string | undefined
) => void;

type ReactWebSocket = {
  state: WebSocketState;
  send: WebSocketSendFunction;
  close: WebSocketCloseFunction;
};
const WebSocketContext = createContext<ReactWebSocket | undefined>(undefined);

function WebSocketReducer(
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState {
  switch (action.type) {
    case Event.OPEN:
      return { ...state, readyState: action.readyState };
    case Event.MESSAGE:
      return {
        ...state,
        readyState: action.readyState,
        lastMessage: action.message,
      };
    case Event.ERROR:
      return { ...state, readyState: action.readyState, error: action.error };
    case Event.CLOSE:
      return {
        ...state,
        readyState: action.readyState,
        number: action.code,
      };
    default:
      return state;
  }
}

type WebSocketProviderProps = {
  url: string;
  children: ReactNode;
};
export function WebSocketProvider({ url, children }: WebSocketProviderProps) {
  const [ws] = useState(() => new WebSocket(url));
  const [state, dispatch] = useReducer(WebSocketReducer, {
    readyState: toReadyState(ws.readyState),
  });

  useEffect(() => {
    ws.addEventListener("open", () =>
      dispatch({
        type: Event.OPEN,
        readyState: toReadyState(ws.readyState),
      })
    );

    ws.addEventListener("message", (event) =>
      dispatch({
        type: Event.MESSAGE,
        readyState: toReadyState(ws.readyState),
        message: JSON.parse(event.data),
      })
    );

    ws.addEventListener("error", (event) =>
      dispatch({
        type: Event.ERROR,
        readyState: toReadyState(ws.readyState),
        error: new Error(`WebSocket error observed: ${JSON.stringify(event)}`),
      })
    );

    ws.addEventListener("close", (event) =>
      dispatch({
        type: Event.CLOSE,
        readyState: toReadyState(ws.readyState),
        code: event.code,
      })
    );

    return () => ws.close();
  }, [ws]);

  const send: WebSocketSendFunction = useCallback(
    (data) => {
      if (typeof data === "object") {
        return ws.send(JSON.stringify(data));
      }

      ws.send(data);
    },
    [ws]
  );
  const close: WebSocketCloseFunction = useCallback(ws.close.bind(ws), [ws]);

  return (
    <WebSocketContext.Provider value={{ state, send, close }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);

  invariant(context, "useWebSocket must be used within a WebSocketProvider");

  return context;
}
