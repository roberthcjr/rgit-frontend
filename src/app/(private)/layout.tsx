"use client";

import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <SidebarTrigger />
        <AppSidebar />
        {children}
      </SidebarProvider>
    </QueryClientProvider>
  );
}
