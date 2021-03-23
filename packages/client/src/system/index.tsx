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
            <User id="078b57a3-a085-4c6c-8c51-602daa35bbf3">
              <Area>
                <Item>{children}</Item>
              </Area>
            </User>
          </Error>
        </NetworkProvider>
      </StoreProvider>
    </Router>
  );
}
