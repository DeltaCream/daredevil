import Link from "next/link"

// import { siteConfig } from "@/config/site"
import { CommandMenu } from "@/components/command-menu"
// import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "./ui/button"
import { siteConfig } from "@/config/site"
import { ThemeSwitcher } from "./theme-switcher"
import { ColorSwitcher } from "./color-switcher"
import { AccentSwitcher } from "./accent-switcher"
import { Separator } from "./ui/separator"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { IconTriangleFilled } from "@tabler/icons-react"

export function SiteHeader() {
  return (
    // uses py-2 instead of top-0
    <header className="bg-background sticky py-2 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav items={siteConfig.navItems} />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link href="/">
              <IconTriangleFilled className="size-5" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} />
          <nav className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                // navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <Separator orientation="vertical" className="3xl:flex hidden" />
            <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiGithub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            <Separator orientation="vertical" />
            {/* <SiteConfig className="3xl:flex hidden" /> */}
            <ThemeSwitcher />
            {/* <Separator orientation="vertical" /> */}
            <ColorSwitcher />
            {/* <Separator orientation="vertical" /> */}
            <AccentSwitcher />
          </nav>
        </div>
      </div>
    </header>
  )
}