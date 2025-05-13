"use client";

import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useData();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const parallaxValues = useMemo(() => {
    const offsetX = mousePos.x - window.innerWidth / 2;
    const offsetY = mousePos.y - window.innerHeight / 2;

    return {
      x1: offsetX * 0.07,
      y1: offsetY * 0.07,
      x2: offsetX * 0.08,
      y2: offsetY * 0.08,
      x3: offsetX * -0.06,
      y3: offsetY * -0.06,
    };
  }, [mousePos]);

  const blendMode =
    theme === "light" ? "mix-blend-multiply" : "mix-blend-lighten";
  const commonClass =
    "pointer-events-none absolute rounded-full blur-3xl transition-transform duration-75";

  if (!isMounted || loading || !data) {
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
    <div className="p-2">
      <div
        className={`${commonClass} w-96 h-96 opacity-20 lg:block hidden ${blendMode}`}
        style={{
          backgroundColor: data.brand.color.primaryColor,
          transform: `translate(${parallaxValues.x1}px, ${parallaxValues.y1}px)`,
          top: "5%",
          left: "60%",
        }}
      />
      <div
        className={`${commonClass} w-72 h-72 opacity-15 ${blendMode}`}
        style={{
          backgroundColor: data.brand.color.primaryColor,
          transform: `translate(${parallaxValues.x2}px, ${parallaxValues.y2}px)`,
          bottom: "5%",
          right: "10%",
        }}
      />
      <div
        className={`${commonClass} w-60 h-60 opacity-20 ${blendMode}`}
        style={{
          backgroundColor: data.brand.color.primaryColor,
          transform: `translate(${parallaxValues.x3}px, ${parallaxValues.y3}px)`,
          top: "20%",
          left: "25%",
        }}
      />

      <div id="page-content" className="px-4">
        {children}
      </div>

      <footer className="bg-neutral-100 dark:bg-neutral-900 h-20 rounded-2xl font-bold px-4 items-center w-full flex justify-between">
        {prevItem ? (
          <Link
            href={`/${prevItem.id}`}
            className="flex gap-2 text-neutral-800 dark:text-neutral-200 hover:text-[#127cc1] dark:hover:text-[#4ba8e8]"
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
            className="flex gap-2 text-right text-neutral-800 dark:text-neutral-200 hover:text-[#127cc1] dark:hover:text-[#4ba8e8]"
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
