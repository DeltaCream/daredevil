"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { useTheme } from "next-themes";
import { applyAccentClass } from "./color-manager";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCircleFilled } from "@tabler/icons-react";

export function AccentSwitcher() {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <IconCircleFilled
                        className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 fill-primary"
                        // style={{ color: "var(--color-primary)" }}
                    />
                    <IconCircleFilled
                        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 fill-primary"
                        // style={{ color: "var(--color-primary)" }}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => applyAccentClass("default")}>
                    Default
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("red")}>
                    Red
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("rose")}>
                    Rose
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("orange")}>
                    Orange
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("green")}>
                    Green
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("blue")}>
                    Blue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("yellow")}>
                    Yellow
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyAccentClass("violet")}>
                    Violet
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
