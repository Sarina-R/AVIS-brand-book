import { Geist, Geist_Mono } from "next/font/google";
import { DataProvider } from "@/hooks/DataProvider";
import { ThemeProvider } from "@/components/them-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme =
    typeof window !== "undefined"
      ? localStorage.getItem("user-theme") || "dark"
      : "dark";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased font-sans">
        <div
          className="mx-auto border"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <DataProvider>
            <ThemeProvider defaultTheme={initialTheme}>
              <div>{children}</div>
            </ThemeProvider>
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
