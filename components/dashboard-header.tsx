import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ColorSwitcher } from "@/components/color-switcher";
import { AccentSwitcher } from "./accent-switcher";
import Link from "next/link";
import { CommandMenu } from "./command-menu";

export function DashboardHeader() {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">Dashboard</h1>
                <div className="ml-auto flex items-center gap-2">
                    <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    <ThemeSwitcher />
                    <ColorSwitcher />
                    <AccentSwitcher />
                    {/* <Button
                        variant="ghost"
                        asChild
                        size="sm"
                        className="hidden sm:flex"
                    >
                        <Link
                            href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="dark:text-foreground"
                        >
                            GitHub
                        </Link>
                    </Button> */}
                </div>
            </div>
        </header>
    );
}
