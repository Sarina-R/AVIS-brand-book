import { ColorShade, Palette } from "@/app/type";
import { useMDXComponents } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFont } from "@/hooks/FontProvider";

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `R${r} G${g} B${b}`;
};

const hexToCmyk = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const k = 1 - Math.max(r, g, b);
  if (k === 1) return "C0 M0 Y0 K100";

  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return `C${Math.round(c * 100)} M${Math.round(m * 100)} Y${Math.round(
    y * 100
  )} K${Math.round(k * 100)}`;
};

const PaletteComponent = ({ palette }: { palette: Palette }) => {
  const mdxComponents = useMDXComponents({});
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const { headerFont } = useFont();

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const colorCount = Object.values(palette.colors).length;
  const gridColsClass =
    colorCount === 2
      ? "grid-cols-1"
      : colorCount === 3
      ? "grid-cols-1 md:grid-cols-3"
      : colorCount === 5
      ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-5"
      : colorCount === 6
      ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
      : "grid-cols-1 md:grid-cols-4";

  return (
    <div className="">
      <div className="container mx-auto overflow-hidden">
        <h2
          className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200"
          style={{ fontFamily: headerFont }}
        >
          {palette?.title && (
            <MDXRemote
              {...(palette.title as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          )}
        </h2>

        <div className="mb-8 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          {palette?.description && (
            <MDXRemote
              {...(palette.description as MDXRemoteSerializeResult)}
              components={mdxComponents}
            />
          )}
        </div>

        <div
          className={`grid ${gridColsClass} rounded-2xl sm:m-4 m-8 overflow-hidden hover:overflow-visible`}
        >
          {Object.values(palette.colors).map((color) => (
            <motion.div
              key={color.id}
              className="relative hover:rounded-lg focus:rounded-lg hover:z-10 overflow-hidden shadow-md hover:cursor-pointer"
              onHoverStart={() => setHoveredColor(color.name)}
              onHoverEnd={() => setHoveredColor(null)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className="h-40 md:h-80 w-full"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
              ></div>

              <div className="p-4 absolute top-0 w-full">
                <div className="flex justify-between items-center mb-2">
                  <p
                    style={{ color: color.hexColor }}
                    className="text-sm font-semibold"
                  >
                    {color.hex}
                  </p>
                  <button
                    style={{ color: color.hexColor }}
                    onClick={() => copyToClipboard(color.hex)}
                    title="Copy hex code"
                  >
                    {copiedHex === color.hex ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16h8M8 12h8m-4-8v16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs" style={{ color: color.hexColor }}>
                  {hexToRgb(color.hex)}
                </p>
                <p className="text-xs" style={{ color: color.hexColor }}>
                  {hexToCmyk(color.hex)}
                </p>
              </div>

              {color.shades && hoveredColor === color.name && (
                <div className="absolute bottom-0 left-0 right-0 flex">
                  {color.shades.map((shade: ColorShade, index: number) => (
                    <motion.div
                      key={shade.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 50, opacity: 1 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="w-full hover:cursor-pointer relative"
                      style={{ backgroundColor: shade.hex }}
                      onClick={() => copyToClipboard(shade.hex)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1 bg-black/50 px-1 py-[0.1rem] rounded">
                          <p className="text-[0.5rem] text-white">
                            {shade.hex}
                          </p>
                          {copiedHex === shade.hex ? (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 16h8M8 12h8m-4-8v16"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteComponent;
