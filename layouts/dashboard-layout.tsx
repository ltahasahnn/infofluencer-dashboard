"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

// Icons
import { ClipboardList, LayoutDashboard } from "lucide-react"

// Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Settings } from "@/components/ui/settings"
import { Logout } from "@/components/ui/logout"
import { Header } from "@/components/header"
import {
  SidebarProvider,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  Sidebar,
} from "@/components/ui/sidebar"

const menuGroups = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { title: "Dashboard", url: "/dashboard", icon: ClipboardList },
    ],
  },
  {
    title: "Influencer",
    icon: LayoutDashboard,
    items: [
      { title: "Influencers", url: "/influencer", icon: ClipboardList },
    ],
  },
]

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const pathname = usePathname()
  const router = useRouter();

  useEffect(() => {
    setLoading(false)

    if(typeof window !== undefined && localStorage.getItem("isLogged") != "true"){
      router.push("/")
    }
  }, [router])

  return (
    <div className="size-full flex overflow-hidden h-dvh">
      <SidebarProvider>
        <Sidebar className="z-50">
          <SidebarContent>
            <SidebarGroup>
              {/* Dashboard Title */}
              <SidebarGroupLabel className="text-3xl font-black pt-1 text-main-600 dark:text-main-500 uppercase">
                <h1>Influencer</h1>
              </SidebarGroupLabel>
              
              <hr className="my-2.5" />

              {/* Content */}
              <SidebarGroupContent>
                <SidebarMenu className="!font-semibold">
                  <Accordion defaultValue={menuGroups.map((group) => group.title)} type="multiple" className="w-full">
                    {menuGroups.map((group) => (
                      <AccordionItem key={group.title} value={group.title}>
                        {!loading ? (
                          <AccordionTrigger
                            className="px-3 py-2 flex items-center gap-2 justify-start text-sm group w-full !font-bold appearance-none *:text-main-600 dark:*:text-main-500 !no-underline cursor-pointer"
                          >
                            <group.icon size={20} className="!rotate-0" />
                            <span className="w-full">{group.title}</span>
                          </AccordionTrigger>
                        ) : (
                          <AccordionTrigger className="!m-0 !p-0 !pl-2 !mb-1 !mt-3 *:hidden">
                            <Skeleton className="h-4 w-full !block" />
                          </AccordionTrigger>
                        )}
                        <AccordionContent className="space-y-1">
                          {group.items.map((item) => {
                            const isActive = pathname === item.url
                            return !loading ? (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <a
                                    href={item.url}
                                    className={`
                                      flex items-center gap-2 pl-8 text-sm
                                      hover:!text-main-600 dark:hover:!text-main-500
                                      ${isActive ? "text-main-600 dark:text-main-500 bg-sidebar-accent" : ""}
                                    `}
                                  >
                                    <item.icon size={16} />
                                    {item.title}
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ) : (
                              <SidebarMenuItem key={item.title} className="my-2 w-full ml-auto pl-8">
                                <Skeleton className="h-4 w-full" />
                              </SidebarMenuItem>
                            )
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {/* Logout & Settings */}
                  <SidebarMenuItem>
                    <Logout loading={!loading} />
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Settings loading={!loading} />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 h-fit cursor-pointer">
                  <a href="/profile">
                    {loading ? (
                      <div className="flex items-center space-x-3 w-full">
                        <Skeleton className="size-10 shrink-0 rounded-full" />
                        <div className="space-y-2 w-full">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="uppercase font-bold">
                            TS
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start -space-y-0.5 capitalize">
                          <span className="font-semibold line-clamp-1">
                            Taha Şahin
                          </span>
                          <p className="!text-xs line-clamp-1">Administrator</p>
                        </div>
                      </div>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="h-dvh w-full flex flex-col pb-4">
          <div className="px-2 pt-2 flex items-center">
            <Header loading={loading} />
          </div>
          <div className="size-full p-3.5 rounded-tl-3xl overflow-y-scroll hide-scroll flex flex-col gap-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
