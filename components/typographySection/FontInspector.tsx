"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";

export default function FontInspector() {
  const [selectedGlyph, setSelectedGlyph] = useState<string>("e");
  const [fontSize, setFontSize] = useState<number>(300);
  const [fontWeight, setFontWeight] = useState<string>("400");
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
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

  const fontWeights = [
    { value: "100", label: "Thin" },
    { value: "200", label: "Ultra Light" },
    { value: "300", label: "Light" },
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semi Bold" },
    { value: "700", label: "Bold" },
    { value: "800", label: "Black" },
    { value: "900", label: "Ultra Black" },
  ];

  const commonWeights = ["100", "300", "400", "700", "800"];

  const handleWeightSelect = (weight: string) => {
    setFontWeight(weight);
  };

  const handleGlyphSelect = (glyph: string) => {
    setSelectedGlyph(glyph);
  };

  useEffect(() => {
    if (glyphRef.current) {
      const computedStyle = window.getComputedStyle(glyphRef.current);
      const computedFontSize = parseFloat(computedStyle.fontSize);
      setFontSize(computedFontSize);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true); // Disable transitions during resizing
      setWindowSize({ width: window.innerWidth, height: window.innerHeight }); // Update window size
      if (glyphRef.current) {
        const computedStyle = window.getComputedStyle(glyphRef.current);
        const computedFontSize = parseFloat(computedStyle.fontSize);
        setFontSize(computedFontSize); // Update fontSize dynamically
      }
    };

    const resizeTimeout = setTimeout(() => setIsResizing(false), 200); // Re-enable transitions after resizing stops
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]); // Add windowSize to the dependency array

  return (
    <div className="md:flex min-h-screen px-4">
      <div className="flex-1 py-4 sticky top-0 max-h-fit flex flex-col justify-center bg-white dark:bg-neutral-950">
        <div className="mb-8 px-6">
          {/* Tabs */}
          <div className="md:flex space-x-3 mb-6 hidden justify-center">
            {commonWeights.map((weight) => {
              const weightObj = fontWeights.find((w) => w.value === weight);
              return (
                <Button
                  key={weight}
                  className={`px-5 py-2 text-lg font-medium rounded-lg  z-30 ${
                    fontWeight === weight
                      ? "bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:shadow-md"
                  }`}
                  onClick={() => handleWeightSelect(weight)}
                >
                  {weightObj?.label}
                </Button>
              );
            })}
          </div>
          {/* Dropdown */}
          <div className="relative w-full md:hidden z-20">
            <select
              value={fontWeight}
              onChange={(e) => handleWeightSelect(e.target.value)}
              className="appearance-none w-full px-4 py-2 text-sm border rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-800 pr-10"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label} ({weight.value})
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500 dark:text-neutral-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative w-full flex justify-center">
          {/* Glyph */}
          <span
            ref={glyphRef}
            key={selectedGlyph}
            className={`text-[300px] md:text-[400px] lg:text-[550px] leading-none z-10 ${
              isResizing ? "" : "transition-all duration-300"
            }`}
            style={{
              fontWeight,
              opacity: 1,
              transform: "scale(1)",
            }}
          >
            {selectedGlyph}
          </span>

          {/* Lines */}
          <svg
            className={`absolute w-full h-[1px] text-black dark:text-white ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(capHeight / 1000) * fontSize}px)`,
            }}
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

          <svg
            className={`absolute w-full h-[1px] text-black dark:text-white ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(xHeight / 1000) * fontSize}px)`,
            }}
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

          <svg
            className={`absolute w-full h-[1px] text-black dark:text-white ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(142 / 1000) * fontSize}px)`,
            }}
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

          <svg
            className={`absolute w-full h-[1px] text-black dark:text-white ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${
                ((1000 + descender) / 1000) * fontSize
              }px)`,
            }}
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

          {/* Labels */}
          <div
            className={`absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(capHeight / 1000) * fontSize - 10}px)`,
            }}
          >
            <span>BASELINE</span>
            <span>{capHeight}</span>
          </div>

          <div
            className={`absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(xHeight / 1000) * fontSize - 10}px)`,
            }}
          >
            <span>X-HEIGHT</span>
            <span>{xHeight}</span>
          </div>

          <div
            className={`absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${(0 / 1000) * fontSize - 10}px)`,
            }}
          >
            <span>CAP HEIGHT</span>
            <span>0</span>
          </div>

          <div
            className={`absolute pr-1 pb-2 left-0 flex justify-between w-full text-xs ${
              isResizing ? "" : "transition-transform duration-300"
            }`}
            style={{
              transform: `translateY(${
                ((1000 + descender) / 1000) * fontSize - 10
              }px)`,
            }}
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
