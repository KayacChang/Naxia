import { lazy, StrictMode, Suspense } from "react";
import { unstable_createRoot } from "react-dom";
import { Provider } from "react-redux";

import "styles/base.css";
import "styles/index.css";

import { Switch, Router, Route, PrivateRoute, Loading } from "components";
import { addAssets, addSounds, store, user, Map, ErrorBoundary } from "system";
import { toTask } from "utils";
import Assets from "assets";
import Sound from "assets/sound";
import { Map as TMap } from "types";

const Login = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.System, ...Assets.Login }))),
    store.dispatch(addSounds(toTask(Sound.Login))),
  ]).then(() => import("./scenes/Login"))
);

const Lobby = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Lobby }))),
    store.dispatch(addSounds(toTask(Sound.Lobby))),
    store.dispatch(user.sync()),
    store.dispatch(user.item.sync()),

    store
      .dispatch(Map.all())
      .then(({ payload }) =>
        Promise.all(
          (payload as TMap[]).map(({ id, img }) =>
            Promise.all([
              store.dispatch(Map.npc(id)),
              store.dispatch(Map.dungeons(id)),
              store.dispatch(addAssets(toTask({ [`Map.${id}`]: img }))),
            ])
          )
        )
      ),
  ]).then(() => import("./scenes/Lobby"))
);

const Room = lazy(() =>
  Promise.all([
    store.dispatch(addAssets(toTask({ ...Assets.Common, ...Assets.Room }))),
    store.dispatch(addSounds(toTask(Sound.Room))),
  ]).then(() => import("./scenes/Room"))
);

function App() {
  return (
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
  );
}

unstable_createRoot(document.getElementById("app") as HTMLDivElement).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </StrictMode>
);
