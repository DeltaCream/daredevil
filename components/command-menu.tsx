"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogTrigger, type DialogProps } from "@radix-ui/react-dialog"
import { Circle, File, Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { commandConfig } from "@/config/commands"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { IconCircleFilled } from "@tabler/icons-react"
import { applyAccentClass, applyColorClass } from "./color-manager"
import { useMutationObserver } from "@/hooks/user-mutation-observer"
import { Kbd, KbdGroup } from "./ui/kbd"
import { useIsMac } from "@/hooks/use-is-mac"

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const isMac = useIsMac()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search the website...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        {/* <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd> */}
        <KbdGroup className="py-auto hidden gap-1 sm:flex">
        {
          isMac ? (
            <Kbd className="border">⌘+K</Kbd>
          ) : (
            <Kbd className="border">Ctrl+K</Kbd>
          )
        }
        </KbdGroup>
      
      </Button>
      </DialogTrigger>
      <CommandDialog open={open} title="Command Dialog" onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {commandConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string))
                  }}
                >
                  <File />
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
{/* 
          {commandConfig.sidebarNav.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items?.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string))
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <Circle className="h-3 w-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
           */}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop />
              System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Color">
            <CommandItem onSelect={() => runCommand(() => applyColorClass("neutral"))}>
              Neutral
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("stone"))}>
              Stone
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("zinc"))}>
              Zinc
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("gray"))}>
              Gray
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("slate"))}>
              Slate
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Accent">
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("default"))}>
                Default
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("red"))}>
                Red
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("rose"))}>
                Rose
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("orange"))}>
                Orange
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("green"))}>
                Green
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("blue"))}>
                Blue
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("yellow"))}>
                Yellow
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("violet"))}>
                Violet
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Dialog>
  )
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}