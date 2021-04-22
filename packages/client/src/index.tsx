import { StrictMode } from "react";
import { render } from "react-dom";
import { Switch, Router, Route } from "core";

import "styles/base.css";
import "styles/index.css";

import { AuthProvider } from "system";

import Login from "./scenes/Login";
import Lobby from "./scenes/Lobby";
import Room from "./scenes/Room";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/lobby">
              <Lobby />
            </Route>

            <Route path="/room">
              <Room />
            </Route>
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
