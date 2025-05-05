import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Statement } from "@/app/type";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useFont } from "@/hooks/FontProvider";

interface StatementProps {
  section: Statement;
}

const StatementSection = ({ section }: StatementProps) => {
  const mdxComponents = useMDXComponents({});
  const mdxComponents1 = useMDXComponents1({});
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { headerFont } = useFont();

  const items = section.items.items;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const variants = {
    enter: {
      y: 10,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };

  return (
    <div className="statement-section sm:p-6 p-2 space-y-16 text-neutral-700 dark:text-neutral-300 mt-10 capitalize">
      <div className="sm:flex justify-between space-y-6 gap-6">
        <div className="w-full sm:w-1/2 flex flex-col font-bold space-y-1 sm:sticky sm:top-15 h-full pt-3">
          <div
            className="text-sm font-light text-neutral-500"
            style={{ fontFamily: headerFont }}
          >
            {section.items?.title && (
              <MDXRemote
                {...(section.items.title as MDXRemoteSerializeResult)}
                components={mdxComponents1}
              />
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentItemIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="item-text text-xl"
            >
              {items[currentItemIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full sm:w-1/2 flex flex-col justify-center">
          <MDXRemote
            {...(section.items.desc as MDXRemoteSerializeResult)}
            components={mdxComponents1}
          />
        </div>
      </div>

      <div className="sm:m-auto m-[-1rem]">
        {section.items?.MDXComponent && (
          <MDXRemote
            {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        )}
      </div>
    </div>
  );
};

export default StatementSection;
