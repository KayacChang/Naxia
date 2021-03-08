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
  /** Socket has been created. The connection is not yet open. */
  CONNECTING = 0,
  /** The connection is open and ready to communicate. */
  OPEN = 1,
  /** The connection is in the process of closing. */
  CLOSING = 2,
  /** The connection is closed or couldn't be opened. */
  CLOSED = 3,
}

export enum Event {
  /** Fired when a connection with a WebSocket is opened. */
  OPEN = "open",
  /** Fired when data is received through a WebSocket. */
  MESSAGE = "message",
  /** Fired when a connection with a WebSocket has been closed because of an error, such as when some data couldn't be sent. */
  ERROR = "error",
  /** Fired when a connection with a WebSocket is closed. */
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
  lastMessage?: string;
  error?: Error;
  number?: number;
};

type WebSocketSendFunction = (
  data: string | ArrayBufferLike | Blob | ArrayBufferView
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
        message: String(event.data),
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

  const send: WebSocketSendFunction = useCallback(ws.send.bind(ws), [ws]);
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
