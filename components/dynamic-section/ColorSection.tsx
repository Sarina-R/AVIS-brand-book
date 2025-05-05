"use client";

import { useEffect, useState } from "react";
import { Color, ColorItems } from "@/app/type";
import { Serialized, serializeTextFields } from "@/lib/serializeTextFields";
import PaletteUsage from "../ColorSection/PaletteUsage";
import FlexComponent from "../ColorSection/FlexComponent";
import Header from "../ColorSection/Header";
import PaletteComponent from "../ColorSection/Palette";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideIn = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ColorSection = ({
  section,
  primaryColor,
}: {
  section: Color;
  primaryColor: string;
}) => {
  const mdxComponent = useMDXComponents({});
  const [serializedItems, setSerializedItems] =
    useState<Serialized<ColorItems | undefined>>();

  useEffect(() => {
    const serializeFunction = async () => {
      const serializedItems = await serializeTextFields(section.items);
      setSerializedItems(serializedItems);
    };

    serializeFunction();
  }, [section]);

  return (
    <div className="px-2 md:px-6 lg:px-14 py-16 space-y-24 md:space-y-32 capitalize">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Header
          serializedItems={serializedItems}
          section={section}
          primaryColor={primaryColor}
        />
      </motion.div>

      {serializedItems?.palette && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideIn}
        >
          <PaletteComponent palette={serializedItems.palette} />
        </motion.div>
      )}

      {serializedItems?.Harmony && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <FlexComponent data={serializedItems.Harmony} />
        </motion.div>
      )}

      {serializedItems?.Gradient && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <FlexComponent data={serializedItems.Gradient} />
        </motion.div>
      )}

      {serializedItems?.paletteUsage && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
        >
          <PaletteUsage usage={serializedItems.paletteUsage} />
        </motion.div>
      )}

      {section.items.MDXComponent && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <MDXRemote
            {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
            components={mdxComponent}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ColorSection;
