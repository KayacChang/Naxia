import { Lobby } from "scenes";
import { Router, Switch, Route } from "core";
import { StoreProvider, useDispatch, User } from "store";
import { NetworkProvider, useSubscript } from "network";
import { ReactNode, useEffect } from "react";

type UserObserverProps = {
  children: ReactNode;
};
function UserObserver({ children }: UserObserverProps) {
  const user = useSubscript("user");
  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(User.actions.login(user));
  }, [user]);

  return <>{children}</>;
}

type ErrorObserverProps = {
  children: ReactNode;
};
function ErrorObserver({ children }: ErrorObserverProps) {
  const error = useSubscript("error");

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return <>{children}</>;
}

type SystemProps = {
  children: ReactNode;
};
function System({ children }: SystemProps) {
  return (
    <StoreProvider>
      <NetworkProvider>
        <ErrorObserver>
          <UserObserver>{children}</UserObserver>
        </ErrorObserver>
      </NetworkProvider>
    </StoreProvider>
  );
}

export default function App() {
  return (
    <System>
      <Router>
        <Switch>
          <Route path="/lobby">
            <Lobby />
          </Route>
        </Switch>
      </Router>
    </System>
  );
}
