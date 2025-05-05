"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heebo } from "next/font/google";
import Image from "next/image";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const sections = [
  {
    title: "Logo",
    href: "/global/logo",
    type: "image",
    lightImg:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/global//fira-logo-color-horizontal-no-slogan.svg",
    darkImg:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/global//fira-wordmark-light-slogan.svg",
    desc: "Both light and dark versions of the FIRA logo, used across platforms.",
  },
  {
    title: "Typography",
    href: "/global/typography",
    type: "component",
    desc: "Font scale, styles, and usage guidance powered by Heebo.",
  },
  {
    title: "Mascot",
    href: "/global/mascot",
    type: "image",
    lightImg:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/global//Copy_of_FIRA_Brand_Book-removebg-preview.png",
    darkImg:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/global//Copy_of_FIRA_Brand_Book-removebg-preview.png",
    desc: "Say hi to our friendly brand mascot — the visual face of FIRA.",
  },
  {
    title: "Color Palette",
    href: "/global/color",
    type: "component",
    desc: "Explore FIRA’s carefully crafted brand colors in both light and dark modes.",
  },
];

const ColorPreview = () => {
  const colors = [
    "#FFF4E9",
    "#FF7838",
    "#01ACEC",
    "#FFD05D",
    "#4F4F4F",
    "#3551f2",
  ];
  return (
    <div className="flex w-full h-full gap-2 px-6 py-6 items-center justify-center">
      {colors.map((color, index) => (
        <div
          key={index}
          className="rounded-full flex-1 h-full w-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

const TypographyPreview = () => {
  const weights = [
    { label: "Light", className: "font-light", weight: "300" },
    { label: "Regular", className: "font-normal", weight: "400" },
    { label: "Bold", className: "font-bold", weight: "700" },
    { label: "Black", className: "font-black", weight: "900" },
  ];
  return (
    <div className={`flex flex-col gap-1 px-6 py-6 ${heebo.className}`}>
      {weights.map(({ label, className, weight }) => (
        <div key={weight} className={`text-xl ${className}`}>
          Heebo {label}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="">
      <div className="px-6 py-12">
        <h1 className="font-black text-4xl mb-4">FIRA WORLD CUP Brand Book</h1>
        <p className="text-neutral-500">
          FIRA design system for building consistent web experiences.
        </p>
      </div>
      <div
        className={`${heebo.className} min-h-screen border-t text-neutral-900 dark:bg-neutral-950 dark:text-white transition-colors px-0`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 border-neutral-200 dark:border-neutral-800">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="border-b border-r border-neutral-300 dark:border-neutral-800"
            >
              <Link href={section.href} className="block">
                <div className="relative aspect-video w-full border-b flex items-center justify-center">
                  {section.type === "image" ? (
                    <>
                      {section.lightImg && (
                        <Image
                          width={400}
                          height={400}
                          src={section.lightImg}
                          alt={`${section.title} light preview`}
                          className="object-contain p-4 dark:hidden max-h-full"
                        />
                      )}
                      {section.darkImg && (
                        <Image
                          width={400}
                          height={400}
                          src={section.darkImg}
                          alt={`${section.title} dark preview`}
                          className="object-contain p-4 hidden dark:block max-h-full"
                        />
                      )}
                    </>
                  ) : section.title === "Color Palette" ? (
                    <ColorPreview />
                  ) : section.title === "Typography" ? (
                    <TypographyPreview />
                  ) : null}
                </div>
                <div className="px-6 py-6 space-y-1">
                  <h3 className="text-base font-semibold leading-tight">
                    {section.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                    {section.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-10 py-4">
          © {new Date().getFullYear()} FIRA. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
