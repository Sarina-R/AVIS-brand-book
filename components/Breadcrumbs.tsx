"use client";

import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 space-x-2">
      {paths.map((path, index) => (
        <span key={index} className="capitalize">
          {formatSegment(path)}
          {index < paths.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </nav>
  );
}
