"use client";

import { Section } from "@/app/type";
import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import OverviewSection from "@/components/dynamic-section/OverviewSection";
import StatementSection from "@/components/dynamic-section/StatementSection";
import BrandPrism from "@/components/dynamic-section/BrandPrism";
import ToneOfVoiceSection from "@/components/dynamic-section/ToneOfVoiceSection";
import TaglineSection from "@/components/dynamic-section/TaglineSection";
import DesignPrinciplesSection from "@/components/dynamic-section/DesignPrinciplesSection";
import LogoSection from "@/components/dynamic-section/LogoSection";
import ColorSection from "@/components/dynamic-section/ColorSection";
import TypographySection from "@/components/dynamic-section/TypographySection";
import { motion } from "framer-motion";
import { Cpu, Rocket, Star, Zap } from "lucide-react";
import { useTheme } from "next-themes";

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

const Page = () => {
  const { data, loading } = useData();
  const pathname = usePathname();
  const mdxComponents = useMDXComponents({});
  const mdxComponent1 = useMDXComponents1({});

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isMDXSection = (
    section: Section
  ): section is Section & {
    items: { MDXComponent: MDXRemoteSerializeResult };
  } => {
    return !!section?.items?.MDXComponent;
  };

  if (loading || !data) {
    return <div className="text-center text-neutral-500">Loading...</div>;
  }

  const parts = pathname.split("/").filter(Boolean);
  const itemId = parts[0];

  if (!itemId) {
    return (
      <div className="text-red-500 text-center mt-10 min-h-[72vh]">
        Invalid page ID
      </div>
    );
  }

  const currentType = Object.values(data.menu)
    .flatMap((menu) => menu.items)
    .find((item) => item.id === itemId)?.type;

  if (!currentType) {
    return (
      <div className="text-red-500 text-center mt-10 min-h-[72vh]">
        Page not found
      </div>
    );
  }

  const section = data.sections.find((sec) => sec.type === currentType);

  const primaryColor = data.brand.color.primaryColor;
  const primaryDarkColor = data.brand.color.primaryDarkColor;

  const renderSection = () => {
    if (!section) {
      return (
        <div className="text-red-500 text-center mt-10 min-h-[72vh]">
          Section not found
        </div>
      );
    }

    try {
      switch (section.type) {
        case "overview":
          return <OverviewSection key={section.type} section={section} />;
        case "statement":
          return (
            <StatementSection
              key={section.type}
              section={section}
              primaryColor={primaryColor}
            />
          );
        case "brand_prism":
          return (
            <BrandPrism
              key={section.type}
              section={section}
              primaryColor={primaryColor || "black"}
            />
          );
        case "tone_of_voice":
          return (
            <ToneOfVoiceSection
              key={section.type}
              section={section}
              primaryColor={primaryColor}
              primaryDarkColor={primaryDarkColor}
            />
          );
        case "tagline":
          return <TaglineSection key={section.type} section={section} />;
        case "design_principles":
          return (
            <DesignPrinciplesSection
              key={section.type}
              section={section}
              primaryColor={primaryColor}
            />
          );
        case "logo":
          return (
            <LogoSection
              key={section.type}
              section={section}
              logo={data.brand.logo}
              darkLogo={data.brand.darkLogo}
            />
          );
        case "mascot":
        case "identity_in_use":
          return <TaglineSection key={section.type} section={section} />;
        case "color":
          return (
            <ColorSection
              key={section.type}
              section={section}
              primaryColor={data.brand.color.primaryColor}
            />
          );
        case "typography":
          return <TypographySection key={section.type} section={section} />;
        default:
          if (isMDXSection(section)) {
            return (
              <div className="sm:p-6 p-2 space-y-8 capitalize">
                <MDXRemote
                  {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
                  components={mdxComponents}
                />
              </div>
            );
          }
          return (
            <div className="text-orange-500 text-center mt-10">
              Unsupported section type: <strong>{section.type}</strong>
            </div>
          );
      }
    } catch (error) {
      console.error("Error rendering section:", error);
      return (
        <div className="text-red-500 text-center mt-10">
          An unexpected error occurred while rendering this section.
        </div>
      );
    }
  };

  return (
    <div>
      <div key={pathname} className="relative overflow-hidden">
        <svg
          className="absolute top-0 right-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M10 10 L90 10 L90 90"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            style={{
              stroke: isDark ? primaryDarkColor : primaryColor,
            }}
          />
        </svg>
        <svg
          className="absolute top-0 left-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M90 10 L10 10 L10 90"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            style={{
              stroke: isDark ? primaryDarkColor : primaryColor,
            }}
          />
        </svg>
        <svg
          className="absolute top-[74vh] right-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M10 90 L90 90 L90 10"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            style={{
              stroke: isDark ? primaryDarkColor : primaryColor,
            }}
          />
        </svg>
        <svg
          className="absolute top-[74vh] left-0 w-32 h-32 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M90 90 L10 90 L10 10"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={lineDraw}
            style={{
              stroke: isDark ? primaryDarkColor : primaryColor,
            }}
          />
        </svg>

        <section className="relative min-h-screen flex items-center justify-center py-16 sm:px-15">
          <motion.div
            className="text-center max-w-3xl mx-auto px-4 z-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              {typeof section?.title === "object" ? (
                <MDXRemote
                  {...(section.title as MDXRemoteSerializeResult)}
                  components={mdxComponent1}
                />
              ) : (
                section?.title
              )}
            </h1>

            <span className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              {typeof section?.description === "object" ? (
                <MDXRemote
                  {...(section.description as MDXRemoteSerializeResult)}
                  components={mdxComponent1}
                />
              ) : (
                section?.description
              )}
            </span>

            <div className="flex justify-center gap-6 mt-8">
              <motion.div whileHover="hover" variants={scaleHover}>
                <Rocket color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Cpu color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Star color={primaryColor} className="text-3xl" />
              </motion.div>
              <motion.div whileHover="hover" variants={scaleHover}>
                <Zap color={primaryColor} className="text-3xl" />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {renderSection()}
    </div>
  );
};

export default Page;
