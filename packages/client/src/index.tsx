import { StrictMode } from "react";
import { render } from "react-dom";
import { Lobby } from "scenes";
import { Switch, Route } from "core";
import System from "system";

import "styles/base.css";
import "styles/index.css";

function App() {
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

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// import reportWebVitals from "reportWebVitals"`
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
