"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Button } from "@/components/ui/button";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { Logo } from "@/app/type";
import { motion } from "framer-motion";
import LogoSlider from "../LogoSlider";
import LogoBackground from "../LogoBG";
import CoBrandingLogoSection from "../CoBrandingLogoSection";
import { useFont } from "@/hooks/FontProvider";

const LogoSection = ({
  section,
  logo,
  darkLogo,
}: {
  section: Logo;
  logo: string;
  darkLogo: string;
}) => {
  const mdxComponents1 = useMDXComponents1({});
  const mdxComponents = useMDXComponents({});
  const [mdxSource, setMdxSource] = useState<
    string | MDXRemoteSerializeResult
  >();
  const { headerFont } = useFont();

  useEffect(() => {
    const serializedFunction = async () => {
      const mdxSource = await serialize(section.items.MDXComponentForLogo);
      setMdxSource(mdxSource);
    };
    serializedFunction();
  }, [section.items]);

  const download = section.items.download ?? "#";
  const downloadBtnText = section.items.downloadBtnText ?? "Download the logo";

  const fadeIn = (direction: "left" | "right" | "up" | "down" = "up") => {
    const variants = {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      },
    };
    return variants;
  };

  const bounceFade = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="lg:p-8 p-4 lg:space-y-24 space-y-16 capitalize"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        variants={fadeIn("left")}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center p-6 rounded-xl border w-full"
          variants={bounceFade}
        >
          <div className="w-full max-w-md flex justify-center">
            <Image
              src={logo}
              alt="logo"
              width={300}
              height={100}
              className="object-contain block dark:hidden"
            />
            <Image
              src={darkLogo}
              alt="dark logo"
              width={300}
              height={100}
              className="object-contain hidden dark:block"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-between gap-6"
          variants={fadeIn("right")}
        >
          <motion.div variants={fadeIn("down")} className="space-y-4">
            {section.items.title && (
              <div
                className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200"
                style={{ fontFamily: headerFont }}
              >
                <MDXRemote
                  {...(section.items.title as MDXRemoteSerializeResult)}
                  components={mdxComponents1}
                />
              </div>
            )}
            {section.items.desc && (
              <div className="text-sm leading-6 whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                <MDXRemote
                  {...(section.items.desc as MDXRemoteSerializeResult)}
                  components={mdxComponents1}
                />
              </div>
            )}
          </motion.div>

          <motion.div variants={bounceFade}>
            <a href={download} download>
              <Button className="lg:max-w-xs whitespace-normal break-keep lg:py-6">
                {downloadBtnText}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {mdxSource && (
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MDXRemote
            {...(mdxSource as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        </motion.div>
      )}

      <motion.div
        variants={fadeIn("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <LogoSlider versions={section.items.logoVersion} />
      </motion.div>

      <motion.div
        variants={fadeIn("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <LogoBackground data={section.items.inBackgroundSection} />
      </motion.div>

      <motion.div
        variants={bounceFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CoBrandingLogoSection data={section.items.alongWithOthers} />
      </motion.div>

      {section.items.MDXComponent && (
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MDXRemote
            {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LogoSection;
