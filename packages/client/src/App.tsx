import { Lobby } from "scenes";
import { useViewport, Router, Switch, Route } from "core";
import { StoreProvider } from "store";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const viewport = useViewport();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Switch>
            <Route path="/lobby">
              <Lobby {...viewport} />
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}
