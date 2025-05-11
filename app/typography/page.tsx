"use client";

import TypographySection from "@/components/dynamic-section/TypographySection";
import { useData } from "@/hooks/DataProvider";

const page = () => {
  const { data } = useData();

  const section = data?.sections.find((sec) => sec.type === "typography");

  return section ? (
    <TypographySection key={section.type} section={section} />
  ) : (
    "loading"
  );
};

export default page;
