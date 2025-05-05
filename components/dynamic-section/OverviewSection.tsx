"use client";

import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { Overview } from "@/app/type";

interface OverviewProps {
  section: Overview;
}

const OverviewSection: React.FC<OverviewProps> = ({ section }) => {
  const mdxComponents = useMDXComponents({});
  const mdxComponents1 = useMDXComponents1({});

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 xl:px-24 lg:px-12 px-6 py-12 capitalize">
        <motion.div
          className="flex-1 max-w-md lg:sticky top-15 z-20 self-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">
            {section?.items?.group}
          </p>
          <h3 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            {section.items?.title && (
              <MDXRemote
                {...(section.items.title as MDXRemoteSerializeResult)}
                components={mdxComponents1}
              />
            )}
          </h3>
        </motion.div>
        <div className="flex-1 flex flex-col">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {section.items.desc && (
              <div className="prose prose-lg text-neutral-700 dark:text-neutral-300">
                <MDXRemote
                  {...(section.items.desc as MDXRemoteSerializeResult)}
                  components={mdxComponents1}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
      {section.items.MDXComponent && (
        <MDXRemote
          {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
          components={mdxComponents}
        />
      )}
    </>
  );
};

export default OverviewSection;
