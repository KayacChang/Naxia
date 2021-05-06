import { StrictMode } from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "styles/base.css";
import "styles/index.css";
import { Switch, Router, Route, PrivateRoute } from "components";
import { store } from "system";
import Login from "./scenes/Login";
import Lobby from "./scenes/Lobby";
import Room from "./scenes/Room";
import { Provider } from "react-redux";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
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
  );
}

render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById("app")
);
