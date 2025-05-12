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
      <div className="bg-neutral-950 w-[96vw] md:w-[98vw] absolute z-50">
        <Link href="/" className="">
          <Image
            height={100}
            width={100}
            src={data?.brand.darkLogo || ""}
            alt={data?.brand.name || ""}
            className="cursor-pointer p-4"
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
