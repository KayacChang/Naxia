import { StrictMode } from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "styles/base.css";
import "styles/index.css";
import { Switch, Router, Route, PrivateRoute, Loading } from "components";
import { AuthProvider, useAssets } from "system";
import { toTask } from "utils";
import Login from "./scenes/Login";
import Lobby from "./scenes/Lobby";
import Room from "./scenes/Room";
import Assets from "assets";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isCompleted } = useAssets(toTask(Assets.Common));
  if (!isCompleted) {
    return <Loading></Loading>;
  }

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <PrivateRoute path="/lobby">
              <Lobby />
            </PrivateRoute>

            <PrivateRoute path="/room">
              <Room />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("app")
);
