import { StrictMode } from "react";
import { render } from "react-dom";
import { Switch, Route } from "core";
import System, { Area, Item } from "system";
import { Lobby, Room } from "scenes";

import "styles/base.css";
import "styles/index.css";

function App() {
  return (
    <System>
      <Switch>
        <Route path="/lobby">
          <Area>
            <Item>
              <Lobby />
            </Item>
          </Area>
        </Route>

        <Route path="/room">
          <Room />
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
