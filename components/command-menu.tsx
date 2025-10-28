"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogTrigger, type DialogProps } from "@radix-ui/react-dialog"
import { Circle, File, Laptop, Link, Moon, Sun } from "lucide-react"
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
// baseColors is not used here; color swatches are rendered via CSS variables/classes

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

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
                <CommandMenuItem //use CommandMenuItem which is a custom component that uses useMutationObserver and is based off of CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  keywords={["nav", "navigation", String(navItem.label ?? navItem.title).toLowerCase()]}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string))
                  }}
                >
                  <Link />
                  {navItem.title}
                </CommandMenuItem>
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
            {/* TODO: Refer colors from base-colors.ts and globals.css */}
            {/* Use `fill-*` to set the fill color of SVG elements like `<IconCircleFilled />`
            while you use `stroke-*` for stroke colors */}
            <CommandItem onSelect={() => runCommand(() => applyColorClass("neutral"))}>
              <IconCircleFilled className="fill-neutral-800" />
              Neutral
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("stone"))}>
              <IconCircleFilled className="fill-stone-800"/>
              Stone
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("zinc"))}>
              <IconCircleFilled className="fill-zinc-800"/>
              Zinc
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("gray"))}>
              <IconCircleFilled className="fill-gray-800" />
              Gray
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyColorClass("slate"))}>
              <IconCircleFilled className="fill-slate-800"/>
              Slate
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Accent">
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("default"))}>
              <IconCircleFilled className={cn(theme == "light" ? "fill-neutral-900" : "fill-neutral-200")} />
              Default
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("red"))}>
              <IconCircleFilled className="fill-red-500" />
              Red
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("rose"))}>
              <IconCircleFilled className="fill-rose-500" />
              Rose
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("orange"))}>
              <IconCircleFilled className={cn(theme == "light" ? "fill-orange-500" : "fill-orange-600")} />
              Orange
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("green"))}>
              <IconCircleFilled className={cn(theme == "light" ? "fill-green-500" : "fill-emerald-500")} />
              Green
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("blue"))}>
              <IconCircleFilled className={cn(theme == "light" ? "fill-blue-500" : "fill-blue-600")} />
              Blue
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("yellow"))}>
              <IconCircleFilled className="fill-yellow-800" />
              Yellow
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => applyAccentClass("violet"))}>
              <IconCircleFilled className={cn(theme == "light" ? "fill-violet-500" : "fill-violet-600")} />
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