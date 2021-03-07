import { Lobby } from "scenes";
import { Router, Switch, Route } from "core";
import { StoreProvider } from "store";
import { QueryClientProvider, QueryClient } from "react-query";
import { WebSocketProvider } from "api";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider url={process.env.REACT_APP_WS || ""}>
        <StoreProvider>
          <Router>
            <Switch>
              <Route path="/lobby">
                <Lobby />
              </Route>
            </Switch>
          </Router>
        </StoreProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}
