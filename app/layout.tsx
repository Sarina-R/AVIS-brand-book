import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataProvider } from "@/hooks/DataProvider";
import { ThemeProvider } from "@/components/them-provider";
import { AppSidebar } from "@/components/app-sidbar";
import { ThemeToggle } from "@/components/ThemToggle";
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased font-sans">
        <div
          className="max-w-6xl mx-auto border"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <DataProvider>
            <ThemeProvider defaultTheme="light">
              <SidebarProvider>
                <AppSidebar />
                <div className="flex-1 w-[calc(100vw-18rem)]">
                  <div className="flex justify-between items-center border-b px-4 py-2 sticky top-0 z-50 bg-white dark:bg-black">
                    <div className="flex items-center gap-2">
                      <span className="md:hidden inline">
                        <SidebarTrigger />
                      </span>
                      <Breadcrumbs />
                    </div>
                    <ThemeToggle />
                  </div>
                  <div>{children}</div>
                </div>
              </SidebarProvider>
            </ThemeProvider>
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
