"use client";

import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents1 } from "@/mdx-component";
import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useData();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const localePrefix = pathSegments[0] || "";
  const mdxComponents = useMDXComponents1({});

  const fontFamily = "'Geist', sans-serif";
  const headerFontFamily = fontFamily;

  if (loading || !data) {
    return (
      <div className="space-y-6 py-5 px-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    );
  }

  const primaryColor = data.brand.primaryColor;
  const textColor = getContrastYIQ(primaryColor);
  const menuItems = Object.values(data.menu).flatMap((menu) => menu.items);

  const isBaseLocationPath = pathSegments.length === 1;
  const itemId = pathSegments.length > 1 ? pathSegments[1] : "overview";

  const currentTypeFromMenu = menuItems.find(
    (item) => item.id === itemId
  )?.type;

  const currentType =
    isBaseLocationPath || !currentTypeFromMenu
      ? "overview"
      : currentTypeFromMenu;

  const section =
    data.sections.find((sec) => sec.type === currentType) ??
    data.sections.find((sec) => sec.type === "overview");

  const currentIndex = menuItems.findIndex((item) => item.type === currentType);
  const nextItem = menuItems[currentIndex + 1];
  const prevItem = currentIndex > 0 ? menuItems[currentIndex - 1] : null;

  function getContrastYIQ(hexColor: string): "black" | "white" {
    let color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
    if (color.length === 3) {
      color = color
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  const renderSectionContent = () => {
    const hasMedia = section?.video || section?.img;

    return (
      <div style={{ fontFamily }}>
        <div
          className={`relative min-h-[50vh] md:flex flex-row items-center justify-start rounded-xl gap-4 px-10 py-5 overflow-hidden ${
            hasMedia ? "block" : "md:flex"
          }`}
          style={{ backgroundColor: primaryColor, color: textColor }}
        >
          {section?.pattern && (
            <motion.div
              className="absolute inset-0 opacity-0"
              style={{
                backgroundImage: `url('${section.pattern}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            />
          )}

          <div className="relative text-left">
            <h1
              className="font-bold text-display-lg lg:text-4xl text-3xl m-0"
              style={{ fontFamily: headerFontFamily }}
            >
              {section?.title && (
                <MDXRemote
                  {...(section.title as MDXRemoteSerializeResult)}
                  components={mdxComponents}
                />
              )}
            </h1>
            <h5 className="text-display-sm md:text-display-md m-0 mt-2 lg:mt-4">
              {section?.description && (
                <MDXRemote
                  {...(section.description as MDXRemoteSerializeResult)}
                  components={mdxComponents}
                />
              )}
            </h5>
          </div>

          {hasMedia && (
            <div className="relative flex right-0 w-full justify-end">
              {section?.video ? (
                <motion.video
                  src={section.video}
                  autoPlay
                  loop
                  muted
                  className="max-w-full h-auto rounded-lg shadow-lg max-h-[50vh]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              ) : section?.img ? (
                <motion.img
                  src={section.img}
                  alt="Overview Image"
                  className="max-w-full h-auto rounded-lg shadow-lg max-h-[50vh]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 p-4" style={{ fontFamily }}>
      {renderSectionContent()}
      {children}
      <footer className="bg-neutral-100 dark:bg-neutral-900 h-20 rounded-2xl font-bold px-4 items-center w-full flex justify-between">
        {prevItem ? (
          <Link
            href={`/${localePrefix}/${prevItem.id}`}
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
            href={`/${localePrefix}/${nextItem.id}`}
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
