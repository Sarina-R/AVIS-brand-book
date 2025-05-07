"use client";

import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";
import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import { Cpu, Rocket, Star, Zap, Code, Globe } from "lucide-react";

// const particlesInit = async (main: any) => {
//   await loadFull(main);
// };

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const rotate = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

interface ValueItem {
  title: string;
  desc: string;
  link: string;
  icon: JSX.Element;
}

export default function StatementSection() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const valueItems: ValueItem[] = [
    {
      title: "Innovation",
      desc: "Pushing the boundaries of robotics and AI to create groundbreaking solutions.",
      link: "https://avisengine.com/innovation",
      icon: <Code className="text-2xl" />,
    },
    {
      title: "Collaboration",
      desc: "Fostering partnerships to amplify human and machine potential.",
      link: "https://events.avisengine.com",
      icon: <Globe className="text-2xl" />,
    },
    {
      title: "Precision",
      desc: "Engineering with accuracy to deliver reliable, impactful technology.",
      link: "https://avisengine.com/technology",
      icon: <Zap className="text-2xl" />,
    },
  ];

  return (
    <div className="relative bg-white dark:bg-neutral-950 text-black dark:text-white overflow-hidden">
      {isMounted && (
        <Particles
          id="tsparticles"
          // init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "bubble" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                bubble: { distance: 200, size: 5, duration: 2, opacity: 0.8 },
                push: { quantity: 4 },
              },
            },
            particles: {
              color: { value: ["#ff6b6b", "#4ecdc4", "#45b7d1"] },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 1,
              },
              number: { density: { enable: true, area: 800 }, value: 80 },
              opacity: { value: { min: 0.1, max: 0.5 } },
              shape: { type: ["circle", "triangle", "star"] },
              size: { value: { min: 1, max: 4 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}

      <svg
        className="absolute top-0 right-0 w-32 h-32 opacity-40 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="url(#grad1)"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#4ecdc4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M10 10 L90 10 L90 90"
          strokeWidth="3"
          initial="hidden"
          animate="visible"
          variants={lineDraw}
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-32 h-32 opacity-40 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="url(#grad2)"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#45b7d1", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M90 10 L10 10 L10 90"
          strokeWidth="3"
          initial="hidden"
          animate="visible"
          variants={lineDraw}
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-32 h-32 opacity-40 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="url(#grad3)"
      >
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#4ecdc4", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#45b7d1", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M10 90 L90 90 L90 10"
          strokeWidth="3"
          initial="hidden"
          animate="visible"
          variants={lineDraw}
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-32 h-32 opacity-40 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="url(#grad4)"
      >
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#4ecdc4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M90 90 L10 90 L10 10"
          strokeWidth="3"
          initial="hidden"
          animate="visible"
          variants={lineDraw}
        />
      </svg>
      {/* Center Circular SVG */}
      <svg
        className="absolute top-1/2 left-1/2 w-48 h-48 opacity-20 z-0 transform -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 200 200"
        fill="none"
        stroke="url(#grad5)"
      >
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#45b7d1", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ff6b6b", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <motion.g animate="animate" variants={rotate}>
          <path
            d="M100 20 A80 80 0 0 1 180 100 A80 80 0 0 1 100 180 A80 80 0 0 1 20 100 A80 80 0 0 1 100 20"
            strokeWidth="2"
          />
          <path
            d="M100 50 A50 50 0 0 1 150 100 A50 50 0 0 1 100 150 A50 50 0 0 1 50 100 A50 50 0 0 1 100 50"
            strokeWidth="2"
          />
        </motion.g>
      </svg>

      <section className="relative min-h-screen flex items-center justify-center py-16">
        <motion.div
          className="text-center max-w-3xl mx-auto px-4 z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            AVIS: Innovate, Automate, Inspire
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            AVIS is a leader in robotics and artificial intelligence, dedicated
            to creating intelligent systems that empower humanity. Our brand
            embodies innovation, precision, and a commitment to pushing
            technological boundaries.
          </p>
          <div className="flex justify-center gap-6">
            <motion.div whileHover="hover" variants={scaleHover}>
              <Rocket className="text-3xl text-black dark:text-white" />
            </motion.div>
            <motion.div whileHover="hover" variants={scaleHover}>
              <Cpu className="text-3xl text-black dark:text-white" />
            </motion.div>
            <motion.div whileHover="hover" variants={scaleHover}>
              <Star className="text-3xl text-black dark:text-white" />
            </motion.div>
            <motion.div whileHover="hover" variants={scaleHover}>
              <Zap className="text-3xl text-black dark:text-white" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-neutral-100 dark:bg-neutral-900 relative">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            className="text-3xl font-medium text-center mb-10"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-center"
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

      <section className="py-16 relative">
        <div className="container mx-auto px-4 z-10">
          <motion.h2
            className="text-3xl font-medium text-center mb-10"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Values & Vision
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueItems.map((item: ValueItem, index: number) => (
              <motion.div
                key={index}
                className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover="hover"
                variants={scaleHover}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
