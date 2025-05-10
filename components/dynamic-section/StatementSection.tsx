"use client";

import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { Zap, Code, Globe } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const rotate = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

const glowPulse = {
  animate: {
    filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

interface ValueItem {
  title: string;
  desc: string;
  link: string;
  icon: JSX.Element;
}

export default function StatementSection({
  primaryColor,
}: {
  primaryColor: string;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const valueItems: ValueItem[] = [
    {
      title: "Innovation",
      desc: "Pushing the boundaries of robotics and AI to create groundbreaking solutions.",
      link: "https://avisengine.com/innovation",
      icon: (
        <Code
          className="text-2xl dark:text-[#4ba8e8]"
          style={{ color: primaryColor }}
        />
      ),
    },
    {
      title: "Collaboration",
      desc: "Fostering partnerships to amplify human and machine potential.",
      link: "https://events.avisengine.com",
      icon: (
        <Globe
          className="text-2xl dark:text-[#4ba8e8]"
          style={{ color: primaryColor }}
        />
      ),
    },
    {
      title: "Precision",
      desc: "Engineering with accuracy to deliver reliable, impactful technology.",
      link: "https://avisengine.com/technology",
      icon: (
        <Zap
          className="text-2xl dark:text-[#4ba8e8]"
          style={{ color: primaryColor }}
        />
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {isMounted && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "bubble" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
                push: { quantity: 3 },
              },
            },
            particles: {
              color: { value: [primaryColor, "#4ba8e8"] },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.8,
              },
              number: { density: { enable: true, area: 1000 }, value: 60 },
              opacity: { value: { min: 0.2, max: 0.6 } },
              shape: { type: ["circle", "triangle", "star"] },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}

      <svg
        className="absolute top-1/2 left-1/2 w-64 h-64 opacity-30 z-0 transform -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 200 200"
        fill="none"
      >
        <motion.g animate="animate" variants={rotate}>
          <path
            d="M100 20 A80 80 0 0 1 180 100 A80 80 0 0 1 100 180 A80 80 0 0 1 20 100 A80 80 0 0 1 100 20"
            strokeWidth="2"
            style={{ stroke: primaryColor }}
            className="dark:stroke-[#4ba8e8]"
          />
          <path
            d="M100 50 A50 50 0 0 1 150 100 A50 50 0 0 1 100 150 A50 50 0 0 1 50 100 A50 50 0 0 1 100 50"
            strokeWidth="2"
            style={{ stroke: primaryColor }}
            className="dark:stroke-[#4ba8e8]"
          />
        </motion.g>
      </svg>

      <section className="py-20 relative">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            At AVIS, our mission is to architect a future where robotics and AI
            seamlessly integrate with human potential, driving progress and
            solving global challenges through innovation and collaboration.
          </motion.p>
        </div>
      </section>

      <section className="py-20 relative mb-24">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 dark:text-[#4ba8e8]"
            style={{ color: primaryColor }}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Values & Vision
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueItems.map((item: ValueItem, index: number) => (
              <motion.div
                key={index}
                className="relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-[#4ba8e8]/50 shadow-lg hover:shadow-lg transition-shadow"
                style={{
                  boxShadow: `0 4px 20px ${primaryColor}40`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover="hover"
                variants={scaleHover}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-xl dark:border-[#4ba8e8]/30"
                  animate="animate"
                  variants={glowPulse}
                />
                <div className="flex items-center gap-4 mb-4">
                  <motion.div animate="animate" variants={glowPulse}>
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
