"use client";

import { useState, useEffect, useRef } from "react";

export default function FontInspector() {
  const [selectedGlyph, setSelectedGlyph] = useState("e");
  const [fontSize, setFontSize] = useState(300);
  const glyphRef = useRef(null);

  const capHeight = 855;
  const xHeight = 310;
  const descender = 15;

  const glyphs = [
    // Uppercase letters
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    // Lowercase letters
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    // Numbers
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    // Punctuation and special characters
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "+",
    "=",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "/",
    "?",
    "`",
    "~",
    "|",
    "\\",
    // Extended characters (common in Latin-based fonts like Geist)
    "à",
    "á",
    "â",
    "ã",
    "ä",
    "å",
    "æ",
    "ç",
    "è",
    "é",
    "ê",
    "ë",
    "ì",
    "í",
    "î",
    "ï",
    "ð",
    "ñ",
    "ò",
    "ó",
    "ô",
    "õ",
    "ö",
    "ø",
    "ù",
    "ú",
    "û",
    "ü",
    "ý",
    "þ",
    "ÿ",
    "¡",
    "¢",
    "£",
    "¤",
    "¥",
    "¦",
    "§",
    "¨",
    "©",
    "ª",
    "«",
    "¬",
    "®",
    "¯",
    "°",
    "±",
    "²",
    "³",
    "´",
    "µ",
    "¶",
    "·",
    "¸",
    "¹",
    "º",
    "»",
    "¼",
    "½",
    "¾",
    "¿",
    "×",
    "÷",
  ];

  const handleGlyphSelect = (glyph: string) => {
    setSelectedGlyph(glyph);
  };

  useEffect(() => {
    const updateFontSize = () => {
      if (glyphRef.current) {
        const computedStyle = window.getComputedStyle(glyphRef.current);
        const computedFontSize = parseFloat(computedStyle.fontSize);
        setFontSize(computedFontSize);
      }
    };

    updateFontSize();

    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <div className="md:flex min-h-screen px-4">
      <div className="flex-1 py-4 sticky top-0 max-h-fit flex flex-col justify-center bg-white dark:bg-neutral-950">
        <div className="relative w-full flex justify-center">
          {/* Glyph */}
          <span
            ref={glyphRef}
            className="text-[300px] md:text-[400px] lg:text-[550px] leading-none z-10"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            {selectedGlyph}
          </span>

          {/* Cap Height Line */}
          <svg
            className="absolute w-full h-[1px] text-black dark:text-white"
            style={{ top: `${(capHeight / 1000) * fontSize}px` }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="gray"
              strokeWidth="3"
              strokeDasharray="4, 8"
            />
          </svg>

          {/* X-Height Line */}
          <svg
            className="absolute w-full h-[1px] text-black dark:text-white"
            style={{ top: `${(xHeight / 1000) * fontSize}px` }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="gray"
              strokeWidth="3"
              strokeDasharray="4, 8"
            />
          </svg>

          {/* Baseline Line */}
          <svg
            className="absolute w-full h-[1px] text-black dark:text-white"
            style={{ top: `${(142 / 1000) * fontSize}px` }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="gray"
              strokeWidth="3"
              strokeDasharray="4, 8"
            />
          </svg>

          {/* Descender Line */}
          <svg
            className="absolute w-full h-[1px] text-black dark:text-white"
            style={{ top: `${((1000 + descender) / 1000) * fontSize}px` }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="gray"
              strokeWidth="3"
              strokeDasharray="4, 8"
            />
          </svg>

          {/* Cap Height Label */}
          <div
            className="absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs"
            style={{ top: `${(capHeight / 1000) * fontSize - 10}px` }}
          >
            <span>BASELINE</span>
            <span>{capHeight}</span>
          </div>

          {/* X-Height Label */}
          <div
            className="absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs"
            style={{ top: `${(xHeight / 1000) * fontSize - 10}px` }}
          >
            <span>X-HEIGHT</span>
            <span>{xHeight}</span>
          </div>

          {/* Baseline Label */}
          <div
            className="absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs"
            style={{ top: `${(0 / 1000) * fontSize - 10}px` }}
          >
            <span>CAP HEIGHT</span>
            <span>0</span>
          </div>

          {/* Descender Label */}
          <div
            className="absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs"
            style={{ top: `${((1000 + descender) / 1000) * fontSize - 10}px` }}
          >
            <span>DESCENDER</span>
            <span>{descender}</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="grid xl:grid-cols-9 lg:grid-cols-8 grid-cols-5">
          {glyphs.map((glyph, index) => (
            <div
              key={index}
              className="p-2 py-4 text-2xl lg:text-4xl text-center border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex justify-center"
              onMouseEnter={() => handleGlyphSelect(glyph)}
              onClick={() => handleGlyphSelect(glyph)}
            >
              {glyph}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
