"use client";

import { Section } from "@/app/type";
import { useData } from "@/hooks/DataProvider";
import { usePathname } from "next/navigation";
import { useMDXComponents } from "@/mdx-component";
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

const Page = () => {
  const { data, loading } = useData();
  const pathname = usePathname();
  const mdxComponents = useMDXComponents({});

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
          return <StatementSection key={section.type} section={section} />;
        case "brand_prism":
          return (
            <BrandPrism
              key={section.type}
              section={section}
              primaryColor={data.brand.color.primaryColor || "black"}
            />
          );
        case "tone_of_voice":
          return (
            <ToneOfVoiceSection
              key={section.type}
              section={section}
              primaryColor={data.brand.color.primaryColor}
            />
          );
        case "tagline":
          return <TaglineSection key={section.type} section={section} />;
        case "design_principles":
          return (
            <DesignPrinciplesSection
              key={section.type}
              section={section}
              primaryColor={data.brand.color.primaryColor}
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

  return <div>{renderSection()}</div>;
};

export default Page;
