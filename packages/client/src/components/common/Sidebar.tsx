import { Announcement, Setting } from "components";
import { PrivateRoute, Switch } from "components/Router";
import { Information } from "./Information";
import { Stream } from "./Stream";
import clsx from "clsx";

type SidebarProps = {
  className?: string;
};
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "flex flex-col",
        "gap-0 lg:gap-8 mr-4 lg:mr-8 mt-0 lg:mt-12 w-12",
        className
      )}
    >
      <Switch>
        <PrivateRoute path="/lobby">
          <Setting />
          <Announcement />
        </PrivateRoute>

        <PrivateRoute path="/room">
          <Setting />
          <Information />
          <Stream />
        </PrivateRoute>
      </Switch>
    </aside>
  );
}
