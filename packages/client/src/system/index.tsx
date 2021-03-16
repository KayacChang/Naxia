import { StoreProvider } from "store";
import { NetworkProvider } from "network";
import { ReactNode } from "react";

import ErrorService from "./error";
import UserService from "./user";
import ItemService from "./item";

type SystemProps = {
  children: ReactNode;
};
export default function System({ children }: SystemProps) {
  return (
    <StoreProvider>
      <NetworkProvider>
        <ErrorService>
          <UserService id="4fd23a49-90f3-4b2b-8989-fde1eb5fec61">
            <ItemService>{children}</ItemService>
          </UserService>
        </ErrorService>
      </NetworkProvider>
    </StoreProvider>
  );
}
