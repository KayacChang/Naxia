import { lazy, StrictMode, Suspense } from "react";
import { unstable_createRoot } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import "styles/base.css";
import "styles/index.css";

import { Switch, Router, Route, PrivateRoute, Loading } from "components";
import { addAssets, store, user } from "system";
import { toTask } from "utils";
import Assets from "assets";

const Login = lazy(() =>
  store
    .dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Login })))
    .then(() => import("./scenes/Login"))
);

const Lobby = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Lobby }))),
    store.dispatch(user.sync()),
    store.dispatch(user.item.sync()),
  ]).then(() => import("./scenes/Lobby"))
);

const Room = lazy(() =>
  store
    .dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Room })))
    .then(() => import("./scenes/Room"))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Router>
  );
}

unstable_createRoot(document.getElementById("app") as HTMLDivElement).render(
  <StrictMode>
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
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
