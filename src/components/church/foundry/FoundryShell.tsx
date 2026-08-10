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

export function FoundryMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" fill="#111010" />
      <path
        d="M6 24 L16 8 L26 24"
        fill="none"
        stroke="#DC201E"
        strokeWidth="2.2"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function FoundryShell({ template, children, bare }: Props) {
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
          "atee-root min-h-screen overflow-x-clip antialiased",
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
        "atee-root flex min-h-screen flex-col overflow-x-clip antialiased",
      )}
    >
      <header
        className="fixed left-0 right-0 top-[var(--grok-banner-h,0px)] z-50 h-[62px] border-b border-[rgba(17,16,16,0.16)] bg-[rgba(248,243,236,0.92)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 sm:px-10">
          <Link
            to="/templates/$slug"
            params={{ slug }}
            className="flex items-center gap-2.5"
          >
            <FoundryMark className="size-8" />
            <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[-0.012em] text-[#111010]">
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
                  className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#8c8880] transition-colors hover:text-[#111010]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="hidden border border-[#111010] bg-[#111010] px-[30px] py-[12px] font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#f8f3ec] transition-colors duration-300 hover:bg-[#DC201E] hover:border-[#DC201E] sm:inline-flex"
            >
              {template.ctaPrimary}
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center border border-[rgba(17,16,16,0.16)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-[rgba(17,16,16,0.16)] bg-[#f8f3ec] px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {template.nav.map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  onClick={() => setOpen(false)}
                  className="border-b border-[rgba(17,16,16,0.08)] py-3 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em] text-[#111010]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1 pt-[62px]">{children}</main>

      <footer className="relative mt-auto overflow-hidden border-t border-[rgba(17,16,16,0.16)] bg-[#111010] text-[#f8f3ec]">
        <img
          src="https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/texture.webp"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1360px] gap-10 px-5 py-16 sm:px-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <FoundryMark className="size-8" />
              <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[-0.012em]">
                {template.shortName}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-[1.62] text-[#8c8880]">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Explore
            </p>
            <ul className="space-y-2">
              {template.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={childPath(item.to)}
                    params={{ slug }}
                    className="text-sm text-[#8c8880] transition-colors hover:text-[#f8f3ec]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#DC201E]">
              Visit
            </p>
            <p className="text-sm text-[#8c8880]">{template.address}</p>
            <p className="mt-2 text-sm text-[#8c8880]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#8c8880]">{template.email}</p>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-5 py-4 text-xs text-[#8c8880] sm:flex-row sm:justify-between sm:px-10">
            <p>
              © {new Date().getFullYear()} {template.name}
            </p>
            <p>
              Template by{" "}
              <Link to="/" className="text-[#DC201E] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
