import { login } from "api";
import {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import invariant from "tiny-invariant";

type AuthState = {
  token?: string;
};
type AuthAction = { type: "signin"; payload: AuthState };
type AuthRequest = {
  username: string;
  password: string;
};
type AuthDispatch = ({ username, password }: AuthRequest) => Promise<void>;

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

function AuthReducer(state: AuthState, action: AuthAction) {
  if (action.type === "signin") {
    return action.payload;
  }

  return state;
}

type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: localStorage.getItem("TOKEN") || undefined,
  });

  const auth = useCallback(
    async ({ username, password }: AuthRequest) => {
      if (state.token) return;

      const { token } = await login({ username, password });
      localStorage.setItem("TOKEN", token);

      dispatch({ type: "signin", payload: { token } });
    },
    [state]
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={auth}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);

  invariant(context, "useAuthState must be used within a AuthProvide");

  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  invariant(context, "useAuthDispatch must be used within a AuthProvide");

  return context;
}

export function useAuth(): [AuthState, AuthDispatch] {
  return [useAuthState(), useAuthDispatch()];
}
