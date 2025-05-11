"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/hooks/DataProvider";
import { ApiResponse } from "../type";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const ColorPreview = () => {
  const colorObj = useData()?.data?.brand.color;

  if (!colorObj) return null;

  const colorValues = [
    colorObj.primaryColor,
    colorObj.secondaryColor,
    colorObj.actionColor,
    ...(colorObj.otherColors || []),
  ];

  return (
    <div className="flex justify-center items-center gap-4 px-6 py-6 overflow-auto">
      {colorValues.map((color, index) => (
        <div
          key={index}
          className="w-6 h-24 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center"
        >
          <div
            className="w-2 h-20 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </div>
      ))}
    </div>
  );
};

const TypographyPreview = () => {
  const font = useData()?.data?.brand.font;
  const fontName = font?.name || "sans";
  const fontClass = `font-${fontName.toLowerCase().replace(/\s+/g, "-")}`;

  const weights = [
    { label: "Light", className: "font-light", weight: "300" },
    { label: "Regular", className: "font-normal", weight: "400" },
    { label: "Bold", className: "font-bold", weight: "700" },
    { label: "Black", className: "font-black", weight: "900" },
  ];

  return (
    <div className={`flex flex-col gap-1 px-6 py-6 ${fontClass}`}>
      {weights.map(({ label, className, weight }) => (
        <div key={weight} className={`text-xl ${className}`}>
          {fontName} {label}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const { data }: { data: ApiResponse | null } = useData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-neutral-500 dark:text-neutral-400">
        Loading brand book...
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 py-12">
        <h1 className="font-black text-4xl mb-4">
          {data.brand.name} Brand Book
        </h1>
        <p className="text-neutral-500">
          AVIS design system for building consistent web experiences.
        </p>
      </div>

      <div className="min-h-screen border-t text-neutral-800 dark:text-neutral-200 transition-colors px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 border-neutral-200 dark:border-neutral-800">
          {data.visualSectionCards.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="border-b border-r border-neutral-300 dark:border-neutral-800"
            >
              <Link href={item.href || "#"} className="block">
                <div className="relative aspect-video w-full border-b flex items-center justify-center">
                  {item.type === "image" ? (
                    <>
                      {item.lightImg && (
                        <Image
                          width={400}
                          height={400}
                          src={item.lightImg}
                          alt={`${item.title} light preview`}
                          className="object-contain p-4 dark:hidden max-h-full"
                        />
                      )}
                      {item.darkImg && (
                        <Image
                          width={400}
                          height={400}
                          src={item.darkImg}
                          alt={`${item.title} dark preview`}
                          className="object-contain p-4 hidden dark:block max-h-full"
                        />
                      )}
                    </>
                  ) : item.title === "Color Palette" ? (
                    <ColorPreview />
                  ) : item.title === "Typography" ? (
                    <TypographyPreview />
                  ) : null}
                </div>
                <div className="px-6 py-6 space-y-1">
                  <h3 className="text-base font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-10 py-4">
          © {new Date().getFullYear()} {data.brand.name}. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
