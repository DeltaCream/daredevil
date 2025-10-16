import { siteConfig } from "@/config/site";
import Link from "next/link";

export function SiteFooter() {
    return (
      // added py-4
        <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 py-4 dark:bg-transparent">
            <div className="container-wrapper px-4 xl:px-6">
                <div className="flex h-(--footer-height) items-center justify-between">
                    <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
                        Built by{" "}
                        <Link
                            href={siteConfig.links.bluesky}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            DeltaCream
                        </Link>
                        . The source code is available on{" "}
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </footer>
    );
}
