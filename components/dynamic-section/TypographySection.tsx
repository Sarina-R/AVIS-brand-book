"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Typography, TypographyPrinciplesSection } from "@/app/type";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { useFont } from "@/hooks/FontProvider";

interface TypographySectionProps {
  section: Typography;
}

const TypographySection: React.FC<TypographySectionProps> = ({ section }) => {
  const mdxComponent1 = useMDXComponents1({});
  const mdxComponent = useMDXComponents({});
  const sampleText = section.items.weights.sampleText;

  const [lastKey, setLastKey] = useState<string>("A");
  const [serializedItems, setSerializedItems] = useState<
    { mdx: MDXRemoteSerializeResult; bg: string; color: string }[]
  >([]);

  const [fontFeatureTitle, setFontFeatureTitle] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [fontFeatureDesc, setFontFeatureDesc] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [weightsTitle, setWeightsTitle] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [weightsDesc, setWeightsDesc] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [mainTitle, setMainTitle] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [mainDesc, setMainDesc] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [customMDXComponent, setCustomMDXComponent] =
    useState<MDXRemoteSerializeResult | null>(null);

  const [principlesTitle, setPrinciplesTitle] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [principlesDesc, setPrinciplesDesc] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [principlesSections, setPrinciplesSections] = useState<
    TypographyPrinciplesSection[]
  >([]);
  const { headerFont } = useFont();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const isLatin = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]$/.test(
        event.key
      );
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        event.key !== " " &&
        isLatin
      ) {
        setLastKey(event.key);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const serializeMDX = async (input: string | MDXRemoteSerializeResult) => {
      return typeof input === "string" ? await serialize(input) : input;
    };

    const serializeAll = async () => {
      const { items } = section;

      setMainTitle(await serializeMDX(items.title));
      setMainDesc(await serializeMDX(items.desc));

      setFontFeatureTitle(await serializeMDX(items.fontFeatureComponent.title));
      setFontFeatureDesc(await serializeMDX(items.fontFeatureComponent.desc));

      const serializedFontFeatures = await Promise.all(
        items.fontFeatureComponent.componentItems.map(async (item) => ({
          mdx: await serializeMDX(item.text),
          bg: item.bg,
          color: item.color,
        }))
      );
      setSerializedItems(serializedFontFeatures);

      setWeightsTitle(await serializeMDX(items.weights.title));
      setWeightsDesc(await serializeMDX(items.weights.desc));

      setPrinciplesTitle(await serializeMDX(items.typographyPrinciples.title));
      setPrinciplesDesc(
        await serializeMDX(items.typographyPrinciples.description)
      );

      const sections = await Promise.all(
        items.typographyPrinciples.section.map(async (s) => {
          const subtitle = await serializeMDX(s.subtitle);
          const content = await serializeMDX(s.content);
          const examples = await Promise.all(
            s.examples.map(async (example) => ({
              label: example.label,
              status: example.status,
              mdx: example.mdx ? await serializeMDX(example.mdx) : null,
              img: example.img,
            }))
          );
          return { subtitle, content, examples };
        })
      );
      setPrinciplesSections(sections);

      if (typeof items.MDXComponent !== "string") {
        setCustomMDXComponent(await serializeMDX(items.MDXComponent));
      }
    };

    serializeAll();
  }, [section]);

  return (
    <section className="p-4 md:p-10 max-w-6xl mx-auto space-y-28 mt-12 capitalize">
      <div className="lg:flex md:space-x-8 space-y-10 lg:space-y-0 gap-32">
        <div className="flex-1 space-y-4 lg:sticky lg:top-15 h-full">
          <div
            style={{ fontFamily: headerFont }}
            className="text-xl font-bold text-neutral-800 dark:text-neutral-200"
          >
            {mainTitle && (
              <MDXRemote {...mainTitle} components={mdxComponent1} />
            )}
          </div>
          <div className="text-neutral-700 dark:text-neutral-300 leading-6">
            {mainDesc && <MDXRemote {...mainDesc} components={mdxComponent1} />}
          </div>
        </div>
        {section.font?.headers ? (
          <div className="flex flex-row lg:flex-col gap-8 flex-1 normal-case">
            <div className="flex-1 max-h-44 sm:min-h-52 p-6 bg-black dark:bg-white dark:text-black text-white rounded-2xl flex flex-col items-center justify-center">
              <p
                className="text-7xl sm:text-9xl font-bold"
                style={{ fontFamily: section.font.headers }}
              >
                {lastKey}
              </p>
              <p className="text-sm font-bold pt-8">{section.font.headers}</p>
            </div>
            <div className="flex-1 max-h-44 sm:min-h-52 p-6 bg-black dark:bg-white dark:text-black text-white rounded-2xl flex flex-col items-center justify-center">
              <p
                className="text-7xl sm:text-9xl font-bold"
                style={{ fontFamily: section.font.name }}
              >
                {lastKey}
              </p>
              <p className="text-sm font-bold pt-8">{section.font.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-52 p-6 bg-black dark:bg-white dark:text-black text-white rounded-2xl flex flex-col items-center justify-center">
            <p
              className="text-9xl font-bold"
              style={{ fontFamily: section.font.name }}
            >
              {lastKey}
            </p>
            <p className="text-sm font-bold pt-8">{section.font.name}</p>
          </div>
        )}
      </div>

      <div className="space-y-12">
        <div className="lg:flex justify-between gap-32">
          {fontFeatureTitle && (
            <div
              style={{ fontFamily: headerFont }}
              className="lg:sticky top-15 h-full text-xl font-bold text-neutral-800 dark:text-neutral-200"
            >
              <MDXRemote {...fontFeatureTitle} components={mdxComponent1} />
            </div>
          )}
          {fontFeatureDesc && (
            <div className="text-neutral-700 dark:text-neutral-300 leading-6">
              <MDXRemote {...fontFeatureDesc} components={mdxComponent1} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {serializedItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl text-xl text-center border min-h-40 h-full flex flex-col items-center justify-center"
              style={{ backgroundColor: item.bg, color: item.color }}
            >
              <MDXRemote {...item.mdx} components={mdxComponent1} />
            </div>
          ))}
        </div>
      </div>

      {section.font.weights && (
        <div className="flex flex-col lg:flex-row gap-12 rounded-2xl">
          <div className="flex-1 lg:sticky top-15 h-full">
            <div className="space-y-4 border p-10 px-8 m-auto text-center rounded-2xl w-full">
              {section.font.weights.map((weight) => (
                <p
                  key={weight}
                  className="text-2xl text-neutral-800 dark:text-neutral-200"
                  style={{ fontWeight: weight }}
                >
                  {sampleText}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1 text-sm text-neutral-700 dark:text-neutral-300 leading-6">
            {weightsTitle && (
              <h2
                style={{ fontFamily: headerFont }}
                className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200"
              >
                <MDXRemote {...weightsTitle} components={mdxComponent1} />
              </h2>
            )}
            {weightsDesc && (
              <MDXRemote {...weightsDesc} components={mdxComponent1} />
            )}
          </div>
        </div>
      )}

      <div className="lg:space-y-16 space-y-10">
        {principlesTitle && (
          <div>
            <h2
              style={{ fontFamily: headerFont }}
              className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 pb-3"
            >
              <MDXRemote {...principlesTitle} components={mdxComponent1} />
            </h2>
            <div className="text-neutral-700 dark:text-neutral-300 leading-6">
              {principlesDesc && (
                <MDXRemote {...principlesDesc} components={mdxComponent1} />
              )}
            </div>
          </div>
        )}
        {principlesSections.length > 0 && (
          <div className="space-y-24">
            {principlesSections.map((sec, idx) => {
              const isEven = idx % 2 === 0;
              const textCol = isEven ? "order-1" : "order-2";
              const exampleCol = isEven ? "order-2" : "order-1";

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8 lg:gap-16"
                >
                  <div className={`${textCol} space-y-4`}>
                    <h2
                      style={{ fontFamily: headerFont }}
                      className="text-2xl font-semibold text-neutral-800 dark:text-white"
                    >
                      <MDXRemote {...sec.subtitle} components={mdxComponent1} />
                    </h2>
                    <div className="text-neutral-600 dark:text-neutral-300 text-sm leading-6">
                      <MDXRemote {...sec.content} components={mdxComponent1} />
                    </div>
                  </div>

                  <div
                    className={`${exampleCol} col-span-2 grid grid-cols-2 gap-3 sm:gap-6`}
                  >
                    {sec.examples.map((example, idx2) => (
                      <div
                        key={idx2}
                        className="rounded-2xl border border-neutral-200 dark:border-neutral-700 px-5 py-3 transition-all duration-200 bg-white dark:bg-zinc-900 space-y-4"
                      >
                        <div className="flex justify-end">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                              example.status === "incorrect"
                                ? "bg-red-500"
                                : "bg-green-600"
                            }`}
                          >
                            {example.status === "incorrect"
                              ? "Incorrect"
                              : "Correct"}
                          </span>
                        </div>

                        {example.mdx ? (
                          <div className="text-sm text-right text-neutral-700 dark:text-neutral-300 leading-6">
                            <MDXRemote
                              {...example.mdx}
                              components={mdxComponent1}
                            />
                          </div>
                        ) : example.img ? (
                          <div className="w-full flex justify-center">
                            <img
                              src={example.img}
                              alt={example.label}
                              className="max-w-full rounded-md shadow-sm"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {customMDXComponent && (
        <MDXRemote {...customMDXComponent} components={mdxComponent} />
      )}
    </section>
  );
};

export default TypographySection;
