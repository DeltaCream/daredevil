// import { MainNavItem, SidebarNavItem } from "types/nav"

// export interface DocsConfig {
//   mainNav: MainNavItem[]
//   sidebarNav: SidebarNavItem[]
//   chartsNav: SidebarNavItem[]
// }

export interface CmdConfig {
    mainNav: NavItem[]
    sidebarNav: NavItem[]
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
//   icon?: keyof typeof Icons
  label?: string
  items?: NavItem[]
}

export const commandConfig: CmdConfig = {
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Register",
      href: "/register",
    },
    {
      title: "Login",
      href: "/login",
    },
    // {
    //   title: "Gallery",
    //   href: "/gallery",
    // },
    // {
    //   title: "About",
    //   href: "/about",
    // }
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
  ],
}