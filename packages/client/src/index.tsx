import { StrictMode } from "react";
import { render } from "react-dom";
import App from "App";
import "styles/base.css";
import "styles/index.css";

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
