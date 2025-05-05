import { useEffect, useState } from "react";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useMDXComponents1 } from "@/mdx-component";
import { AlongWithOthers } from "@/app/type";
import { motion, AnimatePresence } from "framer-motion";
import { useFont } from "@/hooks/FontProvider";

interface CoBrandingProps {
  data: AlongWithOthers;
}

export default function CoBrandingLogoSection({ data }: CoBrandingProps) {
  const mdxComponents1 = useMDXComponents1;
  const [mdxTitle, setMdxTitle] = useState<MDXRemoteSerializeResult>();
  const [mdxDesc, setMdxDesc] = useState<MDXRemoteSerializeResult>();
  const [activeIndex, setActiveIndex] = useState(0);
  const { headerFont } = useFont();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains("dark");
      setIsDarkMode(darkMode);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const serializeContent = async () => {
      const serializedDesc = await serialize(data.desc);
      const serializedTitle = await serialize(data.title);
      setMdxDesc(serializedDesc);
      setMdxTitle(serializedTitle);
    };
    serializeContent();
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.svg.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.svg.length]);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const svgs = isDarkMode ? data.darkSvg : data.svg;

  return (
    <section className="flex flex-col lg:flex-row gap-8 overflow-hidden">
      <motion.div
        className="flex-1 space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" },
          },
        }}
      >
        <h2
          className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
          style={{ fontFamily: headerFont }}
        >
          {mdxTitle && <MDXRemote {...mdxTitle} components={mdxComponents1} />}
        </h2>
        <div className="text-neutral-700 dark:text-neutral-300 leading-6 text-sm">
          {mdxDesc && <MDXRemote {...mdxDesc} components={mdxComponents1} />}
        </div>
      </motion.div>

      <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
        <AnimatePresence mode="wait">
          {svgs.map(
            (url, idx) =>
              idx === activeIndex && (
                <motion.div
                  key={idx}
                  className="absolute w-full p-6 rounded-xl flex items-center justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={logoVariants}
                >
                  <Image
                    src={url}
                    alt={`co-brand-logo-${idx}`}
                    width={500}
                    height={100}
                    className="object-contain"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
