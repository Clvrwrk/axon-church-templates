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

export function NorthbridgeShell({ template, children, bare }: Props) {
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
          "min-h-screen bg-[#9d9283] antialiased",
        )}
      >
        <div
          className="mx-auto min-h-screen max-w-[112rem] bg-[#faf8f1] text-[#17191f] shadow-[0_1px_1px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.06),0_40px_80px_rgba(0,0,0,0.08)]"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        template.themeClass,
        "min-h-screen bg-[#9d9283] antialiased",
      )}
    >
      <div className="mx-auto flex min-h-screen max-w-[112rem] flex-col bg-[#faf8f1] text-[#17191f] shadow-[0_1px_1px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.06),0_40px_80px_rgba(0,0,0,0.08)]">
        <header className="sticky top-[var(--grok-banner-h,0px)] z-50 border-b border-black/5 bg-[rgba(250,248,241,0.88)] backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link
              to="/templates/$slug"
              params={{ slug }}
              className="font-[Instrument_Serif,Georgia,serif] text-2xl font-light tracking-tight"
            >
              {template.shortName}
            </Link>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {template.nav
                .filter((n) => n.to !== "/" && n.label !== "Home")
                .map((item) => (
                  <Link
                    key={item.to}
                    to={childPath(item.to)}
                    params={{ slug }}
                    className="text-sm font-medium text-[#17191f]/65 transition-colors hover:text-[#1f6f49]"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link
                to="/templates/$slug/visit"
                params={{ slug }}
                className="hidden rounded-xl bg-[#1f6f49] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#185a3b] sm:inline-flex"
              >
                {template.ctaPrimary}
              </Link>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl border border-black/5 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
          {open ? (
            <div className="border-t border-black/5 px-5 py-4 lg:hidden">
              <nav className="flex flex-col gap-1">
                {template.nav.map((item) => (
                  <Link
                    key={item.to}
                    to={childPath(item.to)}
                    params={{ slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#e9eadf]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-auto bg-[#1e211f] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
            <div>
              <p className="font-[Instrument_Serif,Georgia,serif] text-2xl font-light">
                {template.name}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                {template.tagline}
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                Explore
              </p>
              <ul className="space-y-2 text-sm text-white/60">
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
                Visit
              </p>
              <p className="text-sm text-white/60">{template.address}</p>
              <p className="mt-2 text-sm text-white/60">{template.phone}</p>
              <p className="mt-1 text-sm text-white/60">{template.email}</p>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-8">
              <p>
                © {new Date().getFullYear()} {template.name}
              </p>
              <p>
                Template by{" "}
                <Link to="/" className="text-[#b9d9ab] hover:underline">
                  Axon Ministry Solutions
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
