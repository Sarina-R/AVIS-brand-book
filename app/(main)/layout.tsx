import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AppSidebar } from "@/components/app-sidbar";
import { ThemeToggle } from "@/components/ThemToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="max-w-6xl mx-auto border"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
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
    </div>
  );
}
