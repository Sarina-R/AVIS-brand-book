"use client";

import { useState } from "react";

export default function FontInspector() {
  const [selectedGlyph, setSelectedGlyph] = useState("e");

  const capHeight = 710;
  const xHeight = 530;
  const descender = -150;
  const fontSize = 300;

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

  return (
    <div className="lg:flex min-h-screen ">
      <div className="flex-1 p-6 pt-12 sticky top-10 max-h-fit flex flex-col justify-center bg-white dark:bg-neutral-950">
        <div className="relative w-full  flex justify-center">
          <span
            className="text-[300px] leading-none"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            {selectedGlyph}
          </span>

          <div
            className="absolute w-full border-t border-dashed border-black dark:border-white"
            style={{ top: `${(capHeight / 1000) * fontSize}px` }}
          />
          <div
            className="absolute w-full border-t border-dashed border-black dark:border-white"
            style={{ top: `${(xHeight / 1000) * fontSize}px` }}
          />
          <div
            className="absolute w-full border-t border-dashed border-black dark:border-white"
            style={{ top: `${(0 / 1000) * fontSize}px` }}
          />
          <div
            className="absolute w-full border-t border-dashed border-black dark:border-white"
            style={{ top: `${((1000 + descender) / 1000) * fontSize}px` }}
          />

          <div className="absolute top-0 left-0 flex justify-between w-full text-xs">
            <span>CAP HEIGHT</span>
            <span>{capHeight}</span>
          </div>
          <div className="absolute top-[120px] left-0 flex justify-between w-full text-xs">
            <span>X-HEIGHT</span>
            <span>{xHeight}</span>
          </div>
          <div className="absolute top-[190px] left-0 flex justify-between w-full text-xs">
            <span>BASELINE</span>
            <span>0</span>
          </div>
          <div className="absolute bottom-0 left-0 flex justify-between w-full text-xs">
            <span>DESCENDER</span>
            <span>{descender}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-10 gap-2">
          {glyphs.map((glyph, index) => (
            <div
              key={index}
              className="p-2 text-2xl text-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex justify-center h-12"
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
