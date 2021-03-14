import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { ReactNode, useEffect } from "react";
import { useNetwork, useSubscript } from "network";
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
  },
});

type UserServiceProps = {
  id: string;
  children: ReactNode;
};
export default function UserService({ id, children }: UserServiceProps) {
  const post = useNetwork();
  const user = useSubscript("user");
  const dispatch = useDispatch();
  const [state, send] = useMachine(machine);

  useEffect(() => {
    if (state.matches("idle") && post) {
      post(
        JSON.stringify({
          type: "login",
          id,
        })
      );

      send("FETCH");

      return;
    }

    if (state.matches("loading") && user) {
      dispatch(User.actions.login(user));

      send("RESOLVE");

      return;
    }
  }, [state, send, post, user]);

  return <>{children}</>;
}
