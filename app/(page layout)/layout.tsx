"use client";

import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useData();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading || !data) {
    return (
      <div className="space-y-6 py-5 px-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    );
  }

  const menuSections = Object.values(data.menu);
  const menuItems = menuSections.flatMap((section) => section.items);
  const sectionIndices = menuSections.map((section) => section.items.length);

  const pathSegments = pathname.split("/").filter(Boolean);
  const itemId = pathSegments.length > 0 ? pathSegments[0] : null;

  if (!itemId || !menuItems.some((item) => item.id === itemId)) {
    return <div>Page not found</div>;
  }

  const currentItemIndex = menuItems.findIndex((item) => item.id === itemId);

  let sectionStartIndex = 0;
  let currentSectionIndex = -1;
  let indexInSection = -1;

  sectionIndices.forEach((sectionSize, i) => {
    if (
      currentItemIndex >= sectionStartIndex &&
      currentItemIndex < sectionStartIndex + sectionSize
    ) {
      currentSectionIndex = i;
      indexInSection = currentItemIndex - sectionStartIndex;
    }
    sectionStartIndex += sectionSize;
  });

  let prevItem = null;
  let nextItem = null;

  if (currentSectionIndex !== -1) {
    const currentSection = menuSections[currentSectionIndex];
    const sectionItems = currentSection.items;

    if (indexInSection > 0) {
      prevItem = sectionItems[indexInSection - 1];
    } else if (currentSectionIndex > 0) {
      prevItem = menuSections[currentSectionIndex - 1].items.slice(-1)[0];
    }

    if (indexInSection < sectionItems.length - 1) {
      nextItem = sectionItems[indexInSection + 1];
    } else if (currentSectionIndex < menuSections.length - 1) {
      nextItem = menuSections[currentSectionIndex + 1].items[0];
    }
  }

  return (
    <div className="p-4">
      {children}
      <footer className="bg-neutral-100 dark:bg-neutral-900 h-20 rounded-2xl font-bold px-4 items-center w-full flex justify-between">
        {prevItem ? (
          <Link
            href={`/${prevItem.id}`}
            className="flex gap-2 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600"
          >
            <div className="pt-2">
              <ChevronLeft size={32} />
            </div>
            <div>
              <p className="font-light text-neutral-500 text-sm">Prev</p>
              <p>{prevItem.title}</p>
            </div>
          </Link>
        ) : (
          <span></span>
        )}

        {nextItem ? (
          <Link
            href={`/${nextItem.id}`}
            className="flex gap-2 text-right text-neutral-800 dark:text-neutral-200 hover:text-neutral-600"
          >
            <div>
              <p className="font-light text-neutral-500 text-sm">Next</p>
              <p>{nextItem.title}</p>
            </div>
            <div className="pt-2">
              <ChevronRight size={32} />
            </div>
          </Link>
        ) : (
          <span>End of sections</span>
        )}
      </footer>
    </div>
  );
}
