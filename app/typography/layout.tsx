"use client";

import { useData } from "@/hooks/DataProvider";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useData();
  return (
    <div className="">
      <div className="bg-neutral-950 w-[96vw] md:w-[98vw] absolute flex justify-between items-center z-50">
        <Link href="/" className="">
          <Image
            height={100}
            width={100}
            src={
              data?.brand.darkLogo ||
              "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png"
            }
            alt={data?.brand.name || "avis"}
            className="cursor-pointer p-4"
            priority
          />
        </Link>
        <div className="border-neutral-700 border bg-neutral-950 p-[0.2rem] rounded-full">
          <div className=" text-xs sm:text-base bg-neutral-200 text-black rounded-full px-2 py-1 text-center font-bold">
            {data?.brand.font.name} Sans
          </div>
        </div>
        <p className="pl-0 py-4 pr-4 text-neutral-300 text-[9px] sm:text-sm ">
          AVIS Engine Typography
        </p>
      </div>
      {children}
    </div>
  );
}
