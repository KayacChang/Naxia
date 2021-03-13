import { Lobby } from "scenes";
import { Router, Switch, Route } from "core";
import { StoreProvider, useDispatch, User } from "store";
import { NetworkProvider, useNetwork, useSubscript } from "network";
import { ReactNode, useEffect } from "react";
import { useRouteMatch } from "react-router";

type UserObserverProps = {
  children: ReactNode;
};
function UserObserver({ children }: UserObserverProps) {
  const user = useSubscript("user");
  const dispatch = useDispatch();
  const send = useNetwork();
  const match = useRouteMatch("/lobby");

  // send login
  useEffect(() => {
    if (user || !send) {
      return;
    }

    match &&
      send(
        JSON.stringify({
          type: "login",
          id: "ce3f15da-2a90-46e0-ac32-ee9cb963a93f",
        })
      );
  }, [user, match, send]);

  // after login
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
      <Router>
        <NetworkProvider>
          <ErrorObserver>
            <UserObserver>{children}</UserObserver>
          </ErrorObserver>
        </NetworkProvider>
      </Router>
    </StoreProvider>
  );
}

export default function App() {
  return (
    <System>
      <Switch>
        <Route path="/lobby">
          <Lobby />
        </Route>
      </Switch>
    </System>
  );
}
