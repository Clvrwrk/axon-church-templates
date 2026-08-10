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

export function CitylightShell({ template, children, bare }: Props) {
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
          "min-h-screen overflow-x-hidden bg-[#F7F5F0] font-light text-[#2C2825] antialiased",
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
        "flex min-h-screen flex-col overflow-x-hidden bg-[#F7F5F0] font-light text-[#2C2825] antialiased",
      )}
    >
      <header className="sticky top-[var(--grok-banner-h,0px)] z-20 border-b border-[rgba(44,40,37,0.1)] bg-[rgba(247,245,240,0.8)] backdrop-blur-[12px]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          <Link
            to="/templates/$slug"
            params={{ slug }}
            className="text-xl font-normal uppercase tracking-tighter text-[#2C2825]"
          >
            {template.shortName}
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {template.nav
              .filter((n) => n.to !== "/" && n.label !== "Home")
              .map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  className="text-xs font-normal uppercase tracking-[0.2rem] text-[#2C2825]/70 transition-colors hover:text-[#C27A63]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden bg-[#C27A63] px-8 py-3 text-xs font-normal uppercase tracking-[0.2rem] text-white transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Visit
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center border border-[rgba(44,40,37,0.1)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-[rgba(44,40,37,0.1)] bg-[#F7F5F0] px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {template.nav.map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 text-xs font-normal uppercase tracking-[0.2rem]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-[rgba(44,40,37,0.1)] bg-[#2C2825] text-[#F7F5F0]">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="text-xl font-normal uppercase tracking-tighter">
              {template.name}
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-[#F7F5F0]/60">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Explore
            </p>
            <ul className="space-y-2 text-sm font-light text-[#F7F5F0]/60">
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
            <p className="mb-4 text-xs uppercase tracking-[0.2rem] text-[#C27A63]">
              Visit
            </p>
            <p className="text-sm font-light text-[#F7F5F0]/60">
              {template.address}
            </p>
            <p className="mt-2 text-sm font-light text-[#F7F5F0]/60">
              {template.phone}
            </p>
            <p className="mt-1 text-sm font-light text-[#F7F5F0]/60">
              {template.email}
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-4 text-xs text-[#F7F5F0]/40 sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} {template.name}
            </p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#C27A63] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
