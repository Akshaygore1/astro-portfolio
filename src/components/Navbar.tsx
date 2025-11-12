import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <nav className="py-6 dark:text-neutral-100">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-lg ${
                location.pathname === link.href
                  ? "underline decoration-amber-400 decoration-wavy underline-offset-4 hover:text-foreground transition-all duration-150 ease-[cubic-bezier(0.08, 0.82, 0.17, 1)]"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
