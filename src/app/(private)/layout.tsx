import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
