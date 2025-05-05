import { HarmonySection } from "@/app/type";
import { useFont } from "@/hooks/FontProvider";
import { useMDXComponents } from "@/mdx-component";
import { AnimatePresence, motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

const FlexComponent = ({ data }: { data: HarmonySection }) => {
  const mdxComponents = useMDXComponents({});
  const { headerFont } = useFont();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto lg:flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 overflow-hidden"
      >
        <div className="flex-1 space-y-6">
          <div
            className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold"
            style={{ fontFamily: headerFont }}
          >
            {data?.title && (
              <MDXRemote
                {...(data.title as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            )}
          </div>
          <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-6">
            {data?.description && (
              <MDXRemote
                {...(data.description as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg items-center mx-auto">
          <div className="relative rounded-3xl overflow-hidden aspect-w-4 aspect-h-3">
            <AnimatePresence>
              <motion.img
                key={data.img}
                src={data.img}
                alt="Slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlexComponent;
