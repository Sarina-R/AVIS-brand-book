import { BrandPrism } from "@/app/type";
import { useMDXComponents } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useState } from "react";
import { motion } from "framer-motion";
import { useFont } from "@/hooks/FontProvider";

interface BrandPrismProps {
  section: BrandPrism;
  primaryColor: string;
}

const RECT_WIDTH = 90;
const RECT_HEIGHT = 30;
const TEXT_OFFSET_Y = 20;

const getRectanglePosition = (position: { x: number; y: number }) => {
  const centerX = position.x + RECT_WIDTH / 2;
  const centerY = position.y + RECT_HEIGHT / 2;
  const rotatedCenterX = centerY;
  const rotatedCenterY = 300 - centerX;
  const rectX = rotatedCenterX - RECT_WIDTH / 2;
  const rectY = rotatedCenterY - RECT_HEIGHT / 2;
  return { rectX, rectY };
};

const ActiveSectionDetails = ({
  activeSection,
  brandPrismItems,
}: {
  activeSection: string | null;
  brandPrismItems: BrandPrism["items"]["prismBrand"];
}) => {
  if (!activeSection) return null;
  const activeItem = brandPrismItems.find(
    (item) => item.title === activeSection
  );
  if (!activeItem) return null;

  return (
    <motion.div
      className="mt-4 p-4 border border-neutral-400 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 capitalize"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
        {activeSection}
      </h3>
      <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        {activeItem.description}
      </p>
    </motion.div>
  );
};

const BrandManifesto = ({ section, primaryColor }: BrandPrismProps) => {
  const brandPrismItems = section.items?.prismBrand || [];
  const [activeSection, setActiveSection] = useState<string | null>(
    brandPrismItems.length > 0 ? brandPrismItems[0].title : null
  );
  const { headerFont } = useFont();

  const mdxComponents = useMDXComponents({});

  const positions = [
    { x: 105, y: 12 },
    { x: 0, y: 60 },
    { x: 210, y: 60 },
    { x: 0, y: 210 },
    { x: 210, y: 210 },
    { x: 105, y: 260 },
  ];

  function getContrastYIQ(hexColor: string): "black" | "white" {
    let color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

    if (color.length === 3) {
      color = color
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "black" : "white";
  }

  return (
    <div className="flex flex-col items-center space-y-8 sm:px-6 py-5">
      <div className="lg:flex sm:p-6 p-2 justify-center items-center overflow-hidden">
        <svg
          viewBox="0 0 350 350"
          className="sm:w-full w-[113%] sm:h-80 h-70 lg:w-3/5"
          style={
            {
              "--hexagon-bg": "rgba(255, 255, 255, 0.1)",
              "--hexagon-stroke": "rgba(0, 0, 0, 0.3)",
            } as React.CSSProperties
          }
          data-theme="light dark"
        >
          {/* Hexagon */}
          <g transform="rotate(90 150 150)">
            <motion.path
              d="M 95 25 L 205 25 Q 225 25 237.024 47.5 L 285.024 127.5 Q 300 150 285.024 172.5 L 237.024 252.5 Q 225 275 205 275 L 95 275 Q 75 275 62.976 252.5 L 14.976 172.5 Q 0 150 14.976 127.5 L 62.976 47.5 Q 75 25 95 25 Z"
              fill="var(--hexagon-bg)"
              stroke="var(--hexagon-stroke)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </g>

          {/* Rectangles */}
          {brandPrismItems.map((item, index) => {
            const position = positions[index] || { x: 125, y: 125 };
            const { rectX, rectY } = getRectanglePosition(position);
            const isActive = activeSection === item.title;
            const textColor = isActive ? getContrastYIQ(primaryColor) : "black";

            return (
              <motion.g
                key={index}
                onClick={() => setActiveSection(item.title)}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.rect
                  x={rectX}
                  y={rectY}
                  width={RECT_WIDTH}
                  height={RECT_HEIGHT}
                  rx="10"
                  fill={isActive ? primaryColor : "white"}
                  stroke={isActive ? "none" : "var(--hexagon-stroke)"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={rectX + RECT_WIDTH / 2}
                  y={rectY + TEXT_OFFSET_Y}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill={textColor}
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ fontFamily: headerFont }}
                >
                  {item.title}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>

        <div className="lg:w-2/5">
          <ActiveSectionDetails
            activeSection={activeSection}
            brandPrismItems={brandPrismItems}
          />
        </div>
      </div>

      <div className="sm:px-6 px-4 text-neutral-700 dark:text-neutral-300 leading-6 text-sm">
        {section.items.MDXComponent && (
          <MDXRemote
            {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
            components={mdxComponents}
          />
        )}
      </div>
    </div>
  );
};

export default BrandManifesto;
