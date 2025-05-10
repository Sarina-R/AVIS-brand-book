"use client";

import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Rocket,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents1 } from "@/mdx-component";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useData();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const mdxComponent1 = useMDXComponents1({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const currentItem = menuItems.find((item) => item.id === itemId);

  const currentSectionData = data.sections.find(
    (section) => section.type === currentItem?.type
  );

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

  const primaryColor = data.brand.color.primaryColor;

  return (
    <div className="p-2">
      <div key={pathname} className="relative overflow-hidden">
        <svg
          className="absolute top-0 right-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M10 10 L90 10 L90 90"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            className="stroke-[#127cc1] dark:stroke-[#4ba8e8]"
          />
        </svg>
        <svg
          className="absolute top-0 left-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M90 10 L10 10 L10 90"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            className="stroke-[#127cc1] dark:stroke-[#4ba8e8]"
          />
        </svg>
        <svg
          className="absolute top-[74vh] right-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M10 90 L90 90 L90 10"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            className="stroke-[#127cc1] dark:stroke-[#4ba8e8]"
          />
        </svg>
        <svg
          className="absolute top-[74vh] left-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M90 90 L10 90 L10 10"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            className="stroke-[#127cc1] dark:stroke-[#4ba8e8]"
          />
        </svg>

        <section className="relative min-h-screen flex items-center justify-center py-16 sm:px-15">
          <motion.div
            className="text-center max-w-3xl mx-auto px-4 z-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 bg-clip-text dark:text-transparent text-[#4ba8e8] dark:bg-gradient-to-r dark:from-[#4ba8e8] dark:to-[#127cc1]">
              {typeof currentSectionData?.title === "object" ? (
                <MDXRemote
                  {...(currentSectionData.title as MDXRemoteSerializeResult)}
                  components={mdxComponent1}
                />
              ) : (
                currentSectionData?.title
              )}
            </h1>

            <span className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              {typeof currentSectionData?.description === "object" ? (
                <MDXRemote
                  {...(currentSectionData.description as MDXRemoteSerializeResult)}
                  components={mdxComponent1}
                />
              ) : (
                currentSectionData?.description
              )}
            </span>

            <div className="flex justify-center gap-6 mt-8">
              <motion.div whileHover="hover" variants={scaleHover}>
                <Rocket color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Cpu color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Star color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Zap color={primaryColor} className="text-3xl" />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      <div className="p-4">{children}</div>

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
