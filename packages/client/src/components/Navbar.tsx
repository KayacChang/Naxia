import { Link } from "core";
import { Icon } from "components";

export function Navbar() {
  return (
    <nav className="flex justify-end py-2 px-4 space-x-2">
      <Link to="/lobby" className="w-12">
        <Icon.Map />
      </Link>

      <Link to="/lobby/repo" className="w-12">
        <Icon.Briefcase />
      </Link>

      <Link to="/lobby/book" className="w-12">
        <Icon.BookOpen />
      </Link>

      <Link to="/lobby/rank" className="w-12">
        <Icon.ClipboardList />
      </Link>

      <Link to="/lobby/shop" className="w-12">
        <Icon.ShoppingCart />
      </Link>
    </nav>
  );
}
