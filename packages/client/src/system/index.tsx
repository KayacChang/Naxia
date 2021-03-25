import { StoreProvider } from "store";
import { NetworkProvider } from "api";
import { ReactNode } from "react";
import { Router } from "core";

import Error from "./error";
import User from "./user";
import Item from "./item";
import Area from "./area";

type SystemProps = {
  children: ReactNode;
};
export default function System({ children }: SystemProps) {
  return (
    <Router>
      <StoreProvider>
        <NetworkProvider>
          <Error>
            <User id="c5b8442f-5494-4358-924e-304edb1ee034">{children}</User>
          </Error>
        </NetworkProvider>
      </StoreProvider>
    </Router>
  );
}

export { Item, Area };
