"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ToneItem, ToneOfVoice } from "@/app/type";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents1 } from "@/mdx-component";
import * as LucideIcons from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const glowPulse = {
  animate: {
    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ToneOfVoiceSection({
  primaryColor,
  primaryDarkColor,
  section,
}: {
  primaryColor: string;
  primaryDarkColor: string;
  section: ToneOfVoice;
}) {
  const mdxComponent1 = useMDXComponents1({});
  const toneItems: ToneItem[] = section.items.toneItems;

  const IconRenderer = ({
    iconName,
    color,
  }: {
    iconName: string;
    color: string;
  }) => {
    const iconComponent = LucideIcons[iconName as keyof typeof LucideIcons];

    if (
      typeof iconComponent === "function" ||
      (typeof iconComponent === "object" && iconComponent !== null)
    ) {
      const Icon = iconComponent as React.FC<{
        color?: string;
        className?: string;
      }>;
      return <Icon color={color} className="text-3xl dark:text-[#4ba8e8]" />;
    }

    return null;
  };

  return (
    <div className="relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              color={primaryColor}
              className={`"dark:text-[${primaryDarkColor}]"`}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            className={`text-4xl font-bold text-center mb-16 bg-clip-text dark:text-transparent dark:bg-gradient-to-r`}
            style={{
              color: primaryDarkColor,
              backgroundImage: `linear-gradient(to right, ${primaryDarkColor}, ${primaryColor})`,
            }}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <MDXRemote
              {...(section.items.title as MDXRemoteSerializeResult)}
              components={mdxComponent1}
            />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {toneItems.map((item, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
              >
                <motion.div
                  className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm lg:min-h-50 sm:min-h-64 min-h-max p-6 border border-neutral-200 dark:border-[#4ba8e8]/50 shadow-lg hover:shadow-[#127cc1]/20 dark:hover:shadow-[#4ba8e8]/30 transition-shadow"
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div animate="animate" variants={glowPulse}>
                      <IconRenderer
                        iconName={item.icon as string}
                        color={primaryColor}
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {item.desc}
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
