import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "blogs",
    href: "/blog",
  },
  {
    label: "projects",
    href: "/projects",
  },
];

export function Navbar() {
  return (
    <nav className="py-6 dark:text-neutral-100">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="text-lg">
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
