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
          <UserService id="1738bd3c-9108-4a0a-98ae-450f50576a44">
            <ItemService>{children}</ItemService>
          </UserService>
        </ErrorService>
      </NetworkProvider>
    </StoreProvider>
  );
}
