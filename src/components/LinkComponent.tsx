import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function LinkComponent({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1 text-md font-medium text-neutral-200 dark:text-neutral-200 hover:text-amber-400 dark:hover:text-yellow-300 transition-colors hover:underline"
    >
      {label}
      <ArrowUpRight className="w-4 h-8" />
    </Link>
  );
}

export default LinkComponent;
