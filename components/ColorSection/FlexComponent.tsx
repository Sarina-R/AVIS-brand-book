import { HarmonySection } from "@/app/type";
import { shadeColor } from "@/lib/shadeColor";
import { useMDXComponents } from "@/mdx-component";
import { AnimatePresence, motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const HarmonyComponent = ({
  primaryColor,
  secondaryColor,
  actionColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  actionColor: string;
}) => {
  const combinations = [
    {
      name: "Combination 1",
      description: "Black dominant, white contrast, green accents.",
      colors: [
        { name: "Dominant", hex: primaryColor, class: "bg-black" },
        { name: "Contrast", hex: secondaryColor, class: "bg-white" },
        { name: "Accent", hex: actionColor, class: "bg-green-500" },
      ],
    },
    {
      name: "Combination 2",
      description: "White dominant, black text, green highlights.",
      colors: [
        { name: "Dominant", hex: secondaryColor, class: "bg-white" },
        { name: "Text", hex: primaryColor, class: "bg-black" },
        { name: "Highlight", hex: actionColor, class: "bg-green-500" },
      ],
    },
    {
      name: "Combination 3",
      description: "Balanced black and white, minimal green accents.",
      colors: [
        { name: "Balanced", hex: primaryColor, class: "bg-black" },
        { name: "Balanced", hex: secondaryColor, class: "bg-white" },
        { name: "Accent", hex: actionColor, class: "bg-green-500" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-3xl">
      {combinations.map((combo, index) => (
        <motion.div
          key={combo.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {combo.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {combo.description}
          </p>
          <div className="flex gap-2">
            {combo.colors.map((color, i) => (
              <div
                key={i}
                className="flex-1 h-16 rounded-lg relative group"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 text-center bg-opacity-50 rounded-lg">
                  <span className="text-xs text-white font-medium">
                    {color.name}: {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const GradientComponent = ({
  primaryColor,
  secondaryColor,
  actionColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  actionColor: string;
}) => {
  const gradients = [
    {
      name: "Primary Gradient",
      description: "Primary to darker primary.",
      gradient: `linear-gradient(90deg, ${primaryColor}, ${shadeColor(
        primaryColor,
        -20
      )})`,
    },
    {
      name: "Secondary Gradient",
      description: "Secondary to lighter secondary.",
      gradient: `linear-gradient(90deg, ${secondaryColor}, ${shadeColor(
        secondaryColor,
        20
      )})`,
    },
    {
      name: "Accent Gradient",
      description: "Accent to darker accent.",
      gradient: `linear-gradient(90deg, ${actionColor}, ${shadeColor(
        actionColor,
        -20
      )})`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-3xl">
      {gradients.map((gradient, index) => (
        <motion.div
          key={gradient.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {gradient.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {gradient.description}
          </p>
          <div
            className="h-16 rounded-lg"
            style={{ backgroundImage: gradient.gradient }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const FlexComponent = ({
  data,
  primaryColor,
  secondaryColor,
  actionColor,
  id,
}: {
  data: HarmonySection;
  primaryColor: string;
  secondaryColor: string;
  actionColor: string;
  id: string;
}) => {
  const mdxComponents = useMDXComponents({});

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto lg:flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 overflow-hidden"
      >
        <div className="flex-1 space-y-6">
          <div className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold">
            {data?.title && (
              <MDXRemote
                {...(data.title as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            )}
          </div>
          <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-6">
            {data?.description && (
              <MDXRemote
                {...(data.description as MDXRemoteSerializeResult)}
                components={mdxComponents}
              />
            )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg items-center mx-auto">
          <div className="relative rounded-3xl overflow-hidden aspect-w-4 aspect-h-3">
            <AnimatePresence>
              {id === "harmony" ? (
                <HarmonyComponent
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  actionColor={actionColor}
                />
              ) : (
                <GradientComponent
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  actionColor={actionColor}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlexComponent;
