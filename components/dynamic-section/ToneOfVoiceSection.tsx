"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMDXComponents, useMDXComponents1 } from "@/mdx-component";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Handshake, Home, Settings, User } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderContent, ToneOfVoice } from "@/app/type";
import { lighten } from "polished";
import { serialize } from "next-mdx-remote/serialize";
import "swiper/css";
import "swiper/css/pagination";
import { useFont } from "@/hooks/FontProvider";

type SlideCardProps = {
  svg?: string;
  title: string | MDXRemoteSerializeResult;
  description: string | MDXRemoteSerializeResult;
  primaryColor: string;
};

const ToneOfVoiceSection = ({
  section,
  primaryColor,
}: {
  section: ToneOfVoice;
  primaryColor: string;
}) => {
  const mdxComponents = useMDXComponents({});
  const mdxComponents1 = useMDXComponents1({});
  const sliderContent = section.items.sliderContent || [];
  const [isDesktop, setIsDesktop] = useState(false);
  const [serializedContent, setSerializedContent] = useState<SliderContent[]>(
    []
  );
  const { headerFont } = useFont();

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (_: unknown, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        (1 - progress).toString()
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const serializeSliderDescriptions = async () => {
      const updated = await Promise.all(
        sliderContent.map(async (item) => {
          if (typeof item.description === "string") {
            return {
              ...item,
              description: await serialize(item.description),
            };
          }
          return item;
        })
      );
      setSerializedContent(updated);
    };
    serializeSliderDescriptions();
  }, [sliderContent]);

  return (
    <div className="space-y-16 max-w-[53rem] sm:px-4">
      {section.items.MDXComponent && (
        <MDXRemote
          {...(section.items.MDXComponent as MDXRemoteSerializeResult)}
          components={mdxComponents}
        />
      )}

      <div className="px-6 space-y-5 max-w-3xl mx-auto">
        <h2
          className="font-bold text-2xl text-neutral-800 dark:text-neutral-200"
          style={{ fontFamily: headerFont }}
        >
          {section.items.title && (
            <MDXRemote
              {...(section.items.title as MDXRemoteSerializeResult)}
              components={mdxComponents1}
            />
          )}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          {section.items.desc && (
            <MDXRemote
              {...(section.items.desc as MDXRemoteSerializeResult)}
              components={mdxComponents1}
            />
          )}
        </p>
      </div>

      {serializedContent.length > 0 && (
        <div className="w-full px-4 max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            grabCursor
            slidesPerView={1}
            spaceBetween={0}
            loop={false}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="pb-16 w-full"
            style={{ maxWidth: "100%", overflow: "hidden" }}
          >
            {serializedContent.map((item) => (
              <SwiperSlide key={item.id} style={{ width: "100%" }}>
                <SlideCard {...item} primaryColor={primaryColor} />
              </SwiperSlide>
            ))}

            {isDesktop && (
              <div
                className="hidden md:flex items-center gap-2 absolute bottom-6 left-4 z-10"
                slot="container-end"
              >
                <svg
                  viewBox="0 0 48 48"
                  ref={progressCircle}
                  className="w-8 h-8 text-orange-500"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    style={{
                      strokeDasharray: 125.6,
                      strokeDashoffset: `calc(125.6 * var(--progress))`,
                      transition: "stroke-dashoffset 0.3s linear",
                    }}
                  />
                </svg>
                <span
                  ref={progressContent}
                  className="text-xs text-neutral-600 dark:text-neutral-300"
                />
              </div>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

const SlideCard: React.FC<SlideCardProps> = ({
  svg,
  title,
  description,
  primaryColor,
}) => {
  const mdxComponents1 = useMDXComponents1({});
  const lighterColor = lighten(0.2, primaryColor);
  const icons = [Handshake, Home, User, Settings];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  const { headerFont } = useFont();

  return (
    <div className="w-full max-w-5xl mx-auto min-h-60 flex md:flex-row-reverse flex-col-reverse items-stretch bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border overflow-hidden">
      <div className="md:w-2/3 w-full p-6 space-y-2">
        <h3
          className="font-bold text-lg text-neutral-900 dark:text-white"
          style={{ fontFamily: headerFont }}
        >
          {typeof title === "string" ? (
            title
          ) : (
            <MDXRemote
              {...(title as MDXRemoteSerializeResult)}
              components={mdxComponents1}
            />
          )}
        </h3>
        <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-loose overflow-wrap break-word word-break break-word">
          {typeof description === "string" ? (
            description
          ) : (
            <MDXRemote
              {...(description as MDXRemoteSerializeResult)}
              components={mdxComponents1}
            />
          )}
        </div>
      </div>
      <div
        className="md:w-1/3 w-full flex items-center justify-center p-6"
        style={{ backgroundColor: primaryColor }}
      >
        {svg ? (
          <div className="relative ">
            <div
              style={{ backgroundColor: primaryColor }}
              className="absolute opacity-60 w-full h-full z-10"
            />
            <img
              src={svg}
              alt={typeof title === "string" ? title : ""}
              className="max-h-24 object-contain max-w-full"
            />
          </div>
        ) : (
          <RandomIcon color={lighterColor} className="w-16 h-16" />
        )}
      </div>
    </div>
  );
};

export default ToneOfVoiceSection;
