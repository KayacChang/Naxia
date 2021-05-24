import { lazy, StrictMode, Suspense } from "react";
import { unstable_createRoot } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import "styles/base.css";
import "styles/index.css";

import { Switch, Router, Route, PrivateRoute, Loading } from "components";
import {
  addAssets,
  addSounds,
  BGM,
  store,
  user,
  ViewportProvider,
} from "system";
import { toTask } from "utils";
import Assets from "assets";
import Sound from "assets/sound";

const Login = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Login }))),
    store.dispatch(addSounds(toTask(Sound.Login))),
  ])
    .then(() => store.dispatch(BGM.play(Sound.Login.BGM)))
    .then(() => import("./scenes/Login"))
);

const Lobby = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Lobby }))),
    store.dispatch(addSounds(toTask(Sound.Lobby))),
    store.dispatch(user.sync()),
    store.dispatch(user.item.sync()),
  ])
    .then(() => store.dispatch(BGM.play(Sound.Lobby.BGM)))
    .then(() => import("./scenes/Lobby"))
);

const Room = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Room }))),
    store.dispatch(addSounds(toTask(Sound.Room))),
  ])
    .then(() => store.dispatch(BGM.play(Sound.Room.BGM)))
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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

unstable_createRoot(document.getElementById("app") as HTMLDivElement).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <ViewportProvider>
          <App />
        </ViewportProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
