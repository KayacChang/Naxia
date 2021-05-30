import React from "react";
import { Announcement, Setting } from "components";
import { PrivateRoute, Switch } from "components/Router";
import { Information } from "./Information";

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <Switch>
        <PrivateRoute path="/lobby">
          <Setting />
          <Announcement />
        </PrivateRoute>

        <PrivateRoute path="/room">
          <Setting />
          <Information />
        </PrivateRoute>
      </Switch>
    </aside>
  );
}
