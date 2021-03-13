import { Switch, Route } from "core";
import { Status, Profile, Navbar, Sidebar } from "components";
import clsx from "clsx";

import Repo from "./Repo";
import Book from "./Book";

import IMG_Avatar from "assets/profile/avatar.png";

function Header() {
  return (
    <header className="flex justify-between py-2 px-4">
      <Profile avatar={IMG_Avatar} name="名稱" level="LV.42" />

      <Status value="666,666,666.66" />
    </header>
  );
}

function Main() {
  return (
    <main className="w-1/2">
      <Switch>
        <Route path="/lobby/repo">
          <Repo />
        </Route>
        <Route path="/lobby/book">
          <Book />
        </Route>
        <Route path="/lobby/rank">Rank</Route>
        <Route path="/lobby/shop">Shop</Route>
      </Switch>
    </main>
  );
}

type UIProps = {
  className?: string;
};
export default function UI({ className }: UIProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      <Header />

      <div className="flex-1 flex justify-end">
        <Main />

        <Sidebar />
      </div>

      <Navbar />
    </div>
  );
}
