import { StoreProvider } from "store";
import { NetworkProvider } from "network";
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
          <User id="69234c07-4e29-4dd4-8da2-cef32e850c83">
            <Area>
              <Item>{children}</Item>
            </Area>
          </User>
        </Error>
      </NetworkProvider>
    </StoreProvider>
  );
}
