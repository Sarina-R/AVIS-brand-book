import { IdentityInUse, Mascot, Tagline } from "@/app/type";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import { useFont } from "@/hooks/FontProvider";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TaglineSection = ({
  section,
}: {
  section: Tagline | Mascot | IdentityInUse;
}) => {
  const mdxComponents = useMDXComponents({});
  const mdxComponents1 = useMDXComponents1({});
  const { headerFont } = useFont();

  return (
    <motion.div
      className="sm:p-6 p-2 space-y-8 capitalize"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
    >
      {(section.items.title || section.items.desc) && (
        <motion.div
          variants={fadeInUp}
          className="space-y-4 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-2xl"
        >
          <div
            className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold"
            style={{ fontFamily: headerFont }}
          >
            {section.items.title && (
              <MDXRemote
                {...(section.items.title as MDXRemoteSerializeResult)}
                components={mdxComponents1}
              />
            )}
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            {section.items.desc && (
              <MDXRemote
                {...(section.items.desc as MDXRemoteSerializeResult)}
                components={mdxComponents1}
              />
            )}
          </div>
        </motion.div>
      )}
      {section.items.MDXComponent && (
        <motion.div variants={fadeInUp}>
          <MDXRemote
            {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaglineSection;
