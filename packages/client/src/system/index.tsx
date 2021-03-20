import { StoreProvider } from "store";
import { NetworkProvider } from "api";
import { ReactNode } from "react";

import Error from "./error";
import User from "./user";
import Item from "./item";
import Area from "./area";

type SystemProps = {
  children: ReactNode;
};
export default function System({ children }: SystemProps) {
  return (
    <StoreProvider>
      <NetworkProvider>
        <Error>
          <User id="9cad106a-9e3d-4546-a5da-bafaaa69111b">
            <Area>
              <Item>{children}</Item>
            </Area>
          </User>
        </Error>
      </NetworkProvider>
    </StoreProvider>
  );
}
