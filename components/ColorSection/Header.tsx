"use client";

import { useState, useEffect } from "react";
import { Color, ColorItems } from "@/app/type";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Serialized } from "@/lib/serializeTextFields";
import { useMDXComponents } from "@/mdx-component";
import { motion, AnimatePresence } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Header = ({
  serializedItems,
  section,
  primaryColor,
}: {
  serializedItems: Serialized<ColorItems | undefined>;
  section: Color;
  primaryColor: string;
}) => {
  const mdxComponents = useMDXComponents({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === section.items.img.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [section.items.img.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="lg:flex flex-col-reverse md:flex-row gap-10 space-y-8"
    >
      <div className="flex-1 lg:sticky top-15 h-full">
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200"
        >
          {serializedItems?.title && (
            <MDXRemote
              {...(serializedItems.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          )}
        </motion.div>

        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-sm text-neutral-700 dark:text-neutral-300"
        >
          {serializedItems?.desc && (
            <MDXRemote
              {...(serializedItems.desc as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex-1 h-72 rounded-3xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {section.items.img.map((imgSrc, index) =>
            index === currentImageIndex ? (
              <motion.img
                key={imgSrc}
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1 }}
                className="absolute w-full h-full object-cover object-center"
              />
            ) : null
          )}
        </AnimatePresence>

        <svg
          className="absolute left-[-5rem] bottom-[-6rem] z-10"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M300 300C300 134.314 165.686 0 0 0V300H300Z"
            fill={primaryColor}
          />
          <path
            d="M300 300C300 134.314 165.686 0 0 0"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <path
            d="M280 280C280 149.668 150.332 20 0 20"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <path
            d="M260 260C260 165.022 134.978 40 0 40"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
        </svg>
        <svg
          className="absolute right-[-5rem] top-[-6rem] z-10 rotate-180"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M300 300C300 134.314 165.686 0 0 0V300H300Z"
            fill={primaryColor}
          />
          <path
            d="M300 300C300 134.314 165.686 0 0 0"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <path
            d="M280 280C280 149.668 150.332 20 0 20"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <path
            d="M260 260C260 165.022 134.978 40 0 40"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top right,${primaryColor} , transparent)`,
            zIndex: 3,
          }}
          className="opacity-30"
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
