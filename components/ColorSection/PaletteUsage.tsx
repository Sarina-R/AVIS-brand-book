import { PaletteUsage as PaletteUsageType } from "@/app/type";
import { MDXRemote } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-component";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useFont } from "@/hooks/FontProvider";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const PaletteUsage = ({ usage }: { usage: PaletteUsageType }) => {
  const mdxComponents = useMDXComponents({});
  const { headerFont } = useFont();

  return (
    <motion.div
      className="container mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <motion.h2
        variants={fadeUp}
        className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold mb-4"
        style={{ fontFamily: headerFont }}
      >
        {typeof usage.title === "string" ? (
          usage.title
        ) : (
          <MDXRemote {...usage.title} components={mdxComponents} />
        )}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mb-8 text-neutral-700 dark:text-neutral-300 text-sm"
      >
        {typeof usage.description === "string" ? (
          usage.description
        ) : (
          <MDXRemote {...usage.description} components={mdxComponents} />
        )}
      </motion.p>

      <motion.div variants={fadeUp} className="mb-8">
        <h3
          className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200"
          style={{ fontFamily: headerFont }}
        >
          Main Structure
        </h3>
        <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300">
          {usage.mainStructure.map((item) => (
            <motion.li key={item.id} variants={fadeUp} className="mb-2 text-sm">
              {item.name} (Background:
              <span
                style={{ backgroundColor: item.background }}
                className="px-[0.65rem] m-1 rounded border"
              />
              )
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Usage Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
      >
        {/* Correct Usage */}
        {usage.usageGuidelines.correct.map((item) => (
          <motion.div
            key={`${item.id}-${item.background}`}
            variants={cardAnim}
            className="relative rounded-lg shadow-md overflow-hidden h-40"
            style={{ backgroundColor: item.background }}
          >
            <div className="p-4 flex justify-between items-center">
              <p
                className="absolute bottom-6 font-semibold"
                style={{ color: item.text }}
              >
                This combination is legible and correct
              </p>
              <div className="absolute right-3 top-5">
                <div
                  className="flex gap-2 text-white text-sm font-bold items-center justify-center px-2 bg-green-600 rounded-3xl p-1"
                  aria-label="Correct usage"
                >
                  Correct
                  <div className="rounded-full bg-green-400 p-1">
                    <Check color="white" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Incorrect Usage */}
        {usage.usageGuidelines.incorrect.map((item) => (
          <motion.div
            key={item.id}
            variants={cardAnim}
            className="relative rounded-lg shadow-md overflow-hidden h-40"
            style={{ backgroundColor: item.background }}
          >
            <div className="p-4 flex justify-between items-center">
              <p
                className="absolute bottom-6 font-semibold"
                style={{ color: item.text }}
              >
                This combination is illegible and incorrect.
              </p>
              <div className="absolute right-3 top-5">
                <div
                  className="flex gap-2 text-white text-sm font-bold items-center justify-center px-2 bg-red-600 rounded-3xl p-1"
                  aria-label="Incorrect usage"
                >
                  Incorrect
                  <div className="rounded-full bg-red-400 p-1">
                    <X color="white" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PaletteUsage;
