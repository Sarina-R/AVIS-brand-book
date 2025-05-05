"use client";

import { createContext, useContext, ReactNode } from "react";

type FontContextType = {
  bodyFont: string;
  headerFont: string;
  fontMeta: { weights?: number[]; subsets?: string[] };
};

const FontContext = createContext<FontContextType>({
  bodyFont: "Roboto",
  headerFont: "Roboto",
  fontMeta: {},
});

export const useFont = () => useContext(FontContext);

export const FontProvider = ({
  children,
  font,
}: {
  children: ReactNode;
  font: {
    name?: string;
    headers?: string;
    weights?: number[];
    subsets?: string[];
  };
}) => {
  const bodyFont = font.name ?? "Roboto";
  const headerFont = font.headers ?? bodyFont;

  return (
    <FontContext.Provider
      value={{
        bodyFont,
        headerFont,
        fontMeta: {
          weights: font.weights ?? [400, 700],
          subsets: font.subsets ?? ["latin"],
        },
      }}
    >
      {children}
    </FontContext.Provider>
  );
};
