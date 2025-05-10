"use client";

import { motion } from "framer-motion";
import { JSX } from "react";
import Tilt from "react-parallax-tilt";
import { MessageCircle, PenTool, Sparkles, Volume2 } from "lucide-react";

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

const neonLine = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

interface ToneItem {
  title: string;
  desc: string;
  icon: JSX.Element;
}

export default function ToneOfVoiceSection({
  primaryColor,
}: {
  primaryColor: string;
}) {
  const toneItems: ToneItem[] = [
    {
      title: "Clear & Precise",
      desc: "Our communication is sharp and concise, distilling complex AI and robotics concepts into clear, impactful messages.",
      icon: (
        <PenTool
          color={primaryColor}
          className="text-3xl dark:text-[#4ba8e8]"
        />
      ),
    },
    {
      title: "Confident & Visionary",
      desc: "We speak with bold assurance, painting a vivid picture of a future shaped by intelligent technology.",
      icon: (
        <Sparkles
          color={primaryColor}
          className="text-3xl dark:text-[#4ba8e8]"
        />
      ),
    },
    {
      title: "Engaging & Human",
      desc: "Our voice resonates with warmth and relatability, making advanced tech feel approachable and inspiring.",
      icon: (
        <MessageCircle
          color={primaryColor}
          className="text-3xl dark:text-[#4ba8e8]"
        />
      ),
    },
    {
      title: "Inspirational",
      desc: "We ignite curiosity and ambition, motivating others to join us in revolutionizing the world through innovation.",
      icon: (
        <Volume2
          color={primaryColor}
          className="text-3xl dark:text-[#4ba8e8]"
        />
      ),
    },
  ];

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
              className="dark:text-[#4ba8e8]"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            // style={{ color: primaryColor }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text dark:text-transparent text-[#4ba8e8] dark:bg-gradient-to-r dark:from-[#4ba8e8] dark:to-[#127cc1]"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            How We Speak
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
                      {item.icon}
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
