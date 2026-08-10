import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import { cn } from "@/lib/utils";

type SolunaShellProps = {
  template: TemplateConfig;
  children: ReactNode;
  /** When true, shell renders only children (home embeds its own chrome). */
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
  if (key in CHILD_ROUTES) {
    return CHILD_ROUTES[key as ChildKey];
  }
  if (raw === "/" || raw === "" || key === "index") {
    return CHILD_ROUTES[""];
  }
  return CHILD_ROUTES.visit;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SolunaShell({ template, children, bare }: SolunaShellProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const slug = template.slug;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (bare) {
    return (
      <div
        className={cn(
          template.themeClass,
          "min-h-screen bg-bg text-fg antialiased overflow-x-hidden",
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
        "flex min-h-screen flex-col bg-bg text-fg antialiased overflow-x-hidden",
      )}
    >
      <header
        id="navbar"
        className={cn(
          "fixed left-0 right-0 top-[var(--grok-banner-h,0px)] z-50 h-24 transition-all duration-300",
          scrolled
            ? "bg-[rgba(245,244,240,0.8)] shadow-sm backdrop-blur-md"
            : "bg-[rgba(245,244,240,0.8)] backdrop-blur-[12px]",
        )}
      >
        <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            to="/templates/$slug"
            params={{ slug }}
            className="flex items-center gap-2.5 text-fg"
          >
            <LogoMark className="size-7" />
            <span className="text-sm font-medium tracking-tight">
              {template.shortName}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {template.nav
              .filter((n) => n.to !== "/" && n.label !== "Home")
              .map((item) => (
                <Link
                  key={item.to}
                  to={childPath(item.to)}
                  params={{ slug }}
                  className="text-sm font-medium text-[#5c5c5a] transition-colors duration-300 hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/templates/$slug/visit"
              params={{ slug }}
              className="fixed right-0 top-[var(--grok-banner-h,0px)] z-50 hidden h-24 items-center rounded-bl-[40px] bg-[#1a1a1a] px-8 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 sm:inline-flex"
            >
              {template.ctaPrimary}
            </Link>
            <button
              type="button"
              id="mobile-menu-btn"
              className="flex size-11 items-center justify-center rounded-full border border-[#dcdacd] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[#f5f4f0] px-6 pt-28 transition-opacity duration-300 lg:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute right-5 top-[calc(var(--grok-banner-h,0px)+1.25rem)] flex size-11 items-center justify-center rounded-full border border-[#dcdacd]"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <X className="size-5" />
        </button>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {template.nav.map((item) => (
            <Link
              key={item.to}
              to={childPath(item.to)}
              params={{ slug }}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-4 text-2xl font-medium tracking-tight text-fg transition-colors hover:bg-[#e8eae4]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/templates/$slug/visit"
            params={{ slug }}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5d674f] px-6 py-4 text-base font-medium text-white"
          >
            {template.ctaPrimary}
          </Link>
        </nav>
      </div>

      <main className="flex-1 pt-24">{children}</main>

      <footer className="mt-auto border-t border-[#dcdacd] bg-[#f5f4f0]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:px-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-6" />
              <span className="text-sm font-medium">{template.name}</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#5c5c5a]">
              {template.tagline}
            </p>
          </div>
          <div>
            <p className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#a0a09e]">
              Explore
            </p>
            <ul className="space-y-2">
              {template.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={childPath(item.to)}
                    params={{ slug }}
                    className="text-sm text-[#5c5c5a] transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#a0a09e]">
              Visit
            </p>
            <p className="text-sm text-[#5c5c5a]">{template.address}</p>
            <p className="mt-2 text-sm text-[#5c5c5a]">{template.phone}</p>
            <p className="mt-1 text-sm text-[#5c5c5a]">{template.email}</p>
          </div>
        </div>
        <div className="border-t border-[#dcdacd]">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-xs text-[#a0a09e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <p>
              © {new Date().getFullYear()} {template.name}
            </p>
            <p>
              Template by{" "}
              <Link to="/" className="font-medium text-[#5d674f] hover:underline">
                Axon Ministry Solutions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { LogoMark };
