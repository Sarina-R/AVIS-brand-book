"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoVersion } from "@/app/type";
import { useMDXComponents1 } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { motion, AnimatePresence } from "framer-motion";
import { useFont } from "@/hooks/FontProvider";

interface LogoSectionProps {
  versions: LogoVersion[];
}

const LogoSlider = ({ versions }: LogoSectionProps) => {
  const [index, setIndex] = useState(0);
  const [mdxSources, setMdxSources] = useState<MDXRemoteSerializeResult[]>([]);
  const mdxComponents1 = useMDXComponents1({});
  const { headerFont } = useFont();

  const next = () => setIndex((prev) => (prev + 1) % versions.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + versions.length) % versions.length);

  useEffect(() => {
    const serializeTexts = async () => {
      const serialized = await Promise.all(
        versions.map((item) => serialize(item.text))
      );
      setMdxSources(serialized);
    };
    serializeTexts();
  }, [versions]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotate: 5,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const buttonVariants = {
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[400px]">
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ fontFamily: headerFont }}
        >
          Versions
        </motion.h2>
        <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-6">
          {mdxSources.map((mdx, i) => (
            <motion.li
              key={versions[i].id}
              custom={i}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              className={
                i === index
                  ? "font-bold border rounded-lg py-2 px-3"
                  : "py-2 px-3"
              }
            >
              <MDXRemote {...mdx} components={mdxComponents1} />
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="relative flex flex-col items-center">
        <motion.div
          className="border rounded-2xl p-8 w-full flex justify-center items-center min-h-[350px]"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={versions[index].svg}
                alt={versions[index].name}
                width={200}
                height={200}
                className="object-contain block dark:hidden"
              />
              <Image
                src={versions[index].darkSvg}
                alt={versions[index].name}
                width={200}
                height={200}
                className="object-contain hidden dark:block"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center w-full mt-4">
          <div className="flex justify-center gap-4">
            <motion.div variants={buttonVariants} whileTap="tap">
              <Button size="icon" onClick={next}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileTap="tap">
              <Button size="icon" onClick={prev}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
          <motion.p
            className="font-bold text-sm text-right w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {versions[index].name}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
