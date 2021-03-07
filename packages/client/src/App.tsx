import { Lobby } from "scenes";
import { Router, Switch, Route } from "core";
import { StoreProvider, useDispatch, User } from "store";
import { NetworkProvider, useSubscript } from "network";
import { ReactNode, useEffect } from "react";
import * as Type from "types";

type UserObserverProps = {
  children: ReactNode;
};
function UserObserver({ children }: UserObserverProps) {
  const user = useSubscript<Type.User>("user");
  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(User.actions.login(user));
  }, [user]);

  return <>{children}</>;
}

type SystemProps = {
  children: ReactNode;
};
function System({ children }: SystemProps) {
  return (
    <StoreProvider>
      <NetworkProvider>
        <UserObserver>{children}</UserObserver>
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
