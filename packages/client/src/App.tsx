import { Lobby } from "scenes";
import { useViewport, Router, Switch, Route } from "core";
import { StoreProvider } from "store";

export default function App() {
  const viewport = useViewport();

  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route path="/lobby">
            <Lobby {...viewport} />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  );
}
