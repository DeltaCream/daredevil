"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { useTheme } from "next-themes";
import { applyThemeClass } from "./theme-manager";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCircleFilled } from "@tabler/icons-react";

export function ThemeSwitcher() {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <IconCircleFilled
                        className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 fill-accent"
                        // style={{ color: "var(--color-accent)" }}
                    />
                    <IconCircleFilled
                        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 fill-accent"
                        // style={{ color: "var(--color-accent)" }}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => applyThemeClass("neutral")}>
                    Neutral
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyThemeClass("stone")}>
                    Stone
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyThemeClass("zinc")}>
                    Zinc
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyThemeClass("gray")}>
                    Gray
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyThemeClass("slate")}>
                    Slate
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
