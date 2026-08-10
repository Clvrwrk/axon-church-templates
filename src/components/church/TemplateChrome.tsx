import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import { templates, type TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

const PAGE_LABELS: Record<string, string> = {
  "": "Home",
  about: "About",
  visit: "Visit",
  sermons: "Sermons",
  events: "Events",
  ministries: "Ministries",
  give: "Give",
  contact: "Contact",
  groups: "Groups",
  recovery: "Recovery",
  "next-steps": "Next Steps",
  locations: "Locations",
  prayer: "Prayer",
};

type Props = {
  template: TemplateConfig;
  /** Dark shell (for dark-themed templates) */
  dark?: boolean;
};

export function TemplateChrome({ template, dark }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const rest = pathname
    .replace(new RegExp(`^/templates/${template.slug}/?`), "")
    .replace(/\/$/, "");
  const pageKey = rest.split("/")[0] || "";
  const pageLabel = PAGE_LABELS[pageKey] || (pageKey ? pageKey : "Home");

  return (
    <div
      className={cn(
        "sticky top-[var(--grok-banner-h,0px)] z-[100] border-b backdrop-blur-md",
        dark
          ? "border-white/10 bg-[#0A0A0A]/92 text-white"
          : "border-black/6 bg-[#F7F7F5]/92 text-[#1A1A1A]",
      )}
    >
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand + breadcrumbs */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label="Axon Church templates home"
          >
            <img
              src={dark ? "/brand/logo-h-drk.png" : "/brand/logo-h-lgt.png"}
              alt="Axon Church"
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-1 text-[11px] font-medium sm:text-xs"
          >
            <Link
              to="/"
              className={cn(
                "hidden shrink-0 transition-colors sm:inline hover:opacity-100",
                dark ? "text-white/50 hover:text-white" : "text-[#737373] hover:text-[#1A1A1A]",
              )}
            >
              Templates
            </Link>
            <ChevronRight
              className={cn(
                "hidden size-3 shrink-0 sm:block",
                dark ? "text-white/30" : "text-black/25",
              )}
              aria-hidden
            />
            <Link
              to="/templates/$slug"
              params={{ slug: template.slug }}
              className={cn(
                "truncate font-semibold transition-colors",
                dark ? "text-white hover:text-[#E0E7FF]" : "text-[#1A1A1A] hover:text-[#4F46E5]",
              )}
            >
              {template.shortName}
            </Link>
            {pageKey ? (
              <>
                <ChevronRight
                  className={cn(
                    "size-3 shrink-0",
                    dark ? "text-white/30" : "text-black/25",
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "truncate",
                    dark ? "text-white/55" : "text-[#737373]",
                  )}
                >
                  {pageLabel}
                </span>
              </>
            ) : null}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="listbox"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors sm:text-xs",
                dark
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-black/5 text-[#1A1A1A] hover:bg-black/10",
              )}
            >
              <LayoutGrid className="size-3.5" />
              <span className="hidden sm:inline">Switch template</span>
              <span className="sm:hidden">Switch</span>
              <ChevronDown
                className={cn("size-3.5 transition-transform", open && "rotate-180")}
              />
            </button>
            {open ? (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                />
                <ul
                  role="listbox"
                  className={cn(
                    "absolute right-0 top-full z-20 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-2xl border p-2 shadow-2xl",
                    dark
                      ? "border-white/10 bg-[#1D1D1D]"
                      : "border-black/6 bg-white",
                  )}
                >
                  {templates.map((t) => {
                    const active = t.slug === template.slug;
                    return (
                      <li key={t.slug}>
                        <Link
                          to="/templates/$slug"
                          params={{ slug: t.slug }}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex flex-col rounded-xl px-3 py-2.5 transition-colors",
                            active
                              ? dark
                                ? "bg-white/10"
                                : "bg-[#E0E7FF]"
                              : dark
                                ? "hover:bg-white/5"
                                : "hover:bg-black/5",
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              dark ? "text-white" : "text-[#1A1A1A]",
                            )}
                          >
                            {t.name}
                          </span>
                          <span
                            className={cn(
                              "text-[11px]",
                              dark ? "text-white/45" : "text-[#737373]",
                            )}
                          >
                            {t.style} · {t.size}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}
          </div>

          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all active:scale-95 sm:px-4 sm:text-xs",
              dark
                ? "bg-white text-[#0A0A0A] hover:bg-[#E0E7FF]"
                : "bg-[#1A1A1A] text-white hover:bg-[#4F46E5]",
            )}
          >
            <span className="hidden sm:inline">Back to templates</span>
            <span className="sm:hidden">All</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
