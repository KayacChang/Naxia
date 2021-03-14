import { Lobby } from "scenes";
import { Router, Switch, Route } from "core";
import { StoreProvider } from "store";
import { NetworkProvider } from "network";
import { ReactNode } from "react";
import { ItemSerivce, ErrorService, UserService } from "services";

type SystemProps = {
  children: ReactNode;
};
function System({ children }: SystemProps) {
  return (
    <StoreProvider>
      <Router>
        <NetworkProvider>
          <ErrorService>
            <UserService id="24a28518-4c5d-4032-961b-47fb87a3eb35">
              <ItemSerivce>{children}</ItemSerivce>
            </UserService>
          </ErrorService>
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
