import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { ReactNode, useEffect } from "react";
import { useWebSocket, ReadyState } from "api";
import { useDispatch, User } from "store";

type UserContext = {};

type UserEvent = { type: "FETCH" } | { type: "RESOLVE" };

type UserState =
  | {
      value: "idle";
      context: UserContext;
    }
  | {
      value: "loading";
      context: UserContext;
    }
  | {
      value: "success";
      context: UserContext;
    };

const machine = createMachine<UserContext, UserEvent, UserState>({
  id: "user",

  initial: "idle",

  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      on: {
        RESOLVE: "success",
      },
    },
    success: {
      type: "final",
    },
    failure: {
      type: "final",
    },
  },
});

type UserServiceProps = {
  id: string;
  children: ReactNode;
};
export default function UserService({ id, children }: UserServiceProps) {
  const ws = useWebSocket();
  const [state, send] = useMachine(machine);
  const dispatch = useDispatch();
  const readyState = ws.state.readyState;
  const lastMessage = ws.state.lastMessage;

  useEffect(() => {
    if (state.matches("idle") && readyState === ReadyState.OPEN) {
      ws.send({ type: "login", id });

      send("FETCH");

      return;
    }

    if (state.matches("loading") && lastMessage?.type === "user") {
      dispatch(User.actions.login(lastMessage.data));
    }
  }, [ws, readyState, lastMessage, state, send]);

  return <>{children}</>;
}
