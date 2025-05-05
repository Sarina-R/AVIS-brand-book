import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { JSX } from "react";
import { Handshake, ShieldCheck, HandCoins, Blocks, Cog } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { TabsContentItem } from "@/app/type";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents1 } from "@/mdx-component";
import { lighten } from "polished";
import { useFont } from "@/hooks/FontProvider";

export const CustomTabs = ({
  tabs,
  selectedTab,
  setSelectedTab,
  primaryColor,
}: {
  tabs: Array<
    TabsContentItem & { serializedDescription: MDXRemoteSerializeResult }
  >;
  selectedTab: string;
  setSelectedTab: (val: string) => void;
  primaryColor: string;
}) => {
  const lighterColor = lighten(0.2, primaryColor);
  const { headerFont } = useFont();

  const mdxComponent1 = useMDXComponents1({});
  const svgLessTabs = tabs.filter((tab) => !tab.svg);

  const fallbackIcons = [
    <Handshake
      key="handshake"
      style={{ color: lighterColor }}
      className="w-24 h-24"
    />,
    <ShieldCheck
      key="shield"
      style={{ color: lighterColor }}
      className="w-24 h-24"
    />,
    <HandCoins
      key="coins"
      style={{ color: lighterColor }}
      className="w-24 h-24"
    />,
    <Blocks
      key="blocks"
      style={{ color: lighterColor }}
      className="w-24 h-24"
    />,
    <Cog key="cog" style={{ color: lighterColor }} className="w-24 h-24" />,
  ];

  const iconMap = new Map<string, JSX.Element>();
  svgLessTabs.forEach((tab, index) => {
    iconMap.set(tab.title, fallbackIcons[index % fallbackIcons.length]);
  });

  return (
    <div className="max-w-3xl">
      <ScrollArea>
        <div className="flex gap-6 border-b border-muted pb-2 mb-4 relative">
          {tabs.map((tab, index) => (
            <button
              style={{ fontFamily: headerFont }}
              key={`${tab.title}+${index}`}
              onClick={() => setSelectedTab(tab.title)}
              className={clsx(
                "relative px-2 pb-2 md:text-base text-sm font-medium whitespace-nowrap",
                "transition-colors duration-300",
                selectedTab === tab.title
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.title}
              {selectedTab === tab.title && (
                <motion.div
                  layoutId="custom-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
                  style={{ backgroundColor: primaryColor }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {tabs.map((tab) =>
        tab.title === selectedTab ? (
          <motion.div
            key={tab.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-6 mt-4"
          >
            <div
              style={{ backgroundColor: primaryColor }}
              className="w-full min-h-72 lg:w-1/2 p-4 rounded-4xl flex items-center justify-center"
            >
              {tab.svg ? (
                <div className="relative items-center justify-center overflow-hidden">
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="opacity-70 z-10 absolute w-full h-full"
                  />
                  <Image
                    src={tab.svg}
                    alt={tab.title}
                    width={400}
                    height={400}
                    className="max-w-fit p-10 h-full object-contain m-auto max-h-64"
                  />
                </div>
              ) : (
                iconMap.get(tab.title)
              )}
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ fontFamily: headerFont }}
              >
                {tab.title}
              </h3>
              <div className="text-neutral-600 dark:text-neutral-400 leading-6 whitespace-pre-line">
                {tab.serializedDescription ? (
                  <MDXRemote
                    {...tab.serializedDescription}
                    components={mdxComponent1}
                  />
                ) : (
                  <p>No description available</p>
                )}
              </div>
            </div>
          </motion.div>
        ) : null
      )}
    </div>
  );
};
