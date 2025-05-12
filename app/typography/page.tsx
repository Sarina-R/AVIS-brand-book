"use client";

import TypographySection from "@/components/dynamic-section/TypographySection";
import { useData } from "@/hooks/DataProvider";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const { data, loading } = useData();

  const section = data?.sections.find((sec) => sec.type === "typography");

  if (loading || !section) {
    return (
      <div className="relative min-h-screen bg-neutral-900">
        <svg
          className="absolute top-0 left-0 w-full h-full z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative z-10 space-y-28 px-6 md:px-14 pt-[120px]">
          <div className="relative h-[50vh] lg:h-screen flex items-center">
            <Skeleton className="text-9xl text-neutral-600 p-8 h-40 w-3/4 max-w-[800px] bg-neutral-800 rounded-md">
              Geist.
            </Skeleton>
          </div>

          <div className="space-y-12">
            <div className="md:flex md:space-x-8 gap-32">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-1/2 bg-neutral-800 rounded-md" />
                <Skeleton className="h-20 w-full bg-neutral-800 rounded-md" />
              </div>
              <div className="flex flex-row md:flex-col gap-8 flex-1">
                <Skeleton className="flex-1 h-52 bg-neutral-800 rounded-2xl" />
                <Skeleton className="flex-1 h-52 bg-neutral-800 rounded-2xl" />
              </div>
            </div>

            <div className="space-y-12">
              <div className="md:flex justify-between gap-32">
                <Skeleton className="h-8 w-1/3 bg-neutral-800 rounded-md" />
                <Skeleton className="h-16 w-full bg-neutral-800 rounded-md" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-40 w-full bg-neutral-800 rounded-xl"
                    />
                  ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              <Skeleton className="flex-1 h-64 bg-neutral-800 rounded-2xl" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-1/2 bg-neutral-800 rounded-md" />
                <Skeleton className="h-24 w-full bg-neutral-800 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <TypographySection key={section.type} section={section} />;
};

export default Page;
