"use client";

import { useState } from "react";
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

const BrandShowcaseComponent = ({
  primaryColor,
  secondaryColor,
}: // actionColor,
{
  primaryColor: string;
  secondaryColor: string;
  // actionColor: string;
}) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const colors = [
    {
      name: "Primary",
      hex: primaryColor,
    },
    {
      name: "Secondary",
      hex: secondaryColor,
    },
    // {
    //   name: "Action",
    //   hex: actionColor,
    // },
  ];

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black dark:bg-white">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="absolute inset-0 flex items-center justify-center neutral-2 gap-4 p-6">
        {colors.map((color, index) => (
          <motion.div
            key={color.name}
            className="relative w-20 h-20 rounded-full cursor-pointer"
            style={{ backgroundColor: color.hex, border: "1px solid #e5e5e5" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.2, boxShadow: `0 0 20px ${color.hex}` }}
            onHoverStart={() => setHoveredColor(color.hex)}
            onHoverEnd={() => setHoveredColor(null)}
          >
            <AnimatePresence>
              {hoveredColor === color.hex && (
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>
                    {color.name}: {color.hex}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-4 left-4 text-white dark:text-black text-lg font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Modern. Bold. Timeless.
      </motion.div>
    </div>
  );
};

const Header = ({
  serializedItems,
  primaryColor,
  secondaryColor,
}: // actionColor,
{
  serializedItems: Serialized<ColorItems | undefined>;
  section: Color;
  primaryColor: string;
  secondaryColor: string;
  actionColor: string;
}) => {
  const mdxComponents = useMDXComponents({});

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
        <BrandShowcaseComponent
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          // actionColor={actionColor}
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
