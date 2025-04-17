"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowRightLeft, ChevronUp, User2, Wrench } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";

// Menu items.
const groupsSideBar = [
  {
    title: "Ferramentas",
    items: [{ title: "Empréstimos", url: "#", icon: ArrowRightLeft }],
  },
  {
    title: "Gerenciamento",
    items: [{ title: "Ferramentas", url: "/tools", icon: Wrench }],
  },
];

export function AppSidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const updateSelectedItem = (item: any) => {
    console.log(item);
    setSelectedItem(item);
  };
  return (
    <Sidebar>
      <SidebarHeader className="font-bold">RGIT</SidebarHeader>
      <SidebarContent>
        {groupsSideBar.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        updateSelectedItem(item.title);
                      }}
                      isActive={selectedItem === item.title}
                    >
                      <Link
                        key={item.title}
                        href={item.url}
                      >
                        <item.icon />
                        <p className="hidden md:block">{item.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
