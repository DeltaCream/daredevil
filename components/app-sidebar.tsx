"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconCircleFilled,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconTriangle,
  IconTriangleFilled,
  IconUsers,
  IconHome,
  IconPhoto,
  IconInfoCircle,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState } from "react"
import Link from "next/link"

const data = {
  user: {
    name: "DeltaCream",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "#",
    //   icon: IconDashboard,
    // },
    {
      title: "Home",
      url: "/",
      icon: IconHome
    },
    {
      title: "Gallery",
      url: "/gallery",
      icon: IconPhoto
    },
    {
      title: "About",
      url: "/about",
      icon: IconInfoCircle,
    },
    
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Projects",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: IconSettings,
    // },
    // { //contains info about the website
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: IconSearch,
    // },
  ],
  documents: [
    // {
    //   name: "Data Library",
    //   url: "#",
    //   icon: IconDatabase,
    // },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    // {
    //   name: "Word Assistant",
    //   url: "#",
    //   icon: IconFileWord,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [sidebarHeader, setSidebarHeader] = useState(() => {
    // Expose the header to the client bundle via NEXT_PUBLIC_ prefix so
    // the value used during SSR matches the value available to the client
    // bundle and avoids hydration mismatches.
    const header = process.env.NEXT_PUBLIC_SIDEBAR_HEADER || "DeltaX";
    return header;
  });
  const [sidebarIcon, setSidebarIcon]= useState(() => {
    // Expose the header to the client bundle via NEXT_PUBLIC_ prefix so
    // the value used during SSR matches the value available to the client
    // bundle and avoids hydration mismatches.
    const header = process.env.NEXT_PUBLIC_ICON_SHAPE || "triangle";
    return header;
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                  {sidebarIcon === "triangle" ? (
                    <IconTriangleFilled className="!size-5" />
                  ) : (
                    <IconInnerShadowTop className="!size-5" />
                    // <IconCircleFilled className="!size-5" />
                  )}
                <span className="text-base font-semibold">{sidebarHeader}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
