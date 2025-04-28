import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function LinkComponent({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1 text-md font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors hover:underline"
    >
      {label}
      <ArrowUpRight className="w-4 h-8" />
    </Link>
  );
}

export default LinkComponent;
