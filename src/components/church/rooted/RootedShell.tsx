import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

type Props = {
  template: TemplateConfig;
  children: ReactNode;
  bare?: boolean;
};

const CHILD_ROUTES = {
  "": "/templates/$slug",
  home: "/templates/$slug",
  visit: "/templates/$slug/visit",
  about: "/templates/$slug/about",
  sermons: "/templates/$slug/sermons",
  events: "/templates/$slug/events",
  ministries: "/templates/$slug/ministries",
  give: "/templates/$slug/give",
  contact: "/templates/$slug/contact",
  groups: "/templates/$slug/groups",
  recovery: "/templates/$slug/recovery",
  "next-steps": "/templates/$slug/next-steps",
  locations: "/templates/$slug/locations",
  prayer: "/templates/$slug/prayer",
} as const;

type ChildKey = keyof typeof CHILD_ROUTES;
type ChildRoute = (typeof CHILD_ROUTES)[ChildKey];

function childPath(to: string): ChildRoute {
  const raw = to.trim();
  const key = raw
    .replace(/^\/templates\/[^/]+\/?/, "")
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .toLowerCase();
  if (key in CHILD_ROUTES) return CHILD_ROUTES[key as ChildKey];
  if (raw === "/" || raw === "" || key === "index") return CHILD_ROUTES[""];
  return CHILD_ROUTES.visit;
}

export function RootedMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full bg-[#0a0a0a] font-[Urbanist,sans-serif] text-sm font-bold text-[#ff5a3d]",
        className,
      )}
      aria-hidden
    >
      R
    </span>
  );
}

export function RootedShell({ template, children, bare }: Props) {
  const [open, setOpen] = useState(false);
  const slug = template.slug;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (bare) {
    return (
      <div
        className={cn(
          template.themeClass,
          "min-h-screen overflow-x-hidden bg-[#ececea] antialiased",
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        template.themeClass,
        "flex min-h-screen flex-col overflow-x-hidden bg-[#ececea] antialiased",
      )}
    >
      <header className="sticky top-[var(--grok-banner-h,0px)] z-40 border-b border-[#e4e4e1]/80 bg-[#ececea]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/templates/$slug"
            params={{ slug }}
            className="flex items-center gap-2.5"
          >
            <RootedMark />
            <span className="font-[Urbanist,sans-serif] text-lg font-bold tracking-tight text-[#111]">
              {template.shortName}
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {template.nav
              .filter((n) => n.to !== "/" && n.label !== "Home")
              .map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  className="text-sm font-medium text-[#6f6f6f] transition-colors hover:text-[#111]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden rounded-full bg-[#0a0a0a] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,90,61,0.25)] transition hover:bg-[#ff5a3d] sm:inline-flex"
            >
              {template.ctaPrimary}
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-[#e4e4e1] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-[#e4e4e1] bg-[#ececea] px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {template.nav.map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[#111] hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-[#e4e4e1] bg-[#0a0a0a] text-white">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <RootedMark />
              <span className="font-[Urbanist,sans-serif] text-lg font-bold">
                {template.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9a9a9a]">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#ff5a3d]">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-[#9a9a9a]">
              {template.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={childPath(item.to)}
                    params={{ slug }}
                    className="hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#ff5a3d]">
              Visit
            </p>
            <p className="text-sm text-[#9a9a9a]">{template.address}</p>
            <p className="mt-2 text-sm text-[#9a9a9a]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#9a9a9a]">{template.email}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-4 text-xs text-[#6f6f6f] sm:flex-row sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {template.name}
            </p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#ff5a3d] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
