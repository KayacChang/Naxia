import { ReactNode } from "react";
import {
  MemoryRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { selectAuthToken, useAppSelector } from "system";

const isDev = process.env.NODE_ENV === "development";

type RouterProps = {
  children: ReactNode;
};
export function Router({ children }: RouterProps) {
  if (isDev) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const token = useAppSelector(selectAuthToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export { Switch, Route, Link };
